export type CashFlow = {
  id: string;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: Date;
};
