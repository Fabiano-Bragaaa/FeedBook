import {useCallback, useState} from 'react';

import {QueryKeys} from '@infra';
import {useFocusEffect} from '@react-navigation/native';
import {useInfiniteQuery} from '@tanstack/react-query';

import {cashFlowService} from '../../cashFlowService';
import {CashFlow} from '../../cashFlowTypes';

export type useCashFlowListResult = {
  cashList: CashFlow[];
  isError: boolean | null;
  isLoading: boolean;
  refetch: () => void;
  fetchNextPage: () => void;
};

export function useGetList(date: Date): useCashFlowListResult {
  const [cashList, setCashList] = useState<CashFlow[]>([]);

  console.log('data ====', date);

  const {isLoading, isError, refetch, fetchNextPage, data} = useInfiniteQuery({
    queryKey: [QueryKeys.MovimentationList],
    queryFn: ({pageParam}) => cashFlowService.getList(pageParam, date),
    getNextPageParam: ({hasNextPage, lastVisible}) => {
      hasNextPage ? lastVisible : null;
    },
  });

  useFocusEffect(
    useCallback(() => {
      if (data) {
        const newList = data.pages.reduce<CashFlow[]>((prev, curr) => {
          return [...prev, ...curr.data];
        }, []);
        setCashList(newList);
      }
    }, [data]),
  );

  return {
    cashList,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
  };
}
