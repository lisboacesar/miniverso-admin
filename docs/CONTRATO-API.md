# Contrato da API usado pelo painel

Back-end: **metaverso-back** (Laravel 12, Sanctum, MySQL). As rotas ficam na raiz, sem prefixo `/api`.

| Parte | Situação |
| --- | --- |
| Autenticação (`/login`, `/me`, `/logout`) | **confirmada** no código do back-end e integrada na v0.1.1 |
| Leads, serviços, projetos e conteúdo do site | **ainda não existem** no back-end; o painel usa o mock (`MOCK_RESOURCES`) no formato proposto abaixo |

Onde ajustar se algo mudar:

- nomes de rota e parâmetros: `src/features/*/api.ts` e `src/lib/server/auth.ts`
- nomes de campos: `src/lib/api/mappers.ts`
- recursos liberados na ponte: `src/lib/server/allowed-resources.ts`

O navegador não chama estas rotas diretamente. Quem chama é o servidor do Next.js (BFF), com o token no cabeçalho `Authorization: Bearer <token>`.

## Autenticação (confirmada)

### `POST /login` (público, `throttle:6,1`)

Corpo: `{ "email": "dev@example.com", "password": "••••" }`. O campo `email` precisa ser um e-mail válido (3 a 255 caracteres).

| Status | Resposta do back-end | O painel mostra |
| --- | --- | --- |
| `200` | `{ "data": { "token": "...", "user": { "nome": "...", "email": "...", "created_at": "...", "updated_at": "..." } } }` | entra no painel |
| `422` | `{ "errors": { "message": "Credenciais inválidas." } }` ou erros de validação | "E-mail ou senha incorretos." (RNF16) |
| `429` | `{ "message": "Too Many Attempts." }` com `Retry-After` | aviso de bloqueio com contagem regressiva (RNF15) |

Cada login revoga os tokens anteriores do usuário. O token expira em 24 horas (`config/sanctum.php`).

### `GET /me`

`{ "data": { "nome": "...", "email": "...", "created_at": "...", "updated_at": "..." } }`. Sem token válido: `401 { "message": "Não autenticado." }`, e o painel volta ao login com o aviso de sessão expirada. O `UserResource` não devolve `id`; o painel usa o e-mail como identificador.

### `POST /logout`

Revoga o token atual. Resposta `204`.

## Formato proposto para as próximas rotas

Segue o mesmo padrão do back-end atual: Resources dentro de `data` e paginação padrão do Laravel. É o que o mock implementa hoje.

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

1. Quando entram as rotas de leads, serviços, projetos e conteúdo? Os nomes de campo propostos aqui servem (o `UserResource` usa `nome` em português; vale padronizar o idioma dos campos)?
2. O RF11 prevê login por e-mail ou usuário. O `LoginRequest` aceita só e-mail. Fica só e-mail e atualizamos o DRDA?
3. O `throttle:6,1` conta por IP. Como o painel chama a API pelo servidor do Next.js, todos os acessos saem do mesmo IP. Dá para configurar o TrustProxies para ler o `X-Forwarded-For` do painel?
4. A rota pública que recebe o formulário de contato do site (RF08) vai gravar os leads nesse mesmo recurso `leads`?
5. O DRDA (3.1.3) cita Firebase como banco; o back-end usa MySQL. Vale atualizar o DRDA.
