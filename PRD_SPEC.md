# PRD_SPEC.md — Coffee Delivery

## 1. Visão Geral do Produto
O **Coffee Delivery** é uma aplicação web Single Page Application (SPA) de e-commerce fictício para uma cafeteria moderna e acolhedora. O produto permite que os clientes explorem um catálogo categorizado de cafés especiais, personalizem quantidades, gerenciem um carrinho de compras em tempo real, informem o endereço de entrega com busca automatizada via CEP (ViaCEP), selecionem o método de pagamento preferencial e finalizem o pedido recebendo uma confirmação visual detalhada e acolhedora.

O projeto foi concebido no âmbito acadêmico da disciplina de **Single Page Application (SPA)**, com foco em excelência arquitetural, usabilidade, acessibilidade, responsividade multiplataforma (mobile, tablet e desktop) e alternância de temas (Light/Dark Mode).

---

## 2. Objetivos de Negócio e de Aprendizagem
- **Simulação Fiel de E-commerce:** Fornecer um fluxo completo, contínuo e sem recarregamentos de página (SPA), desde a exploração até a confirmação do pedido.
- **Experiência do Usuário (UX/UI):** Interface visual moderna, feedback em tempo real de ações (adição ao carrinho, erros de formulário, loading de CEP), suporte a temas Claro e Escuro, e design responsivo.
- **Rigor Técnico e Qualidade:** Domínio prático de React com TypeScript, Context API com useReducer, imutabilidade em arrays e objetos, validação declarativa com React Hook Form e Zod, consumo de API pública e testes automatizados.
- **Uso Crítico de IA:** Documentação do processo de engenharia e criação de identidade visual exclusiva com suporte de IA.

---

## 3. Público-Alvo e Personas
- **Consumidor Urbano / Home Office:** Usuário que deseja pedir café de forma ágil durante o trabalho, valorizando agilidade, clareza nas informações de ingredientes, preços transparentes e facilidade no preenchimento de endereço via CEP.
- **Avaliador Acadêmico / Recrutador Técnico:** Profissional que analisa conformidade com boas práticas de engenharia de software, aderência aos requisitos funcionais, tipagem estrita, modularização e arquitetura limpa.

---

## 4. Requisitos Funcionais (RF)

| ID | Requisito Funcional | Critério de Aceite |
| :--- | :--- | :--- |
| **RF-01** | Exibir catálogo de cafés com imagem, nome, descrição, preço e tags/categorias | Todos os 14 cafés clássicos são renderizados na Home com dados tipados e imagens corretas. |
| **RF-02** | Selecionar a quantidade de cada café antes de adicioná-lo | Controles de incremento/decremento com quantidade inteira estritamente positiva (mínimo 1). |
| **RF-03** | Adicionar café ao carrinho e acumular quantidade de produto repetido | O item é adicionado ao estado global. Se já existir no carrinho, a quantidade selecionada é somada ao item existente, sem duplicar linhas. |
| **RF-04** | Exibir contador de unidades no Header | O badge sobre o ícone do carrinho exibe o somatório total de unidades de itens no carrinho (não apenas a quantidade de tipos). Se carrinho vazio, badge oculto ou zerado. |
| **RF-05** | Aumentar, diminuir e remover individualmente itens do carrinho | No Checkout, o usuário pode alterar a quantidade ou clicar em "Remover". Totais e contador são recalculados instantaneamente. |
| **RF-06** | Persistir carrinho com `localStorage` | O estado do carrinho é persistido no armazenamento local do navegador e reidratado automaticamente após atualização (F5). |
| **RF-07** | Navegar entre Home, Checkout e Confirmação com React Router | Transição rápida e fluida entre rotas sem nenhum recarregamento da janela (`window.location`). |
| **RF-08** | Preencher e validar endereço de entrega consultando obrigatoriamente API pública de CEP | Ao digitar um CEP de 8 dígitos válido, consumir a API ViaCEP e autopreencher Logradouro, Bairro, Cidade e UF. Número e complemento permanecem manuais. Tratar CEP inválido, inexistente ou falha de rede permitindo edição manual. |
| **RF-09** | Selecionar uma forma de pagamento: Crédito, Débito ou Dinheiro | O usuário é obrigado a selecionar uma das três opções fictícias antes de submeter o pedido. |
| **RF-10** | Exibir subtotal dos produtos, taxa de entrega e total geral | Subtotal calculado rigorosamente pela soma de itens; taxa de entrega fixa exibida (R$ 3,50); total é a soma de subtotal + taxa de entrega. |
| **RF-11** | Impedir finalização com carrinho vazio ou formulário inválido | Botão de confirmação bloqueia submissão e exibe mensagens de validação acessíveis caso haja campos incorretos ou se o carrinho não possuir itens. |
| **RF-12** | Confirmar pedido fictício e mostrar endereço e forma de pagamento | Ao finalizar com sucesso, direcionar para a tela de Sucesso exibindo o endereço de entrega completo e a forma de pagamento selecionada. |
| **RF-13** | Limpar o carrinho após pedido confirmado, preservando os dados do pedido concluído | O carrinho é esvaziado no estado global e no `localStorage`, enquanto o snapshot do pedido confirmado é salvo e exibido na rota `/success`. |
| **RF-14** | Alternar entre Light Mode e Dark Mode | Alternância acessível via botão no Header. Assegurar contraste, legibilidade e persistência da preferência no `localStorage`. |
| **RF-15** | Adaptar layout, componentes, formulário e carrinho para dispositivos móveis | Layout fluido e responsivo para telas pequenas (smartphones), médias (tablets) e amplas (desktops). |
| **RF-16** | Aplicar logo original desenvolvida com auxílio de IA | Marca exclusiva integrada no Header, Favicon e documentação da identidade visual. |

