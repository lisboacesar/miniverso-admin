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
| 0.3.0 | 15/10/2026 | Revisão dos comentários do João: leads, imagem de fundo e propostas | entregue com mock |
| 0.4.0 | 15/10/2026 | Modo escuro no painel e no Figma | entregue com mock |
| 0.5.0 | a definir | Editor e leads ligados às rotas reais e envio de imagens | depende do back-end |
| 0.6.0 | a definir | Ajustes finais, testes com pessoas de fora da equipe e publicação | planejada |

---

## v0.4.0 · 15/10/2026 · Modo escuro

### O que mudou no painel

- **Botão de tema no cabeçalho**, ao lado de "Ver site": "Modo escuro" com a lua no tema claro e "Modo claro" com o sol no tema escuro. Abaixo de 1024 px aparece só o ícone, com área de toque de 44 px e dica ao passar o mouse; o leitor de tela continua lendo o nome do botão. No celular, o espaço entre os botões do cabeçalho diminuiu para o título da página caber inteiro.
- **Primeira visita segue o sistema**: sem escolha salva, o painel usa o tema do aparelho. Depois do clique, a escolha fica num cookie por um ano e vale em todas as telas, inclusive no login.
- **Sem piscar o tema errado**: o servidor lê o cookie e já entrega a página com o tema certo (`data-theme` no `<html>`, em `app/layout.tsx`). Sem cookie, o CSS segue `prefers-color-scheme`. Nenhum script roda antes da página carregar.
- **Cores por papel**: os componentes deixaram as cores fixas e passaram a usar papéis como `--color-surface`, `--color-text` e `--color-accent`. O modo escuro troca só os papéis. Menu lateral, lateral do login e aviso flutuante já eram escuros e continuam iguais.
- **Contornos no modo escuro**: modais, avisos, menu lateral e lateral do login ganham uma linha clara sutil para não se misturarem com o fundo.
- **Página não encontrada**: o botão agora diz "Ir para o painel", porque a visão geral não existe mais.

### O que mudou no Figma

- Nova coleção de variáveis **Painel · Cores**, com os modos **Claro** e **Escuro** (28 cores). Todas as cores das telas do painel foram ligadas a ela, 2.350 preenchimentos e contornos, sem mudar o tema claro.
- Componente **Botão / Tema**, com os estados "Modo escuro" e "Modo claro", no fim da barra superior das 12 telas.
- Nova seção **Painel · Modo escuro**: legenda, tabela das variáveis com as amostras dos dois modos e cópias de 8 telas com o modo Escuro aplicado (editor, painel lateral de projeto, confirmação de remoção, estados do editor e lista, detalhe, exclusão e estados de leads).
- Na página 99 · Propostas, a personalização com limites passou a dizer que o modo escuro já existe e não depende dela.

### Requisitos atendidos

| Requisito | Como foi atendido |
| --- | --- |
| RNF33 | Contraste conferido por teste nos dois temas. No escuro, sobre a superfície: texto principal 14,4:1, secundário 7,7:1, azul 7,4:1 e erro 7,9:1; avisos de sucesso 9,1:1 e de atenção 9,4:1 sobre o próprio fundo |
| RNF35 | Foco visível nos dois temas; no escuro o contorno é azul claro (`#8AA6FF`, 7,4:1) |
| RNF39 | O botão troca de ícone (lua ou sol) e de texto; o estado não depende só da cor |
| RNF40 | Botão de 44 × 44 px no tablet e no celular |
| RNF28 | Mesmo desenho do link "Ver site"; todos os componentes usam os mesmos papéis de cor |
| RNF41 | Um clique, sem configuração; a escolha fica salva |
| 3.1.1 | Identidade mantida: botões no azul `#2450E6`, texto claro sobre azul-marinho |

### Capturas de tela

Capturas da v0.4.0 em modo mock, com dados fictícios. No ambiente de captura as fontes do Google não carregam, então aparecem as fontes de reserva.

