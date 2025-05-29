import {useCallback, useState} from 'react';

import {cashFlowService, useCashFlowDate} from '@domain';
import {useFocusEffect} from '@react-navigation/native';
import {useDay} from '@services';

export function useCashFlowCardHeader() {
  const {day} = useDay();

  console.log('dia no slider ===>', day);

  const [expense, setExpense] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        const selectedDate = day ? new Date(day.dateString) : undefined;
        const expenseValue = await cashFlowService.getTotalExpenses(
          selectedDate,
        );
        const incomeValue = await cashFlowService.getTotalIncome(selectedDate);

        setExpense(expenseValue);
        setIncome(incomeValue);
        setBalance(incomeValue - expenseValue);
      }
      fetchData();
    }, [day]),
  );

  return {
    expense,
    income,
    balance,
  };
}
