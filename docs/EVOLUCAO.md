# Registro de evolução do painel administrativo

Projeto: Portfólio Institucional Web Miniverso · Programação Avançada para Web (UNDB)
Parte: front-end do painel administrativo (Next.js e React)
Responsável: César Gabriel da Silva Lisboa

Cada entrega ganha uma entrada neste arquivo, com o que mudou, os requisitos do DRDA atendidos, as capturas de tela e o que ficou para depois. A versão segue o `package.json` e aparece no rodapé do menu lateral do painel.

## Visão geral das versões

| Versão | Data | Entrega | Situação |
| --- | --- | --- | --- |
| 0.1.0 | 11/10/2026 | Base do painel, login, sessão, visão geral e leads | entregue |
| 0.1.1 | 11/10/2026 | Login e sessão integrados ao back-end real | entregue |
| 0.2.0 | 12/10/2026 | Editor da página inicial (escopo corrigido) | entregue com mock |
| 0.3.0 | a definir | Editor ligado às rotas reais de conteúdo e envio de imagens | depende do back-end |
| 0.4.0 | a definir | Ajustes finais, testes com pessoas de fora da equipe e publicação | planejada |

--- | --- | --- | --- |
| 0.1.0 | 11/10/2026 | Base do painel, login, sessão, visão geral e leads | entregue |
| 0.1.1 | 11/10/2026 | Login e sessão integrados ao back-end real | entregue |
| 0.2.0 | a definir | Serviços: cadastrar, editar e remover | planejada |
| 0.3.0 | a definir | Projetos: cadastrar, editar, remover e enviar imagens | planejada |
| 0.4.0 | a definir | Conteúdo do site: textos e imagens da página inicial | planejada |
| 0.5.0 | a definir | Ajustes finais, testes com pessoas de fora da equipe e publicação | planejada |

---

## v0.2.0 · 12/10/2026 · Editor da página inicial

### Por que o escopo mudou

A v0.1 montou um painel completo (visão geral, leads, projetos, serviços). Na divisão da equipe, o painel desta parte é só o frame **"Painel · Editor da página inicial"** do Figma: a página que muda a estrutura e o conteúdo da home. Por isso a v0.2.0 remove visão geral e leads e entrega o editor. Login, sessão e a ponte segura com a API continuam iguais.

### O que foi entregue

- **Estrutura da página**: as 10 seções na ordem da página pública. Setas sobem e descem cada seção; Hero fica sempre no topo e Rodapé no fim. Seções obrigatórias mostram "Obrigatória"; as opcionais têm botão de exibir.
- **Editor de seção** montado a partir de `schema.ts`: textos com limite e contador, destinos dos botões, imagens, modelo 3D e opções. Cada seção mostra os requisitos que atende.
- **Itens da seção** (destaques, serviços, projetos, diferenciais, etapas, logos e redes sociais): adicionar, editar, reordenar, ocultar e remover. Projetos abrem num painel lateral porque o formulário é longo.
- **Envio de imagem** com prévia, substituir e remover. O arquivo é conferido antes de aceitar e o texto alternativo é obrigatório quando há imagem.
- **Rascunho e publicação**: as mudanças ficam em rascunho, com aviso de quantas seções mudaram. "Salvar e publicar" valida tudo antes de enviar. Se falhar, o rascunho continua na tela. "Descartar" volta ao publicado depois de confirmar. O navegador avisa ao sair com alterações pendentes.
- **Identidade**: cores e fontes das variáveis do Figma e logo oficial exportado do arquivo.

### Requisitos atendidos

| Requisito | Como foi atendido |
| --- | --- |
| RF15, RF18, RNF44 | Edição de textos e imagens das seções, publicada no site de uma vez |
| RF13, RIU13 a RIU15 | Serviços com título, descrição breve e imagem, em quantidade livre e ordem definida |
| RF14, RIU16 a RIU18, RN03 | Projetos com capa, categoria e descrição; projeto oculto ou removido sai da página |
| RIU17 | Projeto em destaque escolhido numa lista e precisa estar visível |
| RIU20 | Experiência interativa bloqueada, com o motivo explicado |
| RIU21 | Etapas do Processo numeradas pela ordem da lista |
| RIU22, RIU23 | Clientes só aparece com logo autorizado; sem logo, a seção fica oculta |
| RNF24 | Tipo, extensão e tamanho do arquivo conferidos antes do envio |
| RNF29, RNF08 | Status de publicação, botão com carregamento e avisos de sucesso ou falha |
| RNF30, RNF31, RNF32 | Erro por campo dizendo o problema, rascunho preservado e obrigatórios marcados |
| RNF34 | Texto alternativo obrigatório para toda imagem enviada |
| RNF35, RNF40 | Setas no lugar de arrastar, que funcionam no teclado e no toque, com alvos de 44 px |
| RNF36, RNF39 | Rótulo visível em todo campo; "Alterada" e "Revisar campos" com texto e ícone, não só cor |
| RNF42 | Remover item e descartar alterações pedem confirmação nomeando o que será perdido |
| RNF43 | Mensagens sem termos técnicos, como "Não foi possível publicar. Verifique sua conexão e tente de novo." |