| | |
| --- | --- |
| ![Login](prints/v0.4.0/01-login-escuro.png) Login no modo escuro | ![Botão no tema claro](prints/v0.4.0/02-editor-claro-botao-modo-escuro.png) Botão "Modo escuro" no tema claro |
| ![Editor](prints/v0.4.0/03-editor-escuro.png) Editor: Hero | ![Sobre](prints/v0.4.0/04-editor-sobre-escuro.png) Editor: Sobre a Miniverso |
| ![Erros no modal](prints/v0.4.0/05-modal-erros-escuro.png) Campos obrigatórios | ![Remover](prints/v0.4.0/06-confirmar-remocao-escuro.png) Confirmação (RNF42) |
| ![Projeto](prints/v0.4.0/07-painel-lateral-escuro.png) Projeto em painel lateral | ![Alteração pendente](prints/v0.4.0/08-alteracao-pendente-escuro.png) Alteração pendente |
| ![Menu da conta](prints/v0.4.0/09-menu-conta-escuro.png) Menu da conta | ![Leads](prints/v0.4.0/10-leads-escuro.png) Lista de leads |
| ![Detalhe](prints/v0.4.0/11-lead-detalhe-escuro.png) Detalhe do lead | ![Aviso](prints/v0.4.0/12-aviso-escuro.png) Aviso de contato copiado |
| ![Excluir](prints/v0.4.0/13-excluir-lead-escuro.png) Excluir lead (RNF42) | ![Erro](prints/v0.4.0/14-erro-escuro.png) Falha ao carregar (RNF43) |
| ![Carregando](prints/v0.4.0/15-carregando-escuro.png) Carregando | ![Foco](prints/v0.4.0/16-foco-teclado-escuro.png) Foco pelo teclado (RNF35) |
| ![Tablet](prints/v0.4.0/17-tablet-escuro.png) Tablet | ![Celular, editor](prints/v0.4.0/18-celular-editor-escuro.png) Celular: editor |
| ![Celular, menu](prints/v0.4.0/19-celular-menu-escuro.png) Celular: menu | ![Celular, leads](prints/v0.4.0/20-celular-leads-escuro.png) Celular: leads |

### Testes

- `npm test`: 73 testes passando. Novos: `theme.test.ts` (valor do cookie, sistema e escolha salva, alternância e formato do cookie) e `theme-tokens.test.ts` (blocos do modo escuro iguais, todo papel com valor no escuro, contraste mínimo nos dois temas e componentes sem cores fixas).
- Tema claro conferido elemento por elemento: estilo calculado de todos os elementos em 29 estados, antes e depois da troca para papéis. Só mudou a cor do título dos formulários em modal, como descrito acima.
- Modo escuro conferido pelos dois caminhos: as 29 capturas pelo cookie e pelo tema do sistema ficam idênticas, e "claro" salvo com o sistema escuro fica idêntico ao tema claro padrão.
- Botão testado no navegador: clique, recarregar, outra página, tela de login, cookie com valor inválido, teclado (Tab e Enter) e celular.
- Cabeçalho conferido em 360, 390, 600, 767, 768, 800, 900, 1024 e 1280 px: nenhum título cortado e nenhuma rolagem lateral.

### Decisões

- **Botão no cabeçalho, não no menu da conta**: fica à vista em todas as telas, também no celular, e resolve com um clique (RNF41).
- **Cookie em vez de localStorage**: com o cookie, o servidor desenha a página já no tema escolhido, sem mostrar o claro por um instante antes do escuro. Ele guarda só `light` ou `dark`, sem dado pessoal.
- **Seguir o sistema na primeira visita**: quem já usa o aparelho no escuro não precisa fazer nada.
- **Cookie lido no layout raiz**: isso deixa todas as rotas com renderização dinâmica. No painel não muda nada na prática, porque as telas protegidas já eram dinâmicas por causa da sessão.
- **Cores de ação iguais nos dois temas**: o azul dos botões e o vermelho de exclusão não mudam, com texto branco acima de 6:1.

### Pontos de atenção

- **Fora do DRDA**: o DRDA não cita modo escuro. Foi incluído a pedido da equipe, sem mudar a identidade (3.1.1). Vale registrar no DRDA ou no relatório.

### Limitações conhecidas

- A escolha vale por navegador: em outro computador, o painel começa de novo pelo tema do sistema.
- Depois de escolher, não há botão para voltar a seguir o sistema; para isso é preciso apagar o cookie. Se fizer falta, dá para incluir a opção "Automático".
- A ligação com as rotas reais de conteúdo, leads e envio de imagens continua com o mock e passou para a v0.5.0.

### Próximo passo

Ligar o editor e os leads às rotas reais quando o back-end criar `/site-content`, `/leads` e o envio de imagens (v0.5.0).

---

## v0.3.0 · 15/10/2026 · Revisão dos comentários do João

### Contexto

