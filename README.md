# ☕ Coffee Delivery — Projeto Final SPA

<p align="center">
  <img src="src/assets/brand/logo.svg" alt="Coffee Delivery Logo" width="320" />
</p>

<p align="center">
  <strong>Encontre o café perfeito para qualquer hora do dia. Uma experiência moderna, acolhedora e completa de e-commerce SPA.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Vitest-2.1-6E9F18?logo=vitest&logoColor=white" alt="Vitest" />
  <img src="https://img.shields.io/badge/Status-100%25%20Concluído-success" alt="Status" />
</p>

---

## 📖 1. Sobre o Projeto

O **Coffee Delivery** é uma aplicação web Single Page Application (SPA) desenvolvida como **Projeto Final Avaliativo** da disciplina **Single Page Application (SPA)**. A aplicação simula o fluxo pontual e completo de e-commerce para uma cafeteria especializada em grãos selecionados, proporcionando navegação fluida, interface visual responsiva, suporte a **Light e Dark Mode**, e validação robusta de formulários com integração à API pública do **ViaCEP**.

---

## ✨ 2. Funcionalidades Principais

- ☕ **Catálogo Completo de Cafés (RF-01, RF-02):** 14 opções de cafés especiais tipados com tags, imagens, descrições detalhadas e seletor de quantidade inteira positiva com mínimo de 1 unidade (RN-01).
- 🛒 **Carrinho de Compras Reativo (RF-03, RF-04, RF-05):**
  - Adição ao carrinho com acúmulo de quantidades de produtos repetidos sem duplicar linhas (RN-02).
  - Badge numérico no Header representando o somatório total de unidades no carrinho (RF-04).
  - Alteração de quantidades e remoção individual de itens diretamente no Checkout (RF-05).
- 💾 **Persistência com LocalStorage (RF-06):** Carrinho e preferências de tema reidratados automaticamente após recarregamento da página (F5).
- 🧭 **Roteamento SPA Client-Side (RF-07):** Transição instantânea sem recarregamento de página entre `/` (Home), `/checkout` (Checkout) e `/success` (Confirmação).
- 📮 **Checkout Inteligente com ViaCEP (RF-08, RN-07):**
  - Autopreenchimento automático de Rua, Bairro, Cidade e UF ao informar um CEP de 8 dígitos.
  - Tratamento resiliente para CEPs inválidos, inexistentes ou indisponibilidade de rede, permitindo preenchimento manual alternativo.
- 💳 **Seleção de Pagamento Fictício (RF-09, RN-05):** Escolha obrigatória entre Cartão de Crédito, Cartão de Débito e Dinheiro.
- 💰 **Cálculos Financeiros Precisos em Centavos (RF-10, RN-03, RN-04):** Subtotal calculado item a item, taxa fixa de entrega de R$ 3,50 e total geral com prevenção rigorosa de erros de ponto flutuante (IEEE 754).
- 🛡️ **Validação com Zod e React Hook Form (RF-11):** Bloqueio de submissão com carrinho vazio ou dados incompletos, com feedback acessível.
- 🎉 **Snapshot do Pedido e Confirmação Desacoplada (RF-12, RF-13, RN-06):**
  - Ao confirmar o pedido, um snapshot independente é gerado e o carrinho é esvaziado.
  - A rota `/success` consome os dados do snapshot e permanece correta mesmo após o esvaziamento do carrinho.
  - Proteção de rota contra acessos diretos não autorizados.
- 🌓 **Light Mode e Dark Mode (RF-14):** Alternância instantânea de temas com alto contraste (WCAG AA), design tokens e persistência da preferência.
- 📱 **Design Responsivo (RF-15):** Adaptação fluida e confortável para telas de Smartphones (320px+), Tablets (768px+) e Desktops (1200px+).
- 🎨 **Identidade Visual e Logo Original com IA (RF-16):** Vetor SVG original com linhas de velocidade/entrega e xícara de café, harmonizado com o Favicon e com o protótipo do Figma.

---

## 🏗️ 3. Arquitetura do Software

A estrutura de diretórios foi desenhada para garantir alta coesão, baixo acoplamento e separação clara de responsabilidades:

```
src/
├── assets/                   # SVGs dos 14 cafés, logo original e ilustrações
│   ├── brand/                # Logo oficial e favicon
│   ├── coffees/              # 14 ilustrações vetoriais dos cafés
│   └── illustrations/        # Ilustrações Hero e Entregador da Confirmação
├── components/               # Componentes visuais reutilizáveis
│   ├── CartItemCard/         # Item do carrinho com controles e botão remover
│   ├── CoffeeCard/           # Card do catálogo com seletor e botão de adicionar
│   ├── Header/               # Topbar com logo, localização, tema e badge
│   └── QuantityInput/        # Controle acessível de quantidade (+ e -)
├── contexts/                 # Contextos de estado global
│   ├── CartContext.tsx       # Gerenciamento global do carrinho e snapshot
│   └── ThemeContext.tsx      # Gerenciamento do tema Light / Dark
├── data/                     # Dados estáticos tipados
│   └── coffees.ts            # Definição dos 14 cafés do cardápio
├── hooks/                    # Custom Hooks
│   ├── useCart.ts            # Hook utilitário para consumo do carrinho
│   └── useTheme.ts           # Hook utilitário para consumo do tema
├── layouts/                  # Layout base compartilhado
│   └── DefaultLayout/        # Header persistente + Outlet de rotas
├── pages/                    # Telas principais da aplicação
│   ├── Home/                 # Seção Hero e grid do Catálogo
│   ├── Checkout/             # Formulário de endereço, ViaCEP e resumo
│   └── Success/              # Confirmação do pedido com dados do snapshot
├── reducers/                 # Lógica de negócio imutável
│   └── cart/
│       ├── actions.ts        # Action creators tipados
│       └── reducer.ts        # Função pura redutora de estado
├── routes/                   # Configuração do React Router
│   └── Router.tsx
├── services/                 # Clientes de APIs externas
│   └── viaCep.ts             # Busca de CEP com tratamento de exceções
├── styles/                   # Design tokens e folhas de estilo globais
│   ├── global.css            # Variáveis CSS para Light e Dark Mode
├── types/                    # Tipagens TypeScript centralizadas
│   ├── cart.ts
│   ├── coffee.ts
│   └── index.ts
└── utils/                    # Funções utilitárias puras
    └── currency.ts           # Formatação monetária (Centavos -> BRL)
```

