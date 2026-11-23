# TECH_SPEC.md — Coffee Delivery

## 1. Visão Geral da Arquitetura

O **Coffee Delivery** adota uma arquitetura Front-end orientada a componentes funcionais com **React**, empacotamento ultrarrápido com **Vite** e tipagem estrita com **TypeScript**. A separação de responsabilidades segue o princípio de separação entre apresentação, controle de fluxo e regras de domínio:

```
[ Camada de Apresentação ]
   Páginas (Home, Checkout, Success)
   └── Componentes de UI (Header, CoffeeCard, QuantityInput, CartItemCard, RadioGroup, ThemeToggle)
         │
         ▼
[ Camada de Controle e Estado ]
   Context API (CartContext, ThemeContext)
   └── useReducer (cartReducer, cartActions)
         │
         ▼
[ Camada de Serviços e Dados ]
   ViaCEP Service (fetchAddressByCep)
   Local Storage Adapters (@coffee-delivery:cart-state, @coffee-delivery:last-order, @coffee-delivery:theme)
   Static Data (coffees.ts)
```

---

## 2. Stack Tecnológica e Bibliotecas

| Tecnologia / Biblioteca | Versão / Padrão | Finalidade | Justificativa |
| :--- | :--- | :--- | :--- |
| **Node.js** | `>= 20` (v24.21.0 detectado) | Ambiente de execução | Suporte nativo a ESModules modernos e estabilidade. |
| **React** | `^18.3.1` ou `^19.0.0` | Biblioteca de UI | Padrão da disciplina para construção de SPAs declarativas e componentizadas. |
| **TypeScript** | `^5.6.x` | Superset tipado | Segurança em tempo de compilação, prevenção de bugs e intellisense rigoroso. |
| **Vite** | `^6.x` | Build tool & Dev Server | HMR instantâneo e bundling otimizado com Rollup. |
| **React Router DOM** | `^6.28.x` | Roteamento cliente (SPA) | Navegação fluida entre rotas `/`, `/checkout` e `/success` sem recarregar a página. |
| **React Hook Form** | `^7.54.x` | Gerenciamento de formulários | Performance superior sem re-renderizações desnecessárias e integração nativa com Zod. |
| **Zod** | `^3.24.x` | Validação de schemas | Validação declarativa tipada e inferência de tipos TypeScript para formulários. |
| **@hookform/resolvers** | `^3.9.x` | Resolver de validação | Ponte oficial e segura entre React Hook Form e Zod. |
| **Lucide React** ou **Phosphor Icons** | `latest` | Ícones SVG | Ícones consistentes com o Figma (carrinho, localização, relógio, dinheiro, cartão, etc.). |
| **Vitest** | `^2.x` | Framework de testes | Compatibilidade nativa com configuração Vite e alta velocidade de execução. |
| **@testing-library/react** | `^16.x` | Testes de integração de UI | Validação de comportamento sob a perspectiva do usuário e acessibilidade. |
| **@testing-library/jest-dom** | `^6.x` | Matchers customizados para DOM | Asserções semânticas para estados visuais e atributos HTML. |

---

## 3. Estrutura de Diretórios Proposta

```
src/
├── @types/                   # Definições globais de tipos e declarações de assets
│   └── styles.d.ts
├── assets/                   # Assets estáticos (SVGs de cafés, logo original, hero image, favicon)
│   ├── coffees/
│   │   ├── americano.svg
│   │   ├── expresso.svg
│   │   └── ...
│   ├── brand/
│   │   ├── logo.svg
│   │   └── favicon.svg
│   └── illustrations/
│       ├── hero-coffee.svg
│       └── delivery-success.svg
├── components/               # Componentes reutilizáveis de interface
│   ├── Header/
│   ├── QuantityInput/
│   ├── CoffeeCard/
│   ├── CartItem/
│   ├── ThemeToggle/
│   └── Button/
├── contexts/                 # Contextos de estado global
│   ├── CartContext.tsx       # Provedor do carrinho e ações
│   └── ThemeContext.tsx      # Provedor de tema Light/Dark
├── data/                     # Dados estáticos tipados
│   └── coffees.ts            # Lista dos 14 cafés com categorias, preços e imagens
├── hooks/                    # Custom Hooks
│   ├── useCart.ts            # Hook facilitador para consumo do CartContext
│   ├── useTheme.ts           # Hook facilitador para consumo do ThemeContext
│   └── useDebounce.ts        # Hook para debounce de busca se aplicável
├── layouts/                  # Layouts base da aplicação
│   └── DefaultLayout/        # Header compartilhado e <Outlet />
├── pages/                    # Componentes de página (rotas)
│   ├── Home/
│   ├── Checkout/
│   └── Success/
├── reducers/                 # Reducers de estado complexo
│   └── cart/
│       ├── actions.ts        # Action creators tipados
│       └── reducer.ts        # Função pura redutora e lógica imutável
├── routes/                   # Configuração de rotas da aplicação
│   └── Router.tsx
├── services/                 # Integrações com APIs externas
│   └── viaCep.ts             # Cliente de busca de CEP com tratamento de erros
├── styles/                   # Design tokens, temas e estilos globais
│   ├── global.css (ou .ts)   # Reset CSS e variáveis CSS / Design Tokens
│   ├── theme.ts              # Tokens de cores para Light e Dark Mode
│   └── fonts.css
├── utils/                    # Funções utilitárias puras
│   ├── currency.ts           # Formatação de centavos para BRL (Intl.NumberFormat)
│   ├── masks.ts              # Máscaras de input (CEP)
│   └── storage.ts            # Wrappers seguros para localStorage com fallback
├── App.tsx                   # Composição de Providers e Router
└── main.tsx                  # Ponto de entrada da aplicação
```

