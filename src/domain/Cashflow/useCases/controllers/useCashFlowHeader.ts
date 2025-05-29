import {useCallback, useState} from 'react';

import {cashFlowService, useCashFlowDate} from '@domain';
import {QueryKeys} from '@infra';
import {useFocusEffect} from '@react-navigation/native';
import {useDay} from '@services';
import {useQuery} from '@tanstack/react-query';

export function useCashFlowCardHeader() {
  const {day} = useDay();

  const selectedDate = day ? new Date(day.dateString) : undefined;

  console.log('dia no slider ===>', day);

  const {data} = useQuery({
    queryKey: [QueryKeys.CashFlowCardHeader, selectedDate],
    queryFn: async () => {
      const expense = await cashFlowService.getTotalExpenses(selectedDate);
      const income = await cashFlowService.getTotalIncome(selectedDate);
      return {
        expense,
        income,
        balance: income - expense,
      };
    },
  });

  return {
    expense: data?.expense ?? 0,
    income: data?.income ?? 0,
    balance: data?.balance ?? 0,
  };
}
