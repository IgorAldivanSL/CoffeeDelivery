import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { QuantityInput } from '../components/QuantityInput';

describe('QuantityInput Component', () => {
  it('should render the provided quantity', () => {
    render(
      <QuantityInput
        quantity={3}
        onIncrease={vi.fn()}
        onDecrease={vi.fn()}
      />
    );

    expect(screen.getByTestId('quantity-value')).toHaveTextContent('3');
  });

  it('should call onIncrease when clicking the plus button', async () => {
    const user = userEvent.setup();
    const handleIncrease = vi.fn();

    render(
      <QuantityInput
        quantity={1}
        onIncrease={handleIncrease}
        onDecrease={vi.fn()}
      />
    );

    const plusButton = screen.getByRole('button', { name: /aumentar quantidade/i });
    await user.click(plusButton);

    expect(handleIncrease).toHaveBeenCalledTimes(1);
  });

  it('should call onDecrease when clicking the minus button if quantity > min', async () => {
    const user = userEvent.setup();
    const handleDecrease = vi.fn();

    render(
      <QuantityInput
        quantity={2}
        onIncrease={vi.fn()}
        onDecrease={handleDecrease}
      />
    );

    const minusButton = screen.getByRole('button', { name: /diminuir quantidade/i });
    await user.click(minusButton);

    expect(handleDecrease).toHaveBeenCalledTimes(1);
  });

  it('should disable the minus button when quantity is equal to or less than min (RN-01)', () => {
    render(
      <QuantityInput
        quantity={1}
        min={1}
        onIncrease={vi.fn()}
        onDecrease={vi.fn()}
      />
    );

    const minusButton = screen.getByRole('button', { name: /diminuir quantidade/i });
    expect(minusButton).toBeDisabled();
  });
});
