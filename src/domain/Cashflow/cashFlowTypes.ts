export type CashFlow = {
  userId: string
  id: string;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: Date;
};
