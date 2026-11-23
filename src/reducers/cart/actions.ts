import { Coffee, CartItem } from '../../types';

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { coffee: Coffee; quantity: number } }
  | { type: 'UPDATE_ITEM_QUANTITY'; payload: { coffeeId: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { coffeeId: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE_CART'; payload: { items: CartItem[] } };

export function addItemAction(coffee: Coffee, quantity: number): CartAction {
  return {
    type: 'ADD_ITEM',
    payload: { coffee, quantity },
  };
}

export function updateItemQuantityAction(coffeeId: string, quantity: number): CartAction {
  return {
    type: 'UPDATE_ITEM_QUANTITY',
    payload: { coffeeId, quantity },
  };
}

export function removeItemAction(coffeeId: string): CartAction {
  return {
    type: 'REMOVE_ITEM',
    payload: { coffeeId },
  };
}

export function clearCartAction(): CartAction {
  return {
    type: 'CLEAR_CART',
  };
}

export function hydrateCartAction(items: CartItem[]): CartAction {
  return {
    type: 'HYDRATE_CART',
    payload: { items },
  };
}
