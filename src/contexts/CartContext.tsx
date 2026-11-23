import React, { createContext, useEffect, useReducer } from 'react';
import { Coffee, CartItem, OrderSnapshot } from '../types';
import { cartReducer, initialCartState } from '../reducers/cart/reducer';
import {
  addItemAction,
  clearCartAction,
  removeItemAction,
  updateItemQuantityAction,
} from '../reducers/cart/actions';

interface CartContextType {
  items: CartItem[];
  itemsTotalCount: number;
  itemsSubtotalInCents: number;
  deliveryFeeInCents: number;
  totalInCents: number;
  addToCart: (coffee: Coffee, quantity: number) => void;
  updateItemQuantity: (coffeeId: string, quantity: number) => void;
  removeItem: (coffeeId: string) => void;
  clearCart: () => void;
  lastOrder: OrderSnapshot | null;
  setLastOrder: (order: OrderSnapshot) => void;
}

export const CartContext = createContext<CartContextType>({} as CartContextType);

const CART_STORAGE_KEY = '@coffee-delivery:cart-state-1.0.0';
const LAST_ORDER_STORAGE_KEY = '@coffee-delivery:last-order-1.0.0';
const DELIVERY_FEE_IN_CENTS = 350; // R$ 3,50 fixo (RN-03)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState, () => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed.items)) {
          return { items: parsed.items };
        }
      }
    } catch {
      // Fallback para estado inicial em caso de erro no storage
    }
    return initialCartState;
  });

  const [lastOrder, setLastOrderState] = React.useState<OrderSnapshot | null>(() => {
    try {
      const stored = localStorage.getItem(LAST_ORDER_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    return null;
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
    } catch (e) {
      console.error('Falha ao salvar carrinho no localStorage', e);
    }
  }, [cartState]);

  function addToCart(coffee: Coffee, quantity: number) {
    dispatch(addItemAction(coffee, quantity));
  }

  function updateItemQuantity(coffeeId: string, quantity: number) {
    dispatch(updateItemQuantityAction(coffeeId, quantity));
  }

  function removeItem(coffeeId: string) {
    dispatch(removeItemAction(coffeeId));
  }

  function clearCart() {
    dispatch(clearCartAction());
  }

  function setLastOrder(order: OrderSnapshot) {
    setLastOrderState(order);
    try {
      localStorage.setItem(LAST_ORDER_STORAGE_KEY, JSON.stringify(order));
    } catch (e) {
      console.error('Falha ao salvar último pedido no localStorage', e);
    }
  }

  // Cálculos financeiros e de quantidades em centavos (RN-03, RN-04, RF-04)
  const itemsTotalCount = cartState.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const itemsSubtotalInCents = cartState.items.reduce(
    (subtotal, item) => subtotal + item.coffee.priceInCents * item.quantity,
    0
  );

  const deliveryFeeInCents = cartState.items.length > 0 ? DELIVERY_FEE_IN_CENTS : 0;
  const totalInCents = itemsSubtotalInCents + deliveryFeeInCents;

  return (
    <CartContext.Provider
      value={{
        items: cartState.items,
        itemsTotalCount,
        itemsSubtotalInCents,
        deliveryFeeInCents,
        totalInCents,
        addToCart,
        updateItemQuantity,
        removeItem,
        clearCart,
        lastOrder,
        setLastOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