### Capturas de tela

Capturas da v0.2.0 em modo mock, com dados fictícios. No ambiente de captura as fontes do Google não carregam, então aparecem as fontes de reserva.

| | |
| --- | --- |
| ![Login](prints/v0.2.0/01-login.png) Login com o logo oficial | ![Carregando](prints/v0.2.0/02-editor-carregando.png) Carregando |
| ![Hero](prints/v0.2.0/03-editor-hero.png) Seção Hero | ![Serviços](prints/v0.2.0/04-editor-servicos.png) Seção Serviços |
| ![Alterações pendentes](prints/v0.2.0/05-editor-alteracoes-pendentes.png) Alterações não publicadas | ![Erros no modal](prints/v0.2.0/06-modal-servico-erros.png) Campos obrigatórios |
| ![Arquivo inválido](prints/v0.2.0/07-modal-upload-invalido.png) Arquivo recusado (RNF24) | ![Texto alternativo](prints/v0.2.0/08-modal-alt-obrigatorio.png) Texto alternativo (RNF34) |
| ![Serviço adicionado](prints/v0.2.0/09-servico-adicionado-toast.png) Serviço adicionado | ![Remover](prints/v0.2.0/10-remover-confirmacao.png) Confirmação (RNF42) |
| ![Publicar com erro](prints/v0.2.0/11-publicar-com-erro.png) Publicação bloqueada por erro | ![Publicado](prints/v0.2.0/12-publicado-sucesso.png) Publicado |
| ![Projeto](prints/v0.2.0/13-projeto-drawer.png) Projeto em painel lateral | ![Clientes](prints/v0.2.0/14-clientes-sem-logo.png) Clientes sem logo (RIU23) |
| ![Experiência](prints/v0.2.0/15-experiencia-bloqueada.png) Experiência bloqueada (RIU20) | ![Falha de rede](prints/v0.2.0/16-publicar-falha-rede.png) Falha ao publicar (RNF31) |
| ![Erro ao carregar](prints/v0.2.0/17-editor-erro-carregar.png) Erro ao carregar | ![Foco](prints/v0.2.0/18-foco-teclado.png) Foco pelo teclado |
| ![Tablet](prints/v0.2.0/19-tablet-servicos.png) Tablet | ![Celular, login](prints/v0.2.0/20-mobile-login.png) Celular: login |
| ![Celular, estrutura](prints/v0.2.0/21-mobile-editor-topo.png) Celular: estrutura | ![Celular, seção](prints/v0.2.0/21b-mobile-apos-escolher.png) Celular: seção escolhida |
| ![Celular, serviços](prints/v0.2.0/22-mobile-servicos.png) Celular: serviços | ![Celular, projeto](prints/v0.2.0/23-mobile-projeto-form.png) Celular: formulário de projeto |

### Testes

- `npm test`: 51 testes passando. Novos: regras do editor (`rules.test.ts`), leitura e publicação de `site-content` no mock e pela ponte, recusa de PUT de outro site.
- Fluxos conferidos no navegador: reordenar, ocultar, adicionar e remover itens, arquivo inválido, texto alternativo, publicação com erro, publicação com sucesso, falha de rede, erro ao carregar e navegação por teclado, em 1440, 1024 e 390 px.

### Decisões que divergem do Figma

- **Setas em vez de arrastar**: o wireframe diz "Arraste para reordenar". Arrastar não funciona pelo teclado e é difícil no toque (RNF35, RNF40). As setas fazem o mesmo e cabem no mesmo espaço.
- **Menu lateral só com "Página inicial"**: o wireframe mostra Dashboard e Leads, que não são desta parte.
- **"Descartar"** não aparece no Figma; foi incluído porque o rascunho só existe no navegador e precisa de uma saída segura.

### Limitações conhecidas

- O back-end ainda não tem `site-content` nem envio de imagens; o editor roda com o mock (contrato em [CONTRATO-API.md](CONTRATO-API.md)).
- No mock, as imagens ficam no próprio conteúdo como prévia; com o back-end, o painel vai gravar só a URL devolvida pelo envio.
- Os serviços e projetos de exemplo começam sem imagem, porque as oficiais ainda não foram enviadas. Para salvar a edição de um deles é preciso enviar a imagem.

