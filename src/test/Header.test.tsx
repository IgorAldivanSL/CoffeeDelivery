import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { Header } from '../components/Header';
import { CartContext } from '../contexts/CartContext';
import { ThemeContext } from '../contexts/ThemeContext';

describe('Header Component', () => {
  it('should render location and cart button', () => {
    render(
      <BrowserRouter>
        <ThemeContext.Provider value={{ theme: 'light', toggleTheme: vi.fn() }}>
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
            <Header />
          </CartContext.Provider>
        </ThemeContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText('Porto Alegre, RS')).toBeInTheDocument();
    expect(screen.queryByTestId('cart-badge')).not.toBeInTheDocument();
  });

  it('should display cart badge with total items count when items exist (RF-04)', () => {
    render(
      <BrowserRouter>
        <ThemeContext.Provider value={{ theme: 'light', toggleTheme: vi.fn() }}>
          <CartContext.Provider
            value={{
              items: [],
              itemsTotalCount: 5,
              itemsSubtotalInCents: 4950,
              deliveryFeeInCents: 350,
              totalInCents: 5300,
              addToCart: vi.fn(),
              updateItemQuantity: vi.fn(),
              removeItem: vi.fn(),
              clearCart: vi.fn(),
              lastOrder: null,
              setLastOrder: vi.fn(),
            }}
          >
            <Header />
          </CartContext.Provider>
        </ThemeContext.Provider>
      </BrowserRouter>
    );

    const badge = screen.getByTestId('cart-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('5');
  });

  it('should call toggleTheme when theme button is clicked', async () => {
    const user = userEvent.setup();
    const toggleThemeMock = vi.fn();

    render(
      <BrowserRouter>
        <ThemeContext.Provider value={{ theme: 'light', toggleTheme: toggleThemeMock }}>
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
            <Header />
          </CartContext.Provider>
        </ThemeContext.Provider>
      </BrowserRouter>
    );

    const themeBtn = screen.getByRole('button', { name: /ativar modo escuro/i });
    await user.click(themeBtn);

    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
