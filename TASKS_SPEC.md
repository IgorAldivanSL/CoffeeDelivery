# TASKS_SPEC.md — Coffee Delivery

## Acompanhamento de Tarefas e Checkpoints

Status possíveis:
- `Pendente`
- `Em andamento`
- `Concluído`
- `Bloqueado`

---

## CHECKPOINT 0 — Diagnóstico e Especificações Iniciais

| ID | Nome | Descrição | Dependências | Critérios de Conclusão | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TSK-001** | Inspeção do Workspace e Git | Verificar estado do diretório de trabalho, histórico git e configurações locais. | Nenhuma | Identificado que o workspace é um repo git vazio sem commits e sem arquivos base. | `Concluído` |
| **TSK-002** | Análise de Requisitos Acadêmicos | Localizar e analisar `ProjetoFinal.md` com requisitos RF-01 a RF-16 e RN-01 a RN-08. | Nenhuma | Documento localizado em Downloads e integralmente mapeado. | `Concluído` |
| **TSK-003** | Análise e Extração das Referências do Figma | Inspecionar arquivo zip com SVGs, paleta de cores, tipografia e assets do protótipo. | Nenhuma | Paleta (#DBAC2C, #8047F8 etc.), fontes (Baloo 2, Roboto) e ilustrações dos 14 cafés analisadas. | `Concluído` |
| **TSK-004** | Elaboração dos Documentos de Especificação | Criar PRD_SPEC.md, TECH_SPEC.md, TASKS_SPEC.md, AGENTS.md e README.md inicial. | TSK-001 a TSK-003 | Documentos técnicos e operacionais completos no repositório. | `Concluído` |
| **TSK-005** | Emissão do Relatório do Checkpoint 0 | Apresentar relatório de diagnóstico, riscos, decisões e planejamento formal. | TSK-004 | Relatório estruturado apresentado conforme o Master Prompt. | `Concluído` |

---

## CHECKPOINT 1 — Setup e Arquitetura

| ID | Nome | Descrição | Dependências | Critérios de Conclusão | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TSK-101** | Inicialização do Projeto com Vite + React + TypeScript | Configurar projeto Vite com template React-TS no workspace. | Checkpoint 0 | Projeto inicializado com scripts `dev`, `build` e `preview` funcionais. | `Concluído` |
| **TSK-102** | Instalação e Configuração de Dependências | Instalar React Router DOM, React Hook Form, Zod, @hookform/resolvers, ícones e ferramentas de teste (Vitest, RTL). | TSK-101 | Dependências instaladas sem conflitos no package.json. | `Concluído` |
| **TSK-103** | Estruturação de Pastas e Tipagens Base | Criar diretórios modulares (`components`, `pages`, `contexts`, `reducers`, `services`, `data`, `types`, `styles`, `utils`). | TSK-101 | Estrutura modular organizada com tipagens base criadas. | `Concluído` |
| **TSK-104** | Configuração do Ambiente de Testes (Vitest) | Configurar vitest.config.ts, setupTests.ts e scripts de teste no package.json. | TSK-102 | Comando `npm run test` ou `npx vitest run` executa com sucesso. | `Concluído` |
| **TSK-105** | Configuração do React Router | Configurar rotas base `/`, `/checkout` e `/success` com DefaultLayout. | TSK-103 | Navegação client-side funcional entre rotas. | `Concluído` |

---

## CHECKPOINT 2 — Identidade Visual, Temas e Layout Base

| ID | Nome | Descrição | Dependências | Critérios de Conclusão | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TSK-201** | Geração e Aplicação de Logo Original e Favicon | Criar vetor SVG original para a marca Coffee Delivery com auxílio de IA e configurar favicon. | TSK-103 | Logo original integrada ao Header e favicon.svg aplicado ao index.html. | `Concluído` |
| **TSK-202** | Configuração de Fontes e Design Tokens | Importar Google Fonts (Baloo 2 e Roboto) e definir variáveis CSS de cores, tipografia e espaçamentos. | TSK-103 | Tokens disponíveis globalmente e fontes aplicadas. | `Concluído` |
| **TSK-203** | Implementação do ThemeContext (Light & Dark Mode) | Criar contexto de tema com persistência em localStorage e alternância no elemento raiz. | TSK-202 | Alternância suave de tema sem flash, persistida ao recarregar a página. | `Concluído` |
| **TSK-204** | Componente Header com Badge do Carrinho e ThemeToggle | Criar Header responsivo contendo logo, seletor de localização fictícia, alternador de tema e botão do carrinho com contador. | TSK-201, TSK-203 | Header visualmente fiel ao Figma, acessível e responsivo. | `Concluído` |

---

## CHECKPOINT 3 — Catálogo de Produtos e Home

| ID | Nome | Descrição | Dependências | Critérios de Conclusão | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TSK-301** | Importação de Assets de Cafés e Dados Tipados | Mapear os 14 cafés da referência no arquivo estático `src/data/coffees.ts` com imagens SVG. | TSK-103 | Todos os 14 cafés disponíveis com dados tipados e imagens atribuídas. | `Concluído` |
| **TSK-302** | Seção Hero da Home | Implementar seção de apresentação da cafeteria com títulos em Baloo 2, lista de benefícios com ícones e ilustração. | TSK-202 | Seção Hero com tipografia, espaçamentos e responsividade conformes ao Figma. | `Concluído` |
| **TSK-303** | Componente QuantityInput | Criar componente de controle de quantidade com botões de incremento/decremento e restrição de valor mínimo 1. | TSK-202 | Componente com acessibilidade por teclado, sem permitir valores zero ou negativos. | `Concluído` |
| **TSK-304** | Componente CoffeeCard e Listagem de Produtos | Renderizar lista de cafés com tags, imagem, título, descrição, preço em BRL, QuantityInput e botão de adicionar ao carrinho. | TSK-301, TSK-303 | Cards alinhados em grid responsivo na Home. | `Concluído` |

---

## CHECKPOINT 4 — Gerenciamento do Carrinho (Context & Reducer)

| ID | Nome | Descrição | Dependências | Critérios de Conclusão | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TSK-401** | Implementação do CartReducer e Actions | Criar reducer puro com ações `ADD_ITEM`, `UPDATE_ITEM_QUANTITY`, `REMOVE_ITEM`, `CLEAR_CART` e `HYDRATE_CART`. | TSK-103 | Reducer imutável que acumula quantidades de produtos duplicados e nunca gera linhas repetidas. | `Concluído` |
| **TSK-402** | Criação do CartContext e useCart Hook | Provedor de contexto global expondo itens, total de unidades, subtotal, taxa de entrega e métodos de despacho de ações. | TSK-401 | Estado compartilhado e consumível em qualquer componente da árvore. | `Concluído` |
| **TSK-403** | Persistência com LocalStorage | Salvar estado do carrinho a cada modificação e carregar na inicialização. | TSK-402 | Carrinho preservado após refresh de página. | `Concluído` |
| **TSK-404** | Integração do Badge do Header com o Total de Itens | Conectar o contador no Header à soma das quantidades de todas as unidades no carrinho. | TSK-402, TSK-204 | Badge exibe a soma total de itens com atualização instantânea. | `Concluído` |

---

## CHECKPOINT 5 — Checkout e Consulta de CEP

| ID | Nome | Descrição | Dependências | Critérios de Conclusão | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TSK-501** | Serviço de Consulta ViaCEP | Criar cliente HTTP para a API pública ViaCEP com validação de formato e tratamento de erros. | TSK-103 | Consulta automática ao digitar 8 dígitos e tratamento de erros sem travar a UI. | `Concluído` |
| **TSK-502** | Formulário de Endereço com React Hook Form e Zod | Implementar formulário de endereço com autopreenchimento a partir do CEP e validação de campos obrigatórios. | TSK-102, TSK-501 | Campos validados com mensagens de erro claras e acessíveis. | `Concluído` |
| **TSK-503** | Seleção de Método de Pagamento | Componentes de rádio estilizados para Crédito, Débito e Dinheiro com validação de seleção obrigatória. | TSK-502 | Apenas um método selecionável por vez; validação bloqueia submissão sem seleção. | `Concluído` |
| **TSK-504** | Painel de Resumo do Carrinho no Checkout | Exibir itens selecionados com ajuste de quantidade e remoção, além dos valores de Subtotal, Taxa de Entrega e Total Geral. | TSK-402, TSK-303 | Cálculos monetários precisos e atualização em tempo real. | `Concluído` |
| **TSK-505** | Bloqueio de Envio com Carrinho Vazio | Desabilitar ou impedir envio caso o carrinho esteja vazio, exibindo feedback claro. | TSK-504 | Usuário impedido de submeter pedido vazio. | `Concluído` |

---

## CHECKPOINT 6 — Pedido, Confirmação e Snapshot

| ID | Nome | Descrição | Dependências | Critérios de Conclusão | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TSK-601** | Criação do Snapshot do Pedido e Limpeza do Carrinho | Ao validar e submeter o checkout, gerar snapshot desacoplado do pedido, gravá-lo no storage e limpar o carrinho. | TSK-502 a TSK-505 | Carrinho limpo e snapshot completo preservado com endereço, itens, valores e pagamento. | `Concluído` |
| **TSK-602** | Página de Confirmação (Success) | Renderizar tela de sucesso com ilustração, dados do endereço de entrega, previsão e forma de pagamento a partir do snapshot. | TSK-601 | Página `/success` exibe os dados confirmados mesmo com o carrinho vazio. | `Concluído` |
| **TSK-603** | Proteção da Rota de Confirmação | Impedir acesso direto à rota `/success` sem a existência de um pedido recém-concluído. | TSK-602 | Redirecionamento amigável para a Home caso não haja pedido no snapshot. | `Concluído` |

---

## CHECKPOINT 7 — Refinamento, Responsividade e Acessibilidade

| ID | Nome | Descrição | Dependências | Critérios de Conclusão | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TSK-701** | Responsividade Mobile e Tablet | Ajustar breakpoints, empilhamento de colunas no Checkout, grid da Home e menu no Header para telas pequenas. | Checkpoint 6 | Layout fluido e usável em 320px, 768px e 1200px+. | `Concluído` |
| **TSK-702** | Validação de Acessibilidade (a11y) | Verificar contraste WCAG AA em Light e Dark Mode, foco visível, rótulos ARIA e navegação por teclado. | Checkpoint 6 | Interface navegável exclusivamente via teclado sem perda de contexto. | `Concluído` |
| **TSK-703** | Microinterações e Estados de Feedback | Adicionar feedback visual (toasts ou alertas amigáveis) para itens adicionados, CEP carregando e remoção de produtos. | Checkpoint 6 | Interface responsiva e informativa com feedbacks claros. | `Concluído` |

---

## CHECKPOINT 8 — Testes Automatizados e Qualidade

| ID | Nome | Descrição | Dependências | Critérios de Conclusão | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TSK-801** | Testes Unitários do CartReducer | Escrever testes para adicionar, acumular, alterar quantidade, remover e limpar itens. | Checkpoint 4 | Todos os testes unitários passando com 100% de assertividade na lógica de negócio. | `Concluído` |
| **TSK-802** | Testes do Serviço de CEP e Cálculos | Escrever testes para formatação de moeda, cálculo de subtotal/total e mock da API de CEP. | Checkpoint 5 | Testes de serviço e utilitários aprovados. | `Concluído` |
| **TSK-803** | Testes de Componentes e Formulário | Testar componentes `QuantityInput`, `CoffeeCard` e validação do formulário de Checkout. | Checkpoint 5 | Validações de UI e erros de formulário verificados. | `Concluído` |
| **TSK-804** | Verificação de Tipagem Estrita e Build | Executar verificação TypeScript (`tsc --noEmit`) e build de produção (`npm run build`). | TSK-801 a TSK-803 | Build e typecheck concluídos sem erros ou advertências. | `Concluído` |

---

## CHECKPOINT 9 — Revisão Final e Entrega

| ID | Nome | Descrição | Dependências | Critérios de Conclusão | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TSK-901** | Revisão Técnica e de Código | Limpeza de código morto, inspeção de imports, validação de imutabilidade e boas práticas. | Checkpoint 8 | Código limpo, sem `any`, sem TODOs e bem documentado. | `Pendente` |
| **TSK-902** | Atualização Completa da Documentação e README | Finalizar README.md com instruções completas, badges, decisões de arquitetura e evidências. | TSK-901 | Todos os documentos SPEC e README atualizados e consistentes. | `Pendente` |
| **TSK-903** | Checklist Final de Entrega Acadêmica | Validação cruzada de todos os critérios de aceite de RF-01 a RF-16 e RN-01 a RN-08. | TSK-902 | Todos os critérios atendidos com evidências técnicas verificadas. | `Pendente` |
