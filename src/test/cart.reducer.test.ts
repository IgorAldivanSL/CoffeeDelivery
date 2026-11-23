import { describe, it, expect } from 'vitest';
import { cartReducer, initialCartState } from '../reducers/cart/reducer';
import {
  addItemAction,
  updateItemQuantityAction,
  removeItemAction,
  clearCartAction,
  hydrateCartAction,
} from '../reducers/cart/actions';
import { Coffee } from '../types';

const mockCoffee1: Coffee = {
  id: 'expresso-tradicional',
  name: 'Expresso Tradicional',
  description: 'Café tradicional',
  tags: ['tradicional'],
  priceInCents: 990,
  image: '/mock.svg',
};

const mockCoffee2: Coffee = {
  id: 'latte',
  name: 'Latte',
  description: 'Café com leite',
  tags: ['tradicional', 'com leite'],
  priceInCents: 1200,
  image: '/mock2.svg',
};

describe('Cart Reducer', () => {
  it('should add a new item to an empty cart', () => {
    const newState = cartReducer(initialCartState, addItemAction(mockCoffee1, 2));

    expect(newState.items).toHaveLength(1);
    expect(newState.items[0]).toEqual({
      coffee: mockCoffee1,
      quantity: 2,
    });
  });

  it('should accumulate quantity when adding an already existing item (RN-02)', () => {
    const stateWithOne = cartReducer(initialCartState, addItemAction(mockCoffee1, 2));
    const finalState = cartReducer(stateWithOne, addItemAction(mockCoffee1, 3));

    expect(finalState.items).toHaveLength(1);
    expect(finalState.items[0].quantity).toBe(5);
  });

  it('should not add item with quantity <= 0 (RN-01)', () => {
    const newState = cartReducer(initialCartState, addItemAction(mockCoffee1, 0));
    expect(newState.items).toHaveLength(0);

    const negativeState = cartReducer(initialCartState, addItemAction(mockCoffee1, -2));
    expect(negativeState.items).toHaveLength(0);
  });

  it('should add different items as distinct entries', () => {
    const state1 = cartReducer(initialCartState, addItemAction(mockCoffee1, 1));
    const state2 = cartReducer(state1, addItemAction(mockCoffee2, 2));

    expect(state2.items).toHaveLength(2);
    expect(state2.items[0].coffee.id).toBe('expresso-tradicional');
    expect(state2.items[1].coffee.id).toBe('latte');
  });

  it('should update item quantity correctly', () => {
    const state = cartReducer(initialCartState, addItemAction(mockCoffee1, 2));
    const updatedState = cartReducer(state, updateItemQuantityAction('expresso-tradicional', 4));

    expect(updatedState.items[0].quantity).toBe(4);
  });

  it('should ignore quantity update to less than 1 (RN-01)', () => {
    const state = cartReducer(initialCartState, addItemAction(mockCoffee1, 2));
    const updatedState = cartReducer(state, updateItemQuantityAction('expresso-tradicional', 0));

    expect(updatedState.items[0].quantity).toBe(2);
  });

  it('should remove an item by coffeeId', () => {
    const state1 = cartReducer(initialCartState, addItemAction(mockCoffee1, 1));
    const state2 = cartReducer(state1, addItemAction(mockCoffee2, 2));

    const stateAfterRemoval = cartReducer(state2, removeItemAction('expresso-tradicional'));

    expect(stateAfterRemoval.items).toHaveLength(1);
    expect(stateAfterRemoval.items[0].coffee.id).toBe('latte');
  });

  it('should clear all items in the cart', () => {
    const state1 = cartReducer(initialCartState, addItemAction(mockCoffee1, 1));
    const state2 = cartReducer(state1, addItemAction(mockCoffee2, 2));

    const emptyState = cartReducer(state2, clearCartAction());

    expect(emptyState.items).toHaveLength(0);
  });

  it('should hydrate cart from stored items', () => {
    const storedItems = [
      { coffee: mockCoffee1, quantity: 3 },
      { coffee: mockCoffee2, quantity: 1 },
    ];

    const hydratedState = cartReducer(initialCartState, hydrateCartAction(storedItems));

    expect(hydratedState.items).toHaveLength(2);
    expect(hydratedState.items[0].quantity).toBe(3);
  });
});
