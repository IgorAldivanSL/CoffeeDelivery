import { CartItem } from '../../types';
import { CartAction } from './actions';

export interface CartState {
  items: CartItem[];
}

export const initialCartState: CartState = {
  items: [],
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { coffee, quantity } = action.payload;
      if (quantity <= 0) return state;

      const itemIndex = state.items.findIndex(
        (item) => item.coffee.id === coffee.id
      );

      if (itemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          quantity: updatedItems[itemIndex].quantity + quantity,
        };
        return { ...state, items: updatedItems };
      }

      return {
        ...state,
        items: [...state.items, { coffee, quantity }],
      };
    }

    case 'UPDATE_ITEM_QUANTITY': {
      const { coffeeId, quantity } = action.payload;
      if (quantity < 1) return state;

      const itemIndex = state.items.findIndex(
        (item) => item.coffee.id === coffeeId
      );

      if (itemIndex < 0) return state;

      const updatedItems = [...state.items];
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        quantity,
      };

      return { ...state, items: updatedItems };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.coffee.id !== action.payload.coffeeId),
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
      };
    }

    case 'HYDRATE_CART': {
      return {
        ...state,
        items: action.payload.items,
      };
    }

    default:
      return state;
  }
}