---

## 🛠️ 4. Tecnologias Utilizadas

| Tecnologia | Finalidade |
| :--- | :--- |
| **React 18** | Biblioteca para construção de interfaces declarativas |
| **Vite 6** | Ferramenta de empacotamento ultrarrápido com HMR |
| **TypeScript 5.6** | Tipagem estática estrita |
| **React Router DOM 6** | Roteamento client-side sem recarregar a janela |
| **React Hook Form 7** | Gestão performática de estados de formulário |
| **Zod 3** | Validação declarativa de esquemas com inferência de tipos |
| **Lucide React** | Conjunto de ícones vetoriais modernos |
| **Vitest 2.1** | Executor de testes unitários e de integração de alta velocidade |
| **React Testing Library 16** | Testes de componentes centrados no usuário |

---

## 🧪 5. Testes Automatizados

O projeto conta com uma suíte de testes automatizados com **26 testes aprovados** distribuídos em 7 arquivos de teste:

```bash
# Executar todos os testes
npm run test
```

### Cobertura de Testes:
1. **`src/test/cart.reducer.test.ts` (9 testes):**
   - Adição de novos itens ao carrinho.
   - Acúmulo de quantidades para cafés repetidos (**RN-02**).
   - Bloqueio de adições com quantidade zero ou negativa (**RN-01**).
   - Inclusão correta de produtos distintos.
   - Atualização de quantidades com respeito ao limite mínimo.
   - Remoção de itens por identificador.
   - Limpeza total do carrinho (**CLEAR_CART**).
   - Re-hidratação do estado a partir do LocalStorage.
2. **`src/test/currency.test.ts` (3 testes):**
   - Conversão de centavos para moeda BRL formatada (`R$ 9,90`).
   - Formatação com separadores de milhar (`R$ 1.250,50`).
   - Formatação numérica sem o prefixo da moeda.
3. **`src/test/viaCep.test.ts` (4 testes):**
   - Consulta bem-sucedida de CEP com retorno de logradouro, bairro, cidade e UF.
   - Validação de CEP com tamanho diferente de 8 dígitos numéricos.
   - Tratamento de erro para CEP não cadastrado (`erro: true`).
   - Tratamento de erro para falhas de conexão de rede.
4. **`src/test/QuantityInput.test.tsx` (4 testes):**
   - Renderização da quantidade informada.
   - Disparo do evento de incremento no botão `+`.
   - Disparo do evento de decremento no botão `-`.
   - Desativação do botão `-` quando a quantidade atinge o valor mínimo (**RN-01**).
5. **`src/test/CoffeeCard.test.tsx` (2 testes):**
   - Renderização correta de imagem, tags, título, descrição e preço (**RF-01**).
   - Seleção de quantidade e envio do item para o carrinho (**RF-02, RF-03**).
6. **`src/test/Header.test.tsx` (3 testes):**
   - Renderização do logo, cidade e botão do carrinho.
   - Exibição do badge com a contagem total de unidades (**RF-04**).
   - Alternância de tema claro/escuro no clique do botão (**RF-14**).
7. **`src/test/sanity.test.ts` (1 teste):**
   - Sanidade do ambiente de testes.

---

## 🚀 6. Instalação e Execução

### Pré-requisitos
- **Node.js** `>= 20.x` (testado na versão `v24.21.0`)
- **npm** `>= 10.x`

### 1. Clonar o repositório
```bash
git clone <URL_DO_REPOSITORIO>
cd CoffeeDelivery
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Iniciar servidor de desenvolvimento
```bash
npm run dev
```
Acesse a aplicação no seu navegador: `http://localhost:5173`.

### 4. Executar verificação de tipos e testes
```bash
npx tsc -b
npm run test
```

### 5. Compilar para produção
```bash
npm run build
```
Os arquivos estáticos otimizados para deploy serão gerados no diretório `dist/`.

---

## 📑 7. Documentação de Engenharia de Software

O repositório contém as especificações técnicas e de produto completas:
- [PRD_SPEC.md](file:///home/IgorAldivan/Documentos/CoffeeDelivery/PRD_SPEC.md): Requisitos funcionais, personas e regras de negócio.
- [TECH_SPEC.md](file:///home/IgorAldivan/Documentos/CoffeeDelivery/TECH_SPEC.md): Arquitetura detalhada, modelagem de dados e decisões técnicas.
- [TASKS_SPEC.md](file:///home/IgorAldivan/Documentos/CoffeeDelivery/TASKS_SPEC.md): Backlog de tarefas e acompanhamento de checkpoints.
- [AGENTS.md](file:///home/IgorAldivan/Documentos/CoffeeDelivery/AGENTS.md): Diretrizes operacionais e governança do agente de software.

---

## 🎓 8. Créditos Acadêmicos
- **Projeto:** Coffee Delivery
- **Disciplina:** Single Page Application (SPA)
- **Modalidade:** Projeto Final Avaliativo
- **Desenvolvido por:** Igor Aldivan com assistência autônoma de Agente de Engenharia de Software.
