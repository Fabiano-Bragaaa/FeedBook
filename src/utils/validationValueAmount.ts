export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function parseCurrencyInput(input: string): number {
  const numericOnly = input.replace(/\D/g, ''); // só dígitos
  const cents = parseInt(numericOnly || '0', 10);
  return cents / 100;
}
