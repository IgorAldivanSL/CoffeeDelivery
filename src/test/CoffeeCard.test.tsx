import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CoffeeCard } from '../components/CoffeeCard';
import { CartContext } from '../contexts/CartContext';
import { Coffee } from '../types';

const mockCoffee: Coffee = {
  id: 'expresso-tradicional',
  name: 'Expresso Tradicional',
  description: 'O tradicional café feito com água quente e grãos moídos',
  tags: ['tradicional'],
  priceInCents: 990,
  image: '/test-img.svg',
};

describe('CoffeeCard Component', () => {
  it('should render coffee details correctly (RF-01)', () => {
    render(
      <CartContext.Provider
        value={{
          items: [],
          itemsTotalCount: 0,
          itemsSubtotalInCents: 0,
          deliveryFeeInCents: 0,
          totalInCents: 0,
          addToCart: vi.fn(),
          updateItemQuantity: vi.fn(),
          removeItem: vi.fn(),
          clearCart: vi.fn(),
          lastOrder: null,
          setLastOrder: vi.fn(),
        }}
      >
        <CoffeeCard coffee={mockCoffee} />
      </CartContext.Provider>
    );

    expect(screen.getByText('Expresso Tradicional')).toBeInTheDocument();
    expect(
      screen.getByText('O tradicional café feito com água quente e grãos moídos')
    ).toBeInTheDocument();
    expect(screen.getByText('tradicional')).toBeInTheDocument();
    expect(screen.getByText('9,90')).toBeInTheDocument();
  });

  it('should increment quantity and add to cart with selected quantity', async () => {
    const user = userEvent.setup();
    const addToCartMock = vi.fn();

    render(
      <CartContext.Provider
        value={{
          items: [],
          itemsTotalCount: 0,
          itemsSubtotalInCents: 0,
          deliveryFeeInCents: 0,
          totalInCents: 0,
          addToCart: addToCartMock,
          updateItemQuantity: vi.fn(),
          removeItem: vi.fn(),
          clearCart: vi.fn(),
          lastOrder: null,
          setLastOrder: vi.fn(),
        }}
      >
        <CoffeeCard coffee={mockCoffee} />
      </CartContext.Provider>
    );

    const plusBtn = screen.getByRole('button', { name: /aumentar quantidade/i });
    await user.click(plusBtn);
    expect(screen.getByTestId('quantity-value')).toHaveTextContent('2');

    const addBtn = screen.getByRole('button', { name: /adicionar expresso tradicional ao carrinho/i });
    await user.click(addBtn);

    expect(addToCartMock).toHaveBeenCalledWith(mockCoffee, 2);
    // Quantity resets to 1 after adding
    expect(screen.getByTestId('quantity-value')).toHaveTextContent('1');
  });
});
