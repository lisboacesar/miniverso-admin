/**
 * Conversão do formato da API (Laravel, snake_case) para os modelos do front.
 * É o único lugar que conhece os nomes dos campos do back-end: se o contrato
 * mudar, ajuste aqui e em docs/CONTRATO-API.md.
 */
import type { User } from "@/types/models";

type JsonObject = Record<string, unknown>;

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown): string | null {
  if (typeof value === "string") return value.trim() === "" ? null : value;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return null;
}

/** O Laravel embrulha recursos em { data: ... }. Esta função tira o embrulho, se existir. */
export function unwrapData(payload: unknown): unknown {
  return isObject(payload) && "data" in payload ? payload.data : payload;
}

/** O back-end devolve { nome, email } (UserResource), sem id. O e-mail serve de identificador. */
export function mapUser(raw: unknown): User | null {
  if (!isObject(raw)) return null;
  const email = text(raw.email);
  if (!email) return null;
  return { id: text(raw.id) ?? email, email, name: text(raw.nome) ?? text(raw.name) ?? email };
}