### Próximo passo

Combinar com o back-end as rotas `GET/PUT /site-content` e `POST /uploads` e trocar o mock pela API real (v0.3.0).

---

## v0.1.1 · 11/10/2026 · Integração da autenticação com o back-end

### O que mudou

- O painel passou a autenticar no back-end real (metaverso-back, Laravel 12 com Sanctum): `POST /login`, `GET /me` e `POST /logout`.
- Ajustes ao contrato real: rotas sem o prefixo `/api`, resposta dentro de `data` e nome do usuário no campo `nome`.
- O campo de login aceita só e-mail, como a validação do back-end (`LoginRequest`).
- Modo híbrido: leads, serviços, projetos e conteúdo ainda não existem no back-end e continuam vindo do mock até as rotas serem criadas.
- 43 testes passando, incluindo o modo live contra um servidor que responde como o back-end.

### Requisitos reforçados

| Requisito | Como |
| --- | --- |
| RF11, RNF10 | Login validado no back-end com senha em hash (RNF11 é do back-end) |
| RNF12, RNF13 | Token do Sanctum guardado em cookie httpOnly e enviado como Bearer |
| RNF14 | Logout revoga o token (`currentAccessToken()->delete()`); o token expira em 24 h no back-end e a sessão do painel em 8 h ou 30 min sem uso |
| RNF15 | Bloqueio pelo `throttle:6,1` do back-end, exibido com contagem regressiva |
| RNF16 | O 422 "Credenciais inválidas." vira a mensagem genérica do painel |

### Pendências

- Rotas de leads, serviços, projetos e conteúdo no back-end.
- O `throttle:6,1` conta tentativas por IP. Como o painel chama a API pelo servidor do Next.js, todos os acessos saem do mesmo IP. Para um único administrador funciona, mas vale o back-end confiar no cabeçalho `X-Forwarded-For` do painel (TrustProxies).
- RF11 pede login por e-mail ou usuário; o back-end aceita só e-mail. Atualizar o DRDA ou o back-end.

---

## v0.1.0 · 11/10/2026 · Base do painel, login e leads

### O que foi entregue

- **Estrutura do projeto** em Next.js 16, React 19 e TypeScript, com tokens de design (cores do manual da Miniverso, espaçamentos e raios) e componentes reutilizáveis: botão, campos, avisos, modal de confirmação, toasts, estados vazios e de erro.
- **Login** com campos obrigatórios marcados, erro por campo, opção de mostrar a senha, indicador de carregamento, mensagem genérica para credenciais erradas e bloqueio temporário com contagem regressiva.
- **Sessão segura**: o token fica num cookie httpOnly gerenciado pelo servidor do Next.js, que faz a ponte com a API (padrão BFF). Rotas do painel exigem sessão; sessão vencida ou ausente leva ao login com aviso. A sessão também termina depois de 30 minutos sem uso.
- **Layout do painel**: menu lateral com o item atual destacado, cabeçalho com o título da página, link "Ver site" e menu da conta com a opção de sair. Desktop com menu completo, tablet com menu recolhido em ícones e celular com menu em gaveta.
- **Visão geral**: leads recebidos nos últimos 7 dias, total de projetos e de serviços, últimos 5 leads e atalhos. Só mostra números que o sistema realmente registra.
- **Leads**: lista com busca por nome, e-mail ou empresa, filtro por serviço de interesse, ordenação por data e paginação. Detalhe com a mensagem completa, botões para responder por e-mail e copiar o contato, e exclusão com confirmação.
- **Telas reservadas** para Projetos, Serviços e Conteúdo do site, com o escopo e a versão prevista.
- **Modo mock**: API de exemplo no formato do Laravel, com dados fictícios, para o painel funcionar antes de o back-end estar disponível.
- **Testes automatizados** da camada de dados e de segurança (`npm test`).

### Requisitos atendidos

