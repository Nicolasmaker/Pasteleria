import { formatCurrency } from '../../utils/formatters';

test('formats currency correctly', () => {
  const result = formatCurrency(1000);
  // Check for Chilean Peso format (e.g. $1.000)
  // The exact space/dot might vary by node version/locale, so we check loosely or exact if known
  expect(result).toMatch(/\$1.000/);
});