O João deixou 4 comentários no frame "Painel · Editor da página inicial" do Figma. Cada comentário foi conferido com o DRDA antes de virar mudança. O que o DRDA prevê entrou no painel e no Figma. O que não prevê foi para a página **99 · Propostas** do Figma e para [PROPOSTAS.md](PROPOSTAS.md), para o cliente decidir.

### Análise dos comentários

| # | Comentário (resumo) | Decisão | Base no DRDA |
| --- | --- | --- | --- |
| 1 | Não haverá dashboards; o dashboard deve ser um gráfico da interação de leads | Item "Dashboard" saiu do menu. O gráfico virou proposta | Em 2.2, "dashboard" é o próprio painel administrativo. Nenhum RF pede gráficos |
| 2 | O layout precisa de mais detalhe e de um menu para alterar toda a estrutura | O painel "Estrutura da página" já faz isso: ordem, visibilidade e edição de cada seção. O Figma ganhou as telas de Leads, os estados e a nota do cabeçalho | RF15, RF18, RNF41 |
| 3 | Alterar cores, planos de fundo, fontes, textos e disposição de qualquer elemento | Entrou a imagem de fundo por seção. Cor, fonte e disposição livres viraram proposta de personalização com limites | Identidade própria (3.1.1), RN06, RNF28, RNF33, RNF41 |
| 4 | Login, recuperação de senha, imagem de fundo, tela de leads e gráfico | Login já existia. Leads voltou e a imagem de fundo entrou. Recuperação de senha e gráfico viraram propostas | RF11, RF15, RF16, RF17. Recuperação de senha não está no DRDA nem no back-end |

### O que mudou no painel

- **Leads** (`/admin/leads`): tabela com nome e empresa, contato, serviço de interesse e data de envio. Busca por nome, e-mail ou empresa (sem diferenciar acentos), filtro por serviço, ordenação por data e paginação de 10 em 10. No celular, a tabela vira cartões.
- **Detalhe do lead** (`/admin/leads/{id}`): mensagem completa, e-mail e telefone com botão de copiar, "Responder por e-mail" (abre o e-mail com destinatário e assunto preenchidos), "Copiar contato" e "Excluir lead". Um aviso lembra que os dados só servem para responder ao contato (LGPD).
- **Exclusão** com modal que nomeia o lead e avisa que a ação é permanente. O botão mostra "Excluindo..." e não aceita um segundo clique.
- **Serviço de interesse** usa os serviços da seção Serviços da página inicial, a mesma lista que o formulário de contato do site oferece. O lead guarda também o nome do serviço no momento do envio, para continuar legível se o serviço mudar de nome.
- **Imagem de fundo (opcional)** em Sobre, Serviços, Projetos, Diferenciais, Experiência interativa, Processo, Clientes e Contato. É decorativa, então não pede texto alternativo. O Hero continua com o fundo próprio, que pede texto alternativo, e o Rodapé não tem fundo (RIU27).
- **Nota do cabeçalho** no painel de estrutura: o menu do site e os atalhos do rodapé seguem as seções visíveis, na ordem da lista.
- **Menu lateral** com "Página inicial" e "Leads".

### O que mudou no Figma

- Editor: campo "Imagem de fundo (opcional)" nas 8 seções, com a explicação ao lado; item "Dashboard" removido dos 10 menus; nota do cabeçalho nos 10 painéis de estrutura; linhas de frames reespaçadas para nada se sobrepor.
- Nova seção **Painel · Leads**: legenda, lista, detalhe, confirmação de exclusão e estados (carregando, lista vazia, busca sem resultado, erro, excluindo, excluído, lead não encontrado e copiar).
- Nova página **99 · Propostas**: recuperação de senha, gráfico de leads por período e personalização com limites, cada uma com origem, motivo de estar fora do DRDA, o que exigiria e um esboço.
- Contraste conferido em todos os pares novos: texto secundário `#666e7d` sobre `#f6f8fb` (4,8:1) e sobre branco (5,1:1), serviço `#2450e6` sobre `#e5f0ff` (5,4:1), sucesso `#0e6b3c` sobre `#e0f7e8` (5,9:1), erro `#b42323` sobre `#fce8e8` (5,6:1), links `#1a66ed` sobre branco (5,0:1) e exclusão `#cc2e2e` sobre branco (5,3:1).

### Requisitos atendidos