| Requisito | Como foi atendido |
| --- | --- |
| RF11 | Login por e-mail/usuário e senha |
| RF12, RNF10, RN01, RN07 | `proxy.ts` e layout do painel bloqueiam quem não tem sessão válida |
| RF16, RNF19 | Lista de leads, disponível só com sessão |
| RF17 | Detalhe do lead com todos os dados e a mensagem |
| RF19 | Opção "Sair do painel" no menu da conta |
| RNF08, RNF29 | Botões com estado de carregamento e telas com estados de carregando, vazio, erro e sucesso |
| RNF12, RNF13 | Token em cookie httpOnly; toda chamada à API leva o token |
| RNF14 | Saída invalida o token no back-end; sessão encerrada após 30 minutos sem uso |
| RNF15 | Aviso de bloqueio com tempo restante quando a API recusa por excesso de tentativas |
| RNF16 | Mensagem única para usuário ou senha errados |
| RNF17 | Cookie com a flag Secure em conexões HTTPS |
| RNF20, RNF43 | Token nunca chega ao navegador; erros técnicos viram mensagens simples |
| RNF22 | Conteúdo enviado pelo visitante é exibido como texto, nunca como HTML |
| RNF23 | Login validado no navegador e no servidor |
| RNF26 | Menu fixo com indicação da página atual |
| RNF28 | Componentes compartilhados com a mesma aparência e comportamento |
| RNF30, RNF31, RNF32 | Erro por campo, e-mail preservado após falha e campos obrigatórios marcados |
| RNF33 | Pares de cor com contraste conferido (anotado em `globals.css`) |
| RNF35, RNF36, RNF37 | Foco visível, rótulos em todos os campos e títulos em hierarquia |
| RNF38 | Animações desligadas quando o sistema pede movimento reduzido |
| RNF39 | Avisos e item ativo do menu usam ícone, texto ou forma, não só cor |
| RNF40 | Alvos de toque de 44 px no celular |
| RNF42 | Exclusão só depois de confirmar num modal que nomeia o lead |
| RF10 | Layout adaptado para desktop, tablet e celular |

### Capturas de tela

Capturas da v0.1.0 em modo mock, com dados fictícios.

| | |
| --- | --- |
| ![Login](prints/v0.1.0/01-login.png) Login | ![Validação do login](prints/v0.1.0/02-login-validacao.png) Campos obrigatórios |
| ![Erro de login](prints/v0.1.0/03-login-erro.png) Erro genérico (RNF16) | ![Bloqueio](prints/v0.1.0/04-login-bloqueio.png) Bloqueio temporário (RNF15) |
| ![Sessão expirada](prints/v0.1.0/05-sessao-expirada.png) Sessão expirada | ![Visão geral](prints/v0.1.0/06-visao-geral.png) Visão geral |
| ![Leads](prints/v0.1.0/07-leads.png) Lista de leads | ![Busca](prints/v0.1.0/08-leads-busca.png) Busca |
| ![Sem resultado](prints/v0.1.0/09-leads-sem-resultado.png) Busca sem resultado | ![Carregando](prints/v0.1.0/10-leads-carregando.png) Carregando |
| ![Erro](prints/v0.1.0/11-leads-erro.png) Falha ao carregar | ![Confirmação](prints/v0.1.0/12-excluir-confirmacao.png) Confirmação de exclusão (RNF42) |
| ![Exclusão concluída](prints/v0.1.0/13-excluir-sucesso.png) Aviso de sucesso | ![Detalhe](prints/v0.1.0/14-lead-detalhe.png) Detalhe do lead |
| ![Módulo previsto](prints/v0.1.0/15-modulo-em-desenvolvimento.png) Módulo previsto | ![Tablet](prints/v0.1.0/16-tablet-visao-geral.png) Tablet |
| ![Celular, leads](prints/v0.1.0/17-celular-leads.png) Celular: leads | ![Celular, menu](prints/v0.1.0/18-celular-menu.png) Celular: menu |
| ![Celular, detalhe](prints/v0.1.0/19-celular-detalhe.png) Celular: detalhe | |

### Testes

- `npm test`: 38 testes passando. Cobrem o mock da API, a conversão dos dados, os redirecionamentos seguros (sem *open redirect*) e as rotas do BFF (cookie httpOnly, erro genérico, bloqueio, recusa de chamadas de outros sites e de caminhos fora da lista).
- Fluxos conferidos no navegador: login com erro e com sucesso, retorno à página pedida, bloqueio, sessão expirada, busca, filtro, exclusão, saída e navegação por teclado.

### Limitações conhecidas

- O back-end ainda não está conectado: o painel usa o contrato descrito em [CONTRATO-API.md](CONTRATO-API.md), que precisa ser confirmado com a equipe do back-end.
- O visual é provisório até a conferência com as telas do painel no Figma.
- As fontes Thunder e Random Grotesque e o logo oficial ainda não foram aplicados.
- Projetos, Serviços e Conteúdo do site ainda não têm funcionalidade.

### Próximo passo

Conectar o painel à API real, ajustar o visual pelo Figma e iniciar o módulo de Serviços (v0.2.0).
