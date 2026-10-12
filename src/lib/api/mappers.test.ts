import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { mapUser, unwrapData } from "./mappers";

describe("mappers", () => {
  it("tira o embrulho { data } do Laravel", () => {
    assert.deepEqual(unwrapData({ data: [1, 2] }), [1, 2]);
    assert.deepEqual(unwrapData([1, 2]), [1, 2]);
  });

  it("lê o usuário no formato do back-end (nome, sem id)", () => {
    assert.deepEqual(mapUser({ nome: "Admin", email: "admin@example.com", created_at: "01/09/2026 10:00:00" }), {
      id: "admin@example.com",
      name: "Admin",
      email: "admin@example.com",
    });
  });

  it("descarta usuário sem e-mail", () => {
    assert.equal(mapUser({ id: 1 }), null);
    assert.equal(mapUser(null), null);
  });
});
