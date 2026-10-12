# Changelog

Mudanças do painel administrativo, da mais recente para a mais antiga.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/). O detalhamento de cada entrega, com capturas de tela, está em [docs/EVOLUCAO.md](docs/EVOLUCAO.md).

## [0.1.0] - 2026-10-11

### Adicionado

- Projeto Next.js 16 com React 19 e TypeScript
- Tokens de design com as cores do manual da Miniverso e contraste conferido
- Tela de login com validação por campo, mostrar e ocultar senha, erro genérico e bloqueio temporário
- Sessão em cookie httpOnly, proteção das rotas `/admin` e saída pelo menu da conta
- Encerramento da sessão por inatividade, sincronizado entre abas
- Ponte autenticada `/api/admin/*` (BFF) entre o navegador e a API Laravel
- API de exemplo (mock) no formato do Laravel para desenvolver sem o back-end
- Layout com menu lateral, cabeçalho com título da página, "Ver site" e menu da conta, responsivo para desktop, tablet e celular
- Visão geral com leads dos últimos 7 dias, totais de projetos e serviços, últimos leads e atalhos
- Lista de leads com busca, filtro por serviço, ordenação e paginação
- Detalhe do lead com mensagem completa, resposta por e-mail e cópia do contato
- Exclusão de lead com modal de confirmação
- Estados de carregamento, vazio, erro e sucesso nas telas com dados
- Telas reservadas para Projetos, Serviços e Conteúdo do site
- Testes da camada de dados e de segurança (`npm test`)
- Documentação: README, contrato da API e registro de evolução
