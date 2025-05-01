import {useCallback, useState} from 'react';

import {cashFlowService} from '@domain';
import {useFocusEffect} from '@react-navigation/native';

export function useCashFlowCardHeader() {
  const [expense, setExpense] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);

  async function fetchData() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const expenseValue = await cashFlowService.getTotalExpenses();
    const incomeValue = await cashFlowService.getTotalIncome();

    setExpense(expenseValue);
    setIncome(incomeValue);
    setBalance(incomeValue - expenseValue);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  return {
    expense,
    income,
    balance,
  };
}