---

## 5. Regras de Negócio (RN)

- **RN-01 — Quantidades:** A quantidade selecionada para inclusão no carrinho deve ser um número inteiro >= 1. Não é permitida a adição de itens com quantidade <= 0. No carrinho, o decremento mínimo é 1; a exclusão do produto deve ser realizada por meio da ação explícita no botão "Remover".
- **RN-02 — Produto Único:** Itens com o mesmo identificador de produto (`id`) não geram novas linhas no carrinho. A quantidade adicionada é somada ao item existente.
- **RN-03 — Cálculo Financeiro e Taxa:**
  $$\text{Subtotal} = \sum (\text{Preço Unitário} \times \text{Quantidade})$$
  $$\text{Total} = \text{Subtotal} + \text{Taxa de Entrega}$$
  A taxa de entrega é padronizada em **R$ 3,50** (350 centavos).
- **RN-04 — Valores Monetários e Precisão:** Para evitar inconsistências de arredondamento inerentes ao padrão IEEE 754 de ponto flutuante em JavaScript, os cálculos monetários internos serão tratados em **centavos** (inteiros) e formatados para exibição em Real brasileiro (`pt-BR`, `R$ 0,00`).
- **RN-05 — Pagamento Fictício:** O pagamento possui finalidade estritamente ilustrativa e informativa, sem integração com gateways bancários ou transações financeiras reais.
- **RN-06 — Persistência e Snapshot:**
  - O carrinho deve ser salvo no `localStorage` sob a chave `@coffee-delivery:cart-state-1.0.0`.
  - O último pedido confirmado deve ser gravado em um snapshot desacoplado sob a chave `@coffee-delivery:last-order-1.0.0`.
  - A tela de Sucesso consome o snapshot do pedido, garantindo que o esvaziamento do carrinho não quebre a exibição dos dados confirmados.
- **RN-07 — Endereço e CEP:**
  - Campos obrigatórios: CEP, Rua (Logradouro), Número, Bairro, Cidade, UF.
  - Campo opcional: Complemento.
  - A busca do CEP ocorre automaticamente ao atingir 8 dígitos numéricos válidos. Caso a API retorne erro ou falhe, o usuário deve ser notificado e ter permissão para preencher todos os campos manualmente.
- **RN-08 — Dados Estáticos:** O catálogo de cafés é fornecido via arquivo estático tipado (`src/data/coffees.ts`), eliminando a necessidade de backend.

---

## 6. Requisitos Não Funcionais (RNF)

- **RNF-01 — Performance:** Tempo de carregamento inicial rápido com Vite, sem bundle inflado por dependências desnecessárias.
- **RNF-02 — Acessibilidade (a11y):** Utilização de HTML semântico (`header`, `main`, `section`, `article`, `button`), atributos `aria-label` em botões de ícone, contraste de cores em conformidade com WCAG AA em ambos os temas, e foco navegável por teclado.
- **RNF-03 — Compatibilidade Cross-Browser:** Suporte integral aos principais navegadores modernos (Chrome, Firefox, Safari, Edge).
- **RNF-04 — Tipagem Estrita:** TypeScript configurado em modo `strict`, proibindo o uso de `any` explícito ou casts inseguros.
- **RNF-05 — Modularidade e Testabilidade:** Separação estrita de responsabilidades entre camada de visualização, gerenciamento de estado e regras de domínio.

---

## 7. Critérios de Aceite Globais do Projeto
1. Fluxo de ponta a ponta sem erros no console (Home -> Adição -> Carrinho -> Checkout -> Preenchimento CEP -> Pagamento -> Sucesso).
2. Persistência de carrinho sobrevivendo a recarregamentos.
3. Dark e Light Mode funcionais com persistência.
4. Suíte de testes automatizados com cobertura das regras de negócio do carrinho, cálculos e formulário de checkout.
5. Build de produção (`npm run build`) executando sem avisos ou falhas de TypeScript.

