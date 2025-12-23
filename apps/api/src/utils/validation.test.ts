import { describe, it, expect } from 'vitest';
import { isValidEmail, sanitizeInput, formatCurrency } from './validation';

describe('Validation Utils', () => {
  describe('isValidEmail', () => {
    it('should return true for valid emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@sub.domain.co.id')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('should trim whitespace', () => {
      expect(sanitizeInput('  hello  ')).toBe('hello');
    });

    it('should remove potential script tags', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
    });
  });
  
  describe('formatCurrency', () => {
      it('should format USD correctly', () => {
          expect(formatCurrency(1000)).toBe('$1,000.00');
      });
      
      it('should format EUR correctly', () => {
        // Note: Intl often uses non-breaking space (0xa0) or standard space depending on locale.
        // We broadly check it contains the symbol and value.
         const result = formatCurrency(1000, 'EUR');
         expect(result).toContain('€');
         expect(result).toContain('1,000.00');
      });
  });
});