---

## 4. Modelagem de Dados e Tipagem TypeScript

```typescript
// src/types/coffee.ts
export type CoffeeCategory = 'tradicional' | 'especial' | 'com leite' | 'alcoólico' | 'gelado';

export interface Coffee {
  id: string;
  name: string;
  description: string;
  tags: CoffeeCategory[];
  priceInCents: number; // Ex: 990 para R$ 9,90
  image: string;
}

// src/types/cart.ts
export interface CartItem {
  coffee: Coffee;
  quantity: number;
}

export type PaymentMethod = 'credit' | 'debit' | 'cash';

export interface DeliveryAddress {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  uf: string;
}

export interface OrderSnapshot {
  id: string;
  items: CartItem[];
  itemsSubtotalInCents: number;
  deliveryFeeInCents: number;
  totalInCents: number;
  address: DeliveryAddress;
  paymentMethod: PaymentMethod;
  createdAt: string;
}
```

---

## 5. Gerenciamento de Estado — CartContext e useReducer

O estado do carrinho é gerenciado exclusivamente via **useReducer**, garantindo imutabilidade estrita e previsibilidade:

### 5.1 Ações do Reducer (`CartActions`)
- `ADD_ITEM`: Adiciona um item ou incrementa a quantidade se já existir.
- `UPDATE_ITEM_QUANTITY`: Altera a quantidade de um item específico (garantindo quantidade >= 1).
- `REMOVE_ITEM`: Remove o item do carrinho pelo `id`.
- `CLEAR_CART`: Esvazia os itens do carrinho (utilizado após conclusão do pedido).
- `HYDRATE_CART`: Carrega o estado inicial a partir do `localStorage`.

### 5.2 Estratégia de Cálculo em Centavos
Todos os preços unitários são armazenados como inteiros representativos de centavos (`priceInCents: 990`).
- Subtotal: $\sum (\text{item.coffee.priceInCents} \times \text{item.quantity})$
- Taxa de entrega fixa: `350` (R$ 3,50)
- Total: $\text{subtotalInCents} + 350$
- Exibição: utilitário `formatCurrency(cents)` utiliza `new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`.

---

## 6. Integração com API de CEP (ViaCEP)

A consulta ao serviço público ViaCEP é encapsulada em `src/services/viaCep.ts`:
- **Endpoint:** `https://viacep.com.br/ws/${cleanCep}/json/`
- **Validação prévia:** Verifica se o CEP possui exatamente 8 dígitos numéricos.
- **Tratamento de respostas:**
  - Sucesso: preenche `street`, `neighborhood`, `city` e `uf`.
  - CEP não encontrado (`data.erro === true`): dispara erro amigável "CEP não encontrado. Por favor, verifique ou preencha manualmente.".
  - Timeout ou Falha de Rede: dispara erro "Serviço de CEP indisponível. Preencha o endereço manualmente." sem bloquear a edição dos campos.
- **Acessibilidade:** Exibe spinner/indicador de carregamento enquanto a consulta está em andamento.

---

## 7. Validação de Formulários com React Hook Form e Zod

Schema de validação definido para a tela de checkout:

```typescript
export const checkoutFormSchema = z.object({
  cep: z.string().min(8, 'Informe um CEP válido').max(9, 'CEP inválido'),
  street: z.string().min(3, 'Informe a rua'),
  number: z.string().min(1, 'Informe o número'),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, 'Informe o bairro'),
  city: z.string().min(2, 'Informe a cidade'),
  uf: z.string().length(2, 'UF deve ter 2 caracteres').toUpperCase(),
  paymentMethod: z.enum(['credit', 'debit', 'cash'], {
    errorMap: () => ({ message: 'Selecione a forma de pagamento' }),
  }),
});
```

---

## 8. Estratégia de Estilização e Temas (Light e Dark Mode)

- **Design Tokens:** Definidos via variáveis CSS globais no `:root` e sobrescritos na classe ou atributo `[data-theme='dark']`.
- **Paleta de Cores:**
  - Amarelo Marca: `#DBAC2C` (Yellow), `#C47F17` (Yellow Dark), `#F1E9C9` (Yellow Light).
  - Roxo Marca: `#8047F8` (Purple), `#4B2995` (Purple Dark), `#EBE5F9` (Purple Light).
  - Tons Neutros Light: Background `#FAFAFA`, Card `#F3F2F2`, Input `#EDEDED`, Text `#574F4D`, Title `#272221`.
  - Tons Neutros Dark: Background `#121214`, Card `#202024`, Input `#29292E`, Text `#E1E1E6`, Title `#FFFFFF`.
- **Tipografia:** `Baloo 2` para títulos (pesos 700 e 800) e `Roboto` para textos de apoio (pesos 400 e 700).

---

## 9. Estratégia de Testes Automatizados (Vitest + RTL)

- **Testes Unitários:**
  - Reducer do carrinho: adição, acúmulo de duplicados, incremento, decremento, remoção e limpeza.
  - Funções de cálculo monetário e formatação de moeda em BRL.
- **Testes de Integração de Componentes:**
  - `QuantityInput`: incremento, decremento e bloqueio em valores menores que 1.
  - `CoffeeCard`: renderização de dados, ajuste de quantidade e disparo de adição ao carrinho.
  - `Header`: badge de contagem de unidades totais.
- **Testes de Fluxo:**
  - `Checkout`: bloqueio de envio com campos obrigatórios vazios ou carrinho zerado; autopreenchimento com mock da API de CEP; seleção de método de pagamento.
  - `Success`: exibição correta dos dados a partir do snapshot e permanência após limpeza do carrinho.

