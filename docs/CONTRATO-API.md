# Contrato da API usado pelo painel

Back-end: **metaverso-back** (Laravel 12, Sanctum, MySQL). As rotas ficam na raiz, sem prefixo `/api`.

| Parte | Situação |
| --- | --- |
| Autenticação (`/login`, `/me`, `/logout`) | **confirmada** no código do back-end e integrada na v0.1.1 |
| Conteúdo da página inicial (`/site-content`) | **ainda não existe** no back-end; o painel usa o mock (`MOCK_RESOURCES=site-content`) no formato proposto abaixo |

Onde ajustar se algo mudar:

- nomes de rota: `src/features/home-editor/api.ts` e `src/lib/server/auth.ts`
- seções e campos: `src/features/home-editor/schema.ts` e `types.ts`
- campos do usuário: `src/lib/api/mappers.ts`
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

## Conteúdo da página inicial (proposto)

O painel do César cuida só do editor da página inicial (frame "Painel · Editor da página inicial" no Figma). Ele precisa de um único recurso, lido e gravado inteiro. O mock implementa exatamente este formato.

### `GET /site-content` (público)

A mesma rota serve a página pública e o painel. Resposta:

```json
{
  "data": {
    "publishedAt": "2026-10-11T14:32:00.000Z",
    "sections": [
      {
        "key": "hero",
        "visible": true,
        "fields": { "title": "Miniverso. Outras realidades.", "primaryLabel": "Ver projetos", "primaryTarget": "projetos" },
        "items": []
      },
      {
        "key": "servicos",
        "visible": true,
        "fields": { "title": "Novas formas de experimentar." },
        "items": [
          { "id": "serv-1", "visible": true, "title": "Realidade virtual", "description": "...", "image": "https://...", "imageAlt": "..." }
        ]
      }
    ]
  }
}
```

- `sections` vem **na ordem da página** e sempre com as 10 chaves: `hero`, `sobre`, `servicos`, `projetos`, `diferenciais`, `experiencia`, `processo`, `clientes`, `contato`, `rodape`. Hero é sempre a primeira e Rodapé a última.
- `fields` e `items` de cada seção seguem `src/features/home-editor/schema.ts`. Ali estão os nomes, os limites de caracteres e o que é obrigatório.
- Se o back-end preferir tabelas separadas para serviços e projetos (RF13, RF14), dá para montar este JSON num Resource. O painel não precisa saber como o dado é guardado.

### `PUT /site-content` (autenticado)

Corpo: `{ "sections": [...] }`, no mesmo formato. Publica tudo de uma vez (RF18, RNF44).

| Status | Quando | O painel faz |
| --- | --- | --- |
| `200` | conteúdo válido | `{ "data": { ...conteúdo, "publishedAt": "<agora>" } }`; mostra "Página inicial publicada" |
| `422` | regra violada | `{ "message": "...", "errors": { "<seção>": ... } }`; destaca as seções e mantém o rascunho (RNF31) |

Regras que o back-end também deve validar (RNF23), iguais às de `src/features/home-editor/rules.ts`:

1. Campos obrigatórios e limites de caracteres do schema.
2. Seções obrigatórias (Hero, Sobre, Serviços, Projetos, Contato, Rodapé) sempre `visible: true`; Hero primeiro e Rodapé por último.
3. `experiencia` só fica visível quando a experiência 3D existir (RIU20).
4. `clientes` só fica visível com pelo menos um logo `authorized: true` (RIU22, RIU23).
5. `projetos.fields.featured` aponta para um projeto visível (RIU17).
6. Imagem enviada exige texto alternativo (RNF34).

### Envio de imagens (a combinar)

Hoje o painel confere tipo, extensão e tamanho no navegador (JPG, PNG ou WebP até 2 MB; logos PNG ou WebP até 1 MB; modelo 3D .glb até 10 MB) e, no mock, guarda a prévia no próprio JSON. Com o back-end, a proposta é:

- `POST /uploads` (autenticado, `multipart/form-data`, campo `file`) devolve `{ "data": { "url": "https://..." } }`;
- o painel grava só a `url` no campo da seção.

## Erros

| Status da API | O painel faz |
| --- | --- |
| `401` / `419` | apaga a sessão local e volta ao login com o aviso de sessão expirada |
| `403` | "Você não tem permissão para fazer isso." |
| `404` | "Não encontramos este item. Ele pode ter sido excluído." |
| `422` | marca as seções com erro e mantém o rascunho na tela |
| `429` | "Muitas tentativas seguidas. Aguarde um pouco e tente de novo." |
| `5xx` | "Algo deu errado do nosso lado. Tente de novo em instantes." Detalhes técnicos nunca chegam à tela (RNF20, RNF43) |

## Perguntas para o back-end

1. Dá para criar `GET /site-content` e `PUT /site-content` neste formato? Se serviços e projetos virarem tabelas próprias, o Resource pode montar o mesmo JSON.
2. Qual rota recebe as imagens (`POST /uploads` ou outra) e onde elas ficam guardadas (`config/filesystems.php` já tem o disco `public`)?
3. O RF11 prevê login por e-mail ou usuário. O `LoginRequest` aceita só e-mail. Fica só e-mail e atualizamos o DRDA?
4. O `throttle:6,1` conta por IP. Como o painel chama a API pelo servidor do Next.js, todos os acessos saem do mesmo IP. Dá para configurar o TrustProxies para ler o `X-Forwarded-For` do painel?
5. O DRDA (3.1.3) cita Firebase como banco; o back-end usa MySQL. Vale atualizar o DRDA.
