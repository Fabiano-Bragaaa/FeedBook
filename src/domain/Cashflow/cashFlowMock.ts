import {CashFlow} from './cashFlowTypes';

export const cashFlowListMock: CashFlow[] = [
  {
    id: '1',
    amount: 2131,
    type: 'expense',
    description: 'Aluguel',
    date: new Date('2025-04-01'),
  },
  {
    id: '2',
    amount: 100,
    type: 'expense',
    description: 'Café',
    date: new Date('2025-04-02'),
  },
  {
    id: '3',
    amount: 1231,
    type: 'income',
    description: 'Freelance',
    date: new Date('2025-04-03'),
  },
  {
    id: '4',
    amount: 7823,
    type: 'expense',
    description: 'Cartão de crédito',
    date: new Date('2025-04-04'),
  },
  {
    id: '5',
    amount: 12412,
    type: 'income',
    description: 'Salário',
    date: new Date('2025-04-05'),
  },
  {
    id: '6',
    amount: 12341,
    type: 'income',
    description: 'Investimentos',
    date: new Date('2025-04-06'),
  },
  {
    id: '7',
    amount: 1542,
    type: 'income',
    description: 'Venda de produto',
    date: new Date('2025-04-07'),
  },
  {
    id: '8',
    amount: 1235,
    type: 'income',
    description: 'Reembolso',
    date: new Date('2025-04-08'),
  },
  {
    id: '9',
    amount: 5342,
    type: 'expense',
    description: 'Supermercado',
    date: new Date('2025-04-09'),
  },
];
