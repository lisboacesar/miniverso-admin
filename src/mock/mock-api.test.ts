import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { mockApi, resetMockStore } from "./mock-api";

process.env.MOCK_LATENCY_MS = "0";

const login = (email: string, password: string) =>
  mockApi({ method: "POST", path: "/login", body: JSON.stringify({ email, password }), contentType: "application/json" });

async function token(): Promise<string> {
  const response = await login("admin@miniverso.test", "miniverso123");
  return (response.data as { data: { token: string } }).data.token;
}

type Page = { data: Array<{ id: number; name: string; created_at: string; service: { id: number } | null }>; meta: { total: number; last_page: number } };

describe("mock da API", () => {
  beforeEach(() => resetMockStore());

  it("faz login com as credenciais de teste", async () => {
    const response = await login("ADMIN@miniverso.test", "miniverso123");
    assert.equal(response.status, 200);
    const body = response.data as { data: { token: string; user: { nome: string } } };
    assert.match(body.data.token, /^mock\./);
    assert.equal(body.data.user.nome, "Administrador Miniverso");
  });

  it("recusa senha errada com 422 e a mesma mensagem do back-end", async () => {
    const response = await login("admin@miniverso.test", "errada");
    assert.equal(response.status, 422);
    assert.deepEqual(response.data, { errors: { message: "Credenciais inválidas." } });
  });

  it("bloqueia na 7ª tentativa, como o throttle:6,1 do back-end (RNF15)", async () => {
    for (let attempt = 1; attempt <= 6; attempt += 1) {
      assert.equal((await login("admin@miniverso.test", "errada")).status, 422);
    }
    const blocked = await login("admin@miniverso.test", "errada");
    assert.equal(blocked.status, 429);
    assert.ok(Number(blocked.headers.get("retry-after")) > 0);
    // Mesmo com a senha certa, continua bloqueado até o tempo acabar.
    assert.equal((await login("admin@miniverso.test", "miniverso123")).status, 429);
  });

  it("exige token nas rotas do painel (RNF13)", async () => {
    assert.equal((await mockApi({ method: "GET", path: "/leads" })).status, 401);
    assert.equal((await mockApi({ method: "GET", path: "/me", token: "mock.invalido" })).status, 401);
  });

  it("lista leads paginados, do mais recente ao mais antigo", async () => {
    const response = await mockApi({ method: "GET", path: "/leads", search: "?per_page=10", token: await token() });
    const page = response.data as Page;
    assert.equal(response.status, 200);
    assert.equal(page.data.length, 10);
    assert.equal(page.meta.total, 18);
    assert.equal(page.meta.last_page, 2);
    const dates = page.data.map((lead) => new Date(lead.created_at).getTime());
    assert.deepEqual(dates, [...dates].sort((a, b) => b - a));
  });

  it("busca sem diferenciar acentos e maiúsculas", async () => {
    const response = await mockApi({ method: "GET", path: "/leads", search: "?search=CLINICA", token: await token() });
    const page = response.data as Page;
    assert.equal(page.meta.total, 1);
    assert.equal(page.data[0].name, "Carla Mendes");
  });

  it("filtra por serviço de interesse", async () => {
    const response = await mockApi({ method: "GET", path: "/leads", search: "?service_id=1&per_page=50", token: await token() });
    const page = response.data as Page;
    assert.ok(page.meta.total > 0);
    assert.ok(page.data.every((lead) => lead.service?.id === 1));
  });

  it("filtra por data mínima", async () => {
    const from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const response = await mockApi({ method: "GET", path: "/leads", search: `?from=${from}&per_page=50`, token: await token() });
    const page = response.data as Page;
    assert.ok(page.meta.total >= 6 && page.meta.total <= 8);
  });

  it("exclui um lead e depois responde 404", async () => {
    const auth = await token();
    assert.equal((await mockApi({ method: "DELETE", path: "/leads/18", token: auth })).status, 204);
    assert.equal((await mockApi({ method: "GET", path: "/leads/18", token: auth })).status, 404);
    const page = (await mockApi({ method: "GET", path: "/leads", token: auth })).data as Page;
    assert.equal(page.meta.total, 17);
  });
});
