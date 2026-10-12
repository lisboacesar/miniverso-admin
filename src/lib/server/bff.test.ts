/**
 * Testes das rotas do BFF (src/app/api). Elas usam Request/Response padrão,
 * então dá para chamá-las direto, sem subir o Next.js.
 */
import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { DELETE as proxyDelete, GET as proxyGet } from "@/app/api/admin/[...path]/route";
import { POST as login } from "@/app/api/auth/login/route";
import { POST as logout } from "@/app/api/auth/logout/route";
import { GET as sessionExpired } from "@/app/api/auth/session-expired/route";
import { MESSAGES } from "@/lib/messages";
import { SESSION_COOKIE } from "@/lib/session-cookie";
import { resetMockStore } from "@/mock/mock-api";

process.env.API_MODE = "mock";
process.env.MOCK_LATENCY_MS = "0";

const ORIGIN = "http://localhost:3000";

function loginRequest(body: unknown, headers: Record<string, string> = {}) {
  return new Request(`${ORIGIN}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: ORIGIN, host: "localhost:3000", ...headers },
    body: JSON.stringify(body),
  });
}

async function sessionCookie(): Promise<string> {
  const response = await login(loginRequest({ login: "admin@miniverso.test", password: "miniverso123" }));
  const cookie = response.headers.get("set-cookie") ?? "";
  return cookie.split(";")[0];
}

const context = (...path: string[]) => ({ params: Promise.resolve({ path }) });

describe("POST /api/auth/login", () => {
  beforeEach(() => resetMockStore());

  it("grava o token num cookie httpOnly e não devolve o token no corpo (RNF20)", async () => {
    const response = await login(loginRequest({ login: "admin@miniverso.test", password: "miniverso123" }));
    assert.equal(response.status, 200);
    const cookie = response.headers.get("set-cookie") ?? "";
    assert.match(cookie, new RegExp(`^${SESSION_COOKIE}=`));
    assert.match(cookie, /HttpOnly/);
    assert.match(cookie, /SameSite=Lax/);
    const body = (await response.json()) as Record<string, unknown>;
    assert.equal(JSON.stringify(body).includes("mock."), false);
    assert.equal((body.user as { name: string }).name, "Administrador Miniverso");
  });

  it("usa mensagem genérica para credenciais erradas (RNF16)", async () => {
    const response = await login(loginRequest({ login: "admin@miniverso.test", password: "errada" }));
    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), { message: MESSAGES.loginInvalid });
  });

  it("valida campos vazios também no servidor (RNF23)", async () => {
    const response = await login(loginRequest({ login: "  ", password: "" }));
    assert.equal(response.status, 422);
  });

  it("informa o bloqueio temporário com o tempo de espera (RNF15)", async () => {
    let response: Response = new Response();
    for (let attempt = 1; attempt <= 5; attempt += 1) {
      response = await login(loginRequest({ login: "admin@miniverso.test", password: "errada" }));
    }
    assert.equal(response.status, 429);
    const body = (await response.json()) as { retryAfterSeconds: number; message: string };
    assert.equal(body.retryAfterSeconds, 60);
    assert.match(body.message, /bloqueado por 1 minuto/);
  });

  it("recusa chamadas vindas de outro site", async () => {
    const response = await login(
      loginRequest({ login: "admin@miniverso.test", password: "miniverso123" }, { origin: "https://site-malicioso.com" }),
    );
    assert.equal(response.status, 403);
  });

  it("marca o cookie como Secure quando a conexão é HTTPS (RNF17)", async () => {
    const response = await login(
      loginRequest({ login: "admin@miniverso.test", password: "miniverso123" }, { "x-forwarded-proto": "https" }),
    );
    assert.match(response.headers.get("set-cookie") ?? "", /Secure/);
  });
});

describe("proxy /api/admin/*", () => {
  beforeEach(() => resetMockStore());

  it("responde 401 sem sessão (RNF13)", async () => {
    const response = await proxyGet(new Request(`${ORIGIN}/api/admin/leads`), context("leads"));
    assert.equal(response.status, 401);
  });

  it("repassa a chamada com o token e devolve os dados", async () => {
    const cookie = await sessionCookie();
    const response = await proxyGet(
      new Request(`${ORIGIN}/api/admin/leads?per_page=5`, { headers: { cookie } }),
      context("leads"),
    );
    assert.equal(response.status, 200);
    const body = (await response.json()) as { data: unknown[]; meta: { total: number } };
    assert.equal(body.data.length, 5);
    assert.equal(body.meta.total, 18);
  });

  it("recusa caminhos fora da lista e tentativas de subir de pasta", async () => {
    const cookie = await sessionCookie();
    const outside = await proxyGet(new Request(`${ORIGIN}/api/admin/users`, { headers: { cookie } }), context("users"));
    assert.equal(outside.status, 404);
    const traversal = await proxyGet(new Request(`${ORIGIN}/api/admin/leads/../me`, { headers: { cookie } }), context("leads", "..", "me"));
    assert.equal(traversal.status, 404);
  });

  it("exclui um lead (DELETE) e devolve 204", async () => {
    const cookie = await sessionCookie();
    const response = await proxyDelete(
      new Request(`${ORIGIN}/api/admin/leads/18`, { method: "DELETE", headers: { cookie, origin: ORIGIN, host: "localhost:3000" } }),
      context("leads", "18"),
    );
    assert.equal(response.status, 204);
  });

  it("encerra a sessão local quando o token não vale mais", async () => {
    const response = await proxyGet(
      new Request(`${ORIGIN}/api/admin/leads`, { headers: { cookie: `${SESSION_COOKIE}=mock.vencido` } }),
      context("leads"),
    );
    assert.equal(response.status, 401);
    assert.match(response.headers.get("set-cookie") ?? "", /Max-Age=0/);
  });
});

describe("saída e sessão expirada", () => {
  it("logout apaga o cookie (RF19)", async () => {
    const cookie = await sessionCookie();
    const response = await logout(
      new Request(`${ORIGIN}/api/auth/logout`, { method: "POST", headers: { cookie, origin: ORIGIN, host: "localhost:3000" } }),
    );
    assert.equal(response.status, 204);
    assert.match(response.headers.get("set-cookie") ?? "", /Max-Age=0/);
  });

  it("sessão expirada leva ao login com o aviso", async () => {
    const response = await sessionExpired(new Request(`${ORIGIN}/api/auth/session-expired`));
    assert.equal(response.status, 303);
    assert.equal(response.headers.get("location"), "/admin/login?motivo=expirada");
  });
});
