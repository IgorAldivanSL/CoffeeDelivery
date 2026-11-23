# ☕ Coffee Delivery — Projeto Final SPA

Aplicação web Single Page Application (SPA) de e-commerce fictício para uma cafeteria moderna e acolhedora, desenvolvida como projeto final avaliativo da disciplina **Single Page Application (SPA)**.

O projeto permite que clientes naveguem por um catálogo de cafés especiais, personalizem quantidades, gerenciem um carrinho de compras com persistência local, informem endereço com preenchimento automatizado via CEP (ViaCEP), escolham a forma de pagamento e concluam o pedido com visualização detalhada da confirmação.

---

## 🚀 Tecnologias e Bibliotecas Principais

- **React 18 / 19** com **Vite** e **TypeScript**
- **React Router DOM** (Navegação SPA sem recarregamento)
- **Context API** e **useReducer** (Gerenciamento global de estado previsível e imutável)
- **React Hook Form** e **Zod** (Formulários performáticos e validação declarativa de schemas)
- **API Pública ViaCEP** (Consulta e autopreenchimento de endereço de entrega)
- **LocalStorage API** (Persistência do carrinho e temas)
- **Vitest** e **React Testing Library** (Testes unitários e de integração de componentes)
- **CSS Modules / Design Tokens** com suporte completo a **Light Mode** e **Dark Mode**

---

## 📋 Documentação Técnica e de Produto (SPECs)

- [PRD_SPEC.md](file:///home/IgorAldivan/Documentos/CoffeeDelivery/PRD_SPEC.md) — Requisitos funcionais (RF-01 a RF-16), regras de negócio (RN-01 a RN-08) e critérios de aceite.
- [TECH_SPEC.md](file:///home/IgorAldivan/Documentos/CoffeeDelivery/TECH_SPEC.md) — Arquitetura de software, modelagem de dados, convenções de código e estratégias de teste.
- [TASKS_SPEC.md](file:///home/IgorAldivan/Documentos/CoffeeDelivery/TASKS_SPEC.md) — Cronograma de checkpoints, mapeamento de tarefas e status de execução.
- [AGENTS.md](file:///home/IgorAldivan/Documentos/CoffeeDelivery/AGENTS.md) — Diretrizes permanentes do agente de engenharia de software e limites operacionais.

---

## 🛠️ Instruções de Instalação e Execução

### Pré-requisitos
- **Node.js** `>= 20.x` (v24.x recomendado)
- **npm** `>= 10.x`

### Instalação
```bash
npm install
```

### Executar em Desenvolvimento
```bash
npm run dev
```
Acesse a aplicação no endereço indicado pelo Vite (normalmente `http://localhost:5173`).

### Executar Testes
```bash
npm run test
```

### Build de Produção
```bash
npm run build
```
O diretório `dist/` gerado conterá a aplicação estática pronta para deploy.

---

## 🎨 Identidade Visual e Temas
- **Logo Original:** Criada com apoio de IA, representando a agilidade da entrega e a sofisticação do café artesanal.
- **Tipografia:** `Baloo 2` para títulos expressivos e `Roboto` para textos de leitura fluida.
- **Paleta de Cores:** Combinação harmoniosa de tons de amarelo e roxo, adaptada para modo claro e escuro com alto contraste (WCAG AA).

---

## 📐 Status do Projeto
- **Fase Atual:** Checkpoint 0 — Diagnóstico Concluído.
- **Próxima Etapa:** Checkpoint 1 — Setup e Arquitetura.

