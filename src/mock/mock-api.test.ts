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

type Content = { sections: Array<{ key: string; visible: boolean; fields: Record<string, unknown>; items: Array<Record<string, unknown>> }>; publishedAt: string };

async function getContent(): Promise<Content> {
  return ((await mockApi({ method: "GET", path: "/site-content" })).data as { data: Content }).data;
}

const put = async (sections: Content["sections"], auth: string | null) =>
  mockApi({ method: "PUT", path: "/site-content", body: JSON.stringify({ sections }), contentType: "application/json", token: auth });

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

  it("exige token para publicar e para /me (RNF13)", async () => {
    const { sections } = await getContent();
    assert.equal((await put(sections, null)).status, 401);
    assert.equal((await mockApi({ method: "GET", path: "/me", token: "mock.invalido" })).status, 401);
  });

  it("entrega a página com Hero no topo e Rodapé no fim", async () => {
    const content = await getContent();
    assert.equal(content.sections.length, 10);
    assert.equal(content.sections[0].key, "hero");
    assert.equal(content.sections.at(-1)?.key, "rodape");
  });

  it("publica alterações válidas e atualiza a data (RF18)", async () => {
    const before = await getContent();
    const sections = before.sections.map((section) =>
      section.key === "sobre" ? { ...section, fields: { ...section.fields, title: "Quem somos" } } : section,
    );
    const response = await put(sections, await token());
    assert.equal(response.status, 200);
    const after = await getContent();
    assert.equal(after.sections.find((section) => section.key === "sobre")?.fields.title, "Quem somos");
    assert.notEqual(after.publishedAt, before.publishedAt);
  });

  it("recusa conteúdo inválido com 422 e mantém o publicado (RNF23)", async () => {
    const before = await getContent();
    const sections = before.sections.map((section) =>
      section.key === "hero" ? { ...section, fields: { ...section.fields, title: "" } } : section,
    );
    const response = await put(sections, await token());
    assert.equal(response.status, 422);
    assert.ok("hero" in (response.data as { errors: Record<string, unknown> }).errors);
    assert.deepEqual(await getContent(), before);
  });

  it("recusa a lista de seções incompleta", async () => {
    const { sections } = await getContent();
    assert.equal((await put(sections.slice(1), await token())).status, 422);
  });
});