| Requisito | Como foi atendido |
| --- | --- |
| RF16, RNF19, RN05 | Lista de leads guardados, visível só com sessão |
| RF17 | Detalhe com todos os dados e a mensagem completa |
| RF15 | Imagem de fundo como imagem institucional de cada seção |
| RNF08, RNF29 | Carregando, vazio, erro, "Excluindo..." e aviso de sucesso |
| RNF18 | Dados fictícios e aviso de uso dos dados no detalhe |
| RNF22 | Mensagem do visitante exibida como texto, nunca como HTML |
| RNF33 | Na página pública, o fundo recebe uma camada para manter o contraste do texto (no contrato) |
| RNF34 | Imagem decorativa sem texto alternativo; imagens com conteúdo continuam pedindo |
| RNF39 | Serviço, estados e avisos com texto e ícone, não só cor |
| RNF42 | Exclusão só depois de confirmar num modal que nomeia o lead |
| RNF43 | "Não foi possível conectar. Verifique sua internet e tente de novo." |

### Capturas de tela

Capturas da v0.3.0 em modo mock, com dados fictícios. No ambiente de captura as fontes do Google não carregam, então aparecem as fontes de reserva.

| | |
| --- | --- |
| ![Campo de fundo](prints/v0.3.0/01-sobre-campo-fundo.png) Campo de imagem de fundo | ![Fundo enviado](prints/v0.3.0/02-sobre-fundo-enviado.png) Fundo enviado, sem texto alternativo |
| ![Publicado com fundo](prints/v0.3.0/03-publicado-com-fundo.png) Publicado com fundo | ![Leads](prints/v0.3.0/04-leads-lista.png) Lista de leads |
| ![Busca](prints/v0.3.0/05-leads-busca.png) Busca | ![Filtro](prints/v0.3.0/06-leads-filtro-servico.png) Filtro por serviço |
| ![Sem resultado](prints/v0.3.0/07-leads-sem-resultado.png) Busca sem resultado | ![Detalhe](prints/v0.3.0/08-lead-detalhe.png) Detalhe do lead |
| ![Confirmação](prints/v0.3.0/09-lead-excluir-confirmacao.png) Confirmação (RNF42) | ![Excluído](prints/v0.3.0/10-lead-excluido-toast.png) Lead excluído |
| ![Erro](prints/v0.3.0/11-leads-erro.png) Falha ao carregar | ![Tablet](prints/v0.3.0/12-tablet-leads.png) Tablet |
| ![Celular, leads](prints/v0.3.0/13-mobile-leads.png) Celular: leads | ![Celular, detalhe](prints/v0.3.0/14-mobile-lead-detalhe.png) Celular: detalhe |
| ![Celular, menu](prints/v0.3.0/15-mobile-menu.png) Celular: menu | |

### Testes

- `npm test`: 63 testes passando. Novos: lista de leads no mock (ordem, busca sem acento, filtro por serviço, 401 sem token, exclusão), leads pela ponte e no modo híbrido, conversão de lead e da paginação do Laravel, imagem de fundo opcional e decorativa.
- Fluxos conferidos no navegador em 1440, 1024 e 390 px: enviar fundo e publicar sem texto alternativo, buscar, filtrar, abrir o detalhe, copiar, excluir e falha ao carregar. Nenhum alvo de toque abaixo de 44 px no celular.

### Pontos de atenção

- **Leads voltou ao painel.** Na v0.2.0 o módulo tinha saído porque a divisão da equipe deixou para esta parte só o editor. O comentário #4 pede a tela e o DRDA prevê (RF16, RF17). Se outra pessoa da equipe já estiver com leads, o módulo sai sem afetar o editor: pasta `src/features/leads`, as duas rotas e o item do menu.
- **Contraste de pares antigos do Figma** abaixo de 4,5:1 (RNF33): dica dos campos de envio `#99a1ad` sobre `#eceff3` (2,3:1), aviso de sucesso `#148c52` sobre `#e0f7e8` (3,8:1), etiquetas de requisito `#1a66ed` sobre `#e5f0ff` (4,4:1) e aviso de erro `#cc2e2e` sobre `#fce8e8` (4,46:1). No código esses pares já usam as cores do `globals.css`, que passam.

### Limitações conhecidas

- O back-end ainda não tem `/leads` nem `/site-content`; as duas partes rodam com o mock (contrato em [CONTRATO-API.md](CONTRATO-API.md)).
- O envio de imagens, incluindo o fundo, guarda a prévia no próprio conteúdo até existir a rota de upload.

### Próximo passo

Quando o back-end criar `/leads`, `/site-content` e o envio de imagens, tirar os nomes de `MOCK_RESOURCES` e conferir o painel com a API real (v0.4.0).

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
