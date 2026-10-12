# Painel administrativo Miniverso

Front-end do painel administrativo do portfólio institucional da Miniverso, em **Next.js 16** e **React 19**.
Projeto da disciplina Programação Avançada para Web (UNDB, Prof. Me. Kleydson Beckman).

Versão atual: **0.1.1**. O histórico de entregas está em [docs/EVOLUCAO.md](docs/EVOLUCAO.md).

## O que já funciona

- Login com validação, mensagem de erro genérica e bloqueio temporário após tentativas erradas
- Sessão guardada em cookie httpOnly, proteção de todas as rotas do painel e saída
- Encerramento automático da sessão depois de 30 minutos sem uso
- Visão geral: leads da última semana, total de projetos e serviços, últimos leads e atalhos
- Leads: lista com busca, filtro por serviço, ordenação e paginação; detalhe com a mensagem completa; cópia do contato; exclusão com confirmação
- Projetos, Serviços e Conteúdo do site: telas reservadas, previstas para as próximas versões

## Como rodar

Requisito: Node.js 20.9 ou mais recente.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abra <http://localhost:3000>. O painel fica em `/admin`.

Sem back-end configurado, o painel usa dados de exemplo (modo mock), no mesmo formato da API Laravel:

| Campo | Valor de teste |
| --- | --- |
| E-mail | `admin@miniverso.test` |
| Senha | `miniverso123` |

Na 7ª tentativa em 1 minuto o acesso é bloqueado, igual ao `throttle:6,1` do back-end (RNF15).

### Conectar ao back-end (metaverso-back)

Suba o back-end com o Sail (ver o README dele) e crie um usuário administrador. No `.env.local` do painel:

```bash
API_URL=http://localhost:8000
API_MODE=live
```

O login, a sessão e a saída passam a usar a API real. Leads, serviços, projetos e conteúdo ainda não existem no back-end, então continuam vindo do mock (variável `MOCK_RESOURCES`). Quando uma rota for criada lá, tire o nome dela dessa lista. O contrato está em [docs/CONTRATO-API.md](docs/CONTRATO-API.md).

## Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção, com checagem de tipos |
| `npm start` | roda o build de produção |
| `npm run lint` | ESLint com as regras do Next.js |
| `npm test` | testes da camada de dados, de segurança e do contrato com o back-end |

## Arquitetura

```text
Navegador ──> Next.js (este projeto) ──> API Laravel
              │
              ├─ /admin/*        telas do painel
              ├─ /api/auth/*     login, logout e sessão expirada
              └─ /api/admin/*    ponte autenticada para a API (BFF)
```

O navegador nunca fala direto com o Laravel. O Next.js faz o papel de BFF (*backend for frontend*):

1. No login, o token devolvido pela API fica num cookie **httpOnly**. O JavaScript da página não consegue lê-lo, o que protege a sessão contra XSS (RNF12, RNF20, RNF22).
2. Cada chamada do painel passa por `/api/admin/*`, que lê o cookie e repassa para a API com `Authorization: Bearer <token>` (RNF13).
3. Erros técnicos da API viram mensagens simples antes de chegar à tela (RNF43).
4. `src/proxy.ts` redireciona para o login quem tenta abrir o painel sem sessão (RF12). O layout do painel também confere o token na API antes de mostrar qualquer dado.

Com `API_MODE=mock`, a mesma ponte responde com os dados de `src/mock`, então dá para desenvolver e apresentar o painel antes de a API estar pronta.

## Estrutura de pastas

```text
src/
├─ app/                  rotas do Next.js (App Router)
│  ├─ admin/login/       tela de login
│  ├─ admin/(painel)/    telas protegidas: visão geral, leads, projetos, serviços, conteúdo
│  └─ api/               rotas do BFF (auth e ponte para a API)
├─ components/
│  ├─ layout/            menu lateral, cabeçalho e menu da conta
│  └─ ui/                botão, campos, avisos, modal de confirmação, toasts, estados vazios
├─ features/             telas e chamadas de API por módulo (auth, leads, overview...)
├─ lib/
│  ├─ api/               cliente HTTP, mensagens de erro e conversão dos dados da API
│  ├─ hooks/             carregamento assíncrono e debounce
│  └─ server/            regras do BFF: sessão, chamada à API, autenticação
├─ mock/                 API de exemplo no formato do Laravel
├─ types/                modelos usados no front
└─ proxy.ts              proteção das rotas /admin
```

## Decisões técnicas

| Decisão | Motivo | Requisitos |
| --- | --- | --- |
| Token em cookie httpOnly via BFF | o token não fica exposto ao JavaScript do navegador | RNF12, RNF20, RNF22 |
| Checagem de sessão no `proxy.ts` e no layout | ninguém vê o painel sem sessão válida | RF12, RNF10, RN01 |
| Mensagens centralizadas em `src/lib/messages.ts` | textos simples e iguais em todo o painel | RNF27, RNF28, RNF43 |
| CSS Modules com tokens em `globals.css` | cores, espaços e raios num só lugar, fáceis de trocar pelos do Figma | RNF28, RNF33 |
| Componentes de estado (carregando, vazio, erro, sucesso) | toda ação tem retorno visual | RNF08, RNF29 |
| Exclusão sempre com modal que nomeia o item | evita apagar algo por engano | RNF42 |
| `<dialog>` nativo, rótulos visíveis e foco visível | acessibilidade sem biblioteca extra | RNF35, RNF36 |
| Mock no formato do Laravel | o painel evolui em paralelo com o back-end | 2.5 (desenvolvimento incremental) |

## Identidade visual

- Cores do manual da Miniverso: `#1E1645`, `#1E4488` e `#00B7E3`. Os pares de texto e fundo têm o contraste anotado em `src/app/globals.css` (RNF33).
- As fontes Thunder e Random Grotesque entram quando os arquivos forem adicionados ao projeto. Até lá, o painel usa a fonte do sistema.
- O logo oficial ainda não foi aplicado. No lugar dele aparece o nome "Miniverso" em texto.
- O visual é provisório até a conferência com as telas do painel no Figma.

## Testes

```bash
npm test
```

Cobrem o mock da API, a conversão dos dados, os redirecionamentos seguros e as rotas do BFF: cookie httpOnly, mensagem genérica de login, bloqueio por tentativas, recusa de chamadas de outros sites e de caminhos fora da lista permitida.
