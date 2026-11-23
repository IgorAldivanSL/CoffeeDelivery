import { describe, it, expect } from 'vitest';
import { formatCurrency, formatPriceWithoutCurrency } from '../utils/currency';

describe('Currency Utility (RN-04)', () => {
  it('should format cents into localized BRL currency string', () => {
    const formatted = formatCurrency(990);
    // BRL formatting includes R$, non-breaking space, and 9,90
    expect(formatted).toContain('9,90');
    expect(formatted).toContain('R$');
  });

  it('should format cents with large numbers and thousands separator', () => {
    const formatted = formatCurrency(125050); // R$ 1.250,50
    expect(formatted).toContain('1.250,50');
  });

  it('should format price number without R$ prefix', () => {
    const priceString = formatPriceWithoutCurrency(990);
    expect(priceString).toBe('9,90');

    const priceStringZero = formatPriceWithoutCurrency(0);
    expect(priceStringZero).toBe('0,00');
  });
});
