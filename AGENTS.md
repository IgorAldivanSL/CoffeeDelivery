# AGENTS.md — Coffee Delivery

## 1. CONTEXTO DO PROJETO

Coffee Delivery é uma aplicação web SPA de e-commerce fictício para uma cafeteria, desenvolvida como projeto final da disciplina Single Page Application (SPA).

O objetivo é desenvolver uma aplicação funcional, responsiva, visualmente profissional e tecnicamente organizada, demonstrando os principais conceitos de desenvolvimento Front-end estudados durante a disciplina.

### Tecnologias obrigatórias

- React.
- Vite.
- TypeScript.
- React Router.
- Context API.
- useReducer.
- React Hook Form.
- Zod.
- LocalStorage.

A aplicação não possui backend próprio, banco de dados, autenticação ou pagamento real.

---

## 2. OBJETIVO DO AGENTE

Atuar como agente de engenharia de software responsável por desenvolver, revisar, testar e documentar o Coffee Delivery.

Priorizar:

- Aderência aos requisitos.
- Qualidade do código.
- Organização.
- Componentização.
- Tipagem.
- Responsividade.
- Acessibilidade.
- UX/UI.
- Testes.
- Documentação.
- Manutenibilidade.

Não atuar apenas como gerador de código. Analisar, planejar, implementar e validar.

---

## 3. FONTES DE VERDADE

Ao tomar decisões, respeitar a seguinte prioridade:

1. Requisitos obrigatórios do projeto (`ProjetoFinal.md`).
2. Protótipo oficial do Figma.
3. PRD_SPEC.md.
4. TECH_SPEC.md.
5. TASKS_SPEC.md.
6. Este AGENTS.md.
7. Decisões técnicas documentadas.
8. Boas práticas de desenvolvimento.

Caso existam conflitos, não altere requisitos silenciosamente. Identifique e documente a divergência.

---

## 4. ESCOPO FUNCIONAL

A aplicação deverá contemplar:

- Catálogo de cafés.
- Imagens, descrição, preço e categorias.
- Seleção de quantidade.
- Adição ao carrinho.
- Acúmulo de quantidades.
- Contador do carrinho.
- Incremento e decremento.
- Remoção de produtos.
- Persistência com LocalStorage.
- Navegação com React Router.
- Checkout.
- Formulário de endereço.
- Consulta de CEP por API pública.
- Seleção de forma de pagamento.
- Subtotal.
- Taxa de entrega.
- Total.
- Validação.
- Pedido fictício.
- Tela de confirmação.
- Snapshot do pedido.
- Limpeza do carrinho após a conclusão.
- Dark Mode.
- Light Mode.
- Responsividade.
- Logo original.

Não adicionar funcionalidades que extrapolem esse escopo sem autorização.

---

## 5. LIMITES DE ESCOPO

Não implementar, salvo autorização expressa:

- Backend.
- Banco de dados.
- Autenticação.
- Cadastro de usuários.
- Pagamento real.
- Gateway de pagamentos.
- Rastreamento de pedidos.
- Sistema de entregadores.
- Administração.
- Cupons.
- Programa de fidelidade.
- Funcionalidades extras que aumentem desnecessariamente a complexidade.

A aplicação deverá permanecer uma SPA de e-commerce fictício.

---

## 6. ARQUITETURA E ORGANIZAÇÃO

Utilizar arquitetura modular e simples.

Separar responsabilidades entre componentes, páginas, estado, serviços, tipos, dados e utilitários.

Estrutura sugerida:

- src/components
- src/pages
- src/contexts
- src/reducers
- src/hooks
- src/services
- src/types
- src/data
- src/utils
- src/assets
- src/styles

Adapte a estrutura ao projeto existente.

Não crie diretórios ou abstrações sem necessidade.

### Regras de arquitetura

- Componentes devem possuir responsabilidades claras.
- Evitar componentes excessivamente grandes.
- Evitar lógica de negócio dentro de componentes visuais.
- Reutilizar componentes quando houver justificativa.
- Evitar duplicação.
- Centralizar regras de negócio.
- Centralizar cálculos.
- Separar serviços de componentes.
- Manter tipagem consistente.
- Evitar dependências desnecessárias.

---

## 7. CONVENÇÕES DE CÓDIGO

- Utilizar TypeScript.
- Evitar `any`.
- Evitar casts desnecessários.
- Preferir interfaces e tipos explícitos quando apropriado.
- Respeitar imutabilidade.
- Utilizar nomes descritivos.
- Manter código legível.
- Evitar funções excessivamente grandes.
- Evitar abstrações prematuras.
- Evitar duplicação.
- Remover código morto quando seguro.
- Não ignorar erros de compilação.
- Não desabilitar ferramentas de qualidade para contornar problemas.
- Não utilizar comentários como substituto de implementação.
- Não deixar TODOs sem justificativa.

Utilizar convenções consistentes de nomenclatura.

---

## 8. GERENCIAMENTO DE ESTADO

Utilizar Context API e useReducer para o gerenciamento do carrinho.

O gerenciamento deverá contemplar:

