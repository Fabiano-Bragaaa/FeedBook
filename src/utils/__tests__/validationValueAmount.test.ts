import { formatCurrency, parseCurrencyInput } from '../validationValueAmount';

describe('validationValueAmount', () => {
  describe('formatCurrency', () => {
    it('should format numbers as BRL currency correctly', () => {
      expect(formatCurrency(1234.56)).toBe('R$ 1.234,56');
      expect(formatCurrency(0)).toBe('R$ 0,00');
      expect(formatCurrency(-89.9)).toBe('-R$ 89,90');
    });
  });

  describe('parseCurrencyInput', () => {
    it('should convert formatted currency strings to numbers', () => {
      expect(parseCurrencyInput('R$ 1.234,56')).toBe(1234.56);
      expect(parseCurrencyInput('R$ 0,99')).toBe(0.99);
      expect(parseCurrencyInput('1.000,00')).toBe(1000.00);
    });

    it('should handle non-numeric strings gracefully', () => {
      expect(parseCurrencyInput('')).toBe(0);
      expect(parseCurrencyInput('abc')).toBe(0);
      expect(parseCurrencyInput('R$ ,--')).toBe(0);
    });
  });
});
