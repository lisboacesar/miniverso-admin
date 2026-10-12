# Contrato da API usado pelo painel

**Status: a confirmar com o back-end.** Este é o formato que o painel espera hoje e que o mock (`src/mock/mock-api.ts`) imita. Ele segue as convenções do Laravel (Sanctum, API Resources e paginação padrão), que é o back-end citado no artigo do projeto. Quando o contrato real for confirmado, ajuste:

- nomes de rota e parâmetros: `src/features/*/api.ts` e `src/lib/server/auth.ts`
- nomes de campos: `src/lib/api/mappers.ts`
- recursos liberados na ponte: `src/lib/server/allowed-resources.ts`

O navegador não chama estas rotas diretamente. Quem chama é o servidor do Next.js (BFF), com o token no cabeçalho `Authorization`.

## Convenções

- Base: `API_URL`, por exemplo `http://localhost:8000/api`
- Formato: JSON (`Accept: application/json`)
- Autenticação: `Authorization: Bearer <token>` em todas as rotas do painel (RNF13)
- Recursos individuais vêm dentro de `{ "data": ... }`
- Listas paginadas seguem o paginador do Laravel: `{ "data": [...], "links": {...}, "meta": {...} }`
- Datas em ISO 8601 (`created_at`)

## Autenticação

### `POST /login`

Corpo:

```json
{ "email": "admin@miniverso.test", "password": "••••••" }
```

| Status | Significado | O painel mostra |
| --- | --- | --- |
| `200` | `{ "token": "...", "user": { "id": 1, "name": "...", "email": "..." } }` | entra no painel |
| `401` ou `422` | credenciais erradas | "E-mail/usuário ou senha incorretos." (RNF16) |
| `429` | bloqueio por tentativas, com cabeçalho `Retry-After` em segundos | aviso de bloqueio com contagem regressiva (RNF15) |
| `5xx` ou sem resposta | servidor indisponível | "Não foi possível conectar ao servidor..." |

O painel também aceita `access_token` no lugar de `token`. Se `user` não vier, ele busca em `GET /me`.

### `POST /logout`

Invalida o token atual (RNF14). Resposta esperada: `204`.

### `GET /me`

Usuário dono do token: `{ "data": { "id": 1, "name": "...", "email": "..." } }`. Responde `401` se o token não vale mais; nesse caso o painel encerra a sessão e volta ao login com o aviso de sessão expirada.

## Leads (RF16, RF17)

### `GET /leads`

| Parâmetro | Exemplo | Uso |
| --- | --- | --- |
| `search` | `clinica` | busca em nome, e-mail e empresa |
| `service_id` | `1` | filtra pelo serviço de interesse |
| `sort` | `-created_at` ou `created_at` | mais recentes ou mais antigos primeiro |
| `from` | `2026-10-04` | só leads recebidos a partir da data (usado na visão geral) |
| `page`, `per_page` | `1`, `10` | paginação |

Item da lista:

```json
{
  "id": 18,
  "name": "Ana Ribeiro",
  "email": "ana.ribeiro@example.com",
  "phone": "(98) 90000-0101",
  "company": "Colégio Horizonte",
  "service": { "id": 1, "title": "Realidade Virtual" },
  "message": "Olá! Queremos levar uma experiência...",
  "created_at": "2026-10-11T12:14:00.000000Z"
}
```

`meta` usado pelo painel: `current_page`, `last_page`, `per_page` e `total`.

### `GET /leads/{id}`

`{ "data": { ...mesmo formato do item } }` ou `404`.

### `DELETE /leads/{id}`

`204`. O painel só chama depois da confirmação no modal (RNF42).

## Serviços e projetos (leitura usada nesta versão)

- `GET /services`: `{ "data": [{ "id": 1, "title": "...", "description": "...", "image_url": null }] }`. Usado no filtro de leads e no total da visão geral.
- `GET /projects?per_page=1`: o painel lê só `meta.total`, para o total da visão geral.

O cadastro, a edição e a exclusão de serviços (RF13) e projetos (RF14) entram nas versões 0.2 e 0.3. O formato dessas rotas, inclusive o envio de imagens (RNF24), precisa ser combinado antes.

## Erros

| Status da API | O painel faz |
| --- | --- |
| `401` / `419` | apaga a sessão local e volta ao login com o aviso de sessão expirada |
| `403` | "Você não tem permissão para fazer isso." |
| `404` | "Não encontramos este item. Ele pode ter sido excluído." |
| `422` | destaca os campos listados em `errors` (usado nos formulários das próximas versões) |
| `429` | "Muitas tentativas seguidas. Aguarde um pouco e tente de novo." |
| `5xx` | "Algo deu errado do nosso lado. Tente de novo em instantes." Detalhes técnicos nunca chegam à tela (RNF20, RNF43) |

## Perguntas para o back-end

1. A rota de login é `POST /api/login` com `email` e `password`? Aceita usuário além de e-mail (RF11)?
2. O token é do Sanctum? Ele expira sozinho depois de quanto tempo (RNF14)?
3. O limite de tentativas (RNF15) usa o throttle do Laravel com `Retry-After`? Quantas tentativas e por quanto tempo?
4. Os nomes de rota e de campos dos leads batem com este documento? O serviço de interesse vem como objeto (`service`) ou só como `service_id`?
5. A rota do usuário logado é `/me` ou `/user` (padrão do Laravel)?
6. Os parâmetros de busca, filtro, ordenação e data (`search`, `service_id`, `sort`, `from`) existem?
7. O DRDA (3.1.3) cita Firebase como banco e o artigo cita Laravel no back-end. Qual é a combinação final? Para o painel, só importa o formato da API.