- Adição.
- Incremento.
- Decremento.
- Remoção.
- Limpeza.
- Cálculos.
- Persistência.

O estado deverá respeitar imutabilidade.

Não manipular diretamente o estado.

Não espalhar a lógica do carrinho entre componentes.

Evitar contextos desnecessários.

---

## 9. REGRAS DO CARRINHO

### Quantidades

Não permitir quantidades inválidas (mínimo 1).

### Produto único

O mesmo produto não deverá gerar linhas duplicadas no carrinho.

Novas adições deverão acumular quantidades.

### Persistência

Persistir o carrinho no LocalStorage.

Recuperar o carrinho após atualização da página.

### Cálculos

Subtotal = soma de preço unitário multiplicado pela quantidade.

Total = subtotal + taxa de entrega.

### Valores monetários

Utilizar estratégia que evite problemas de precisão monetária, preferencialmente cálculos em centavos.

Exibir valores em BRL com formatação brasileira.

### Limpeza

Após a confirmação do pedido, limpar o carrinho sem perder os dados do pedido concluído.

---

## 10. CHECKOUT E CEP

Utilizar React Hook Form e Zod.

Campos:

- CEP.
- Rua.
- Número.
- Complemento.
- Bairro.
- Cidade.
- UF.

Complemento opcional.

### Consulta de CEP

Utilizar obrigatoriamente uma API pública de CEP, como ViaCEP.

Preencher automaticamente os campos disponíveis:

- Rua.
- Bairro.
- Cidade.
- UF.

Número e complemento deverão ser informados manualmente.

Tratar:

- CEP inválido.
- CEP não encontrado.
- Indisponibilidade.
- Erro de comunicação.
- Carregamento.
- Campos ausentes.

Não simular a consulta no fluxo real.

Organizar a consulta em serviço apropriado.

---

## 11. PAGAMENTO E PEDIDO

Disponibilizar:

- Crédito.
- Débito.
- Dinheiro.

O pagamento é fictício.

Não integrar transações reais.

A finalização deverá validar os dados e gerar um snapshot independente do carrinho.

O snapshot deverá preservar:

- Produtos.
- Quantidades.
- Preços.
- Subtotal.
- Taxa de entrega.
- Total.
- Endereço.
- Forma de pagamento.

A confirmação deverá utilizar os dados do pedido concluído, não o estado atual do carrinho.

---

## 12. UX/UI E IDENTIDADE VISUAL

Utilizar o Figma como referência principal.

Desenvolver uma identidade visual coerente com uma cafeteria.

A aplicação deverá possuir:

- Logo original desenvolvida com suporte de IA.
- Favicon.
- Paleta de cores.
- Tipografia.
- Design tokens.
- Light Mode.
- Dark Mode.

### Diretrizes

- Interface moderna.
- Hierarquia visual clara.
- Espaçamentos consistentes.
- Tipografia legível.
- Componentes consistentes.
- Feedback visual.
- Estados de carregamento.
- Estados vazios.
- Estados de erro.
- Transições discretas.
- Layout responsivo.

Evitar:

- Excesso de elementos decorativos.
- Gradientes desnecessários.
- Animações exageradas.
- Layout genérico.
- Elementos visualmente inconsistentes.
- Complexidade visual que prejudique a usabilidade.

---

## 13. RESPONSIVIDADE

Garantir utilização adequada em:

- Desktop.
- Tablet.
- Mobile.

Adaptar:

- Header.
- Catálogo.
- Cards.
- Carrinho.
- Checkout.
- Formulários.
- Resumo.
- Botões.
- Layout.

Validar o fluxo completo em telas pequenas.

---

## 14. ACESSIBILIDADE

Priorizar:

- HTML semântico.
- Labels.
- Contraste.
- Navegação por teclado.
- Foco visível.
- Mensagens acessíveis.
- Estrutura de headings.
- Botões com nomes claros.
- Feedback de erros.
- Uso correto de atributos ARIA.

---

## 15. TESTES E VALIDAÇÃO

Utilizar Vitest e React Testing Library.

Priorizar testes para:

- Reducer.
- Carrinho.
- Quantidades.
- Cálculos.
- Persistência.
- Formulários.
- Validação.
- CEP.
- Pagamento.
- Snapshot.
- Confirmação.
- Limpeza do carrinho.
- Navegação.
- Temas.

Executar testes e validações pertinentes após as alterações.

Verificar:

- TypeScript.
- Build.
- Testes.

Não declarar testes como aprovados sem executá-los.

---

## 16. DOCUMENTAÇÃO

Manter os seguintes documentos atualizados:

- PRD_SPEC.md.
- TECH_SPEC.md.
- TASKS_SPEC.md.
- AGENTS.md.
- README.md.

---

## 17. GIT E SEGURANÇA OPERACIONAL

- Preservar alterações existentes.
- Não excluir arquivos importantes.
- Não fazer commits automaticamente.
- Não fazer push automaticamente.
- Não publicar automaticamente.
- Não alterar branches sem autorização.
- Não executar operações destrutivas.
- Não alterar arquivos fora do workspace.
- Não modificar configurações globais sem autorização.

