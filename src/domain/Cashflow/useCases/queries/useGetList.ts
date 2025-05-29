import {useEffect, useState} from 'react';

import {QueryKeys} from '@infra';
import {useAuthCredentials} from '@services';
import {useInfiniteQuery} from '@tanstack/react-query';

import {cashFlowService} from '../../cashFlowService';
import {CashFlow} from '../../cashFlowTypes';

export type useCashFlowListResult = {
  cashList: CashFlow[];
  isError: boolean | null;
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => void;
  fetchNextPage: () => void;
};

export function useGetList(date: Date): useCashFlowListResult {
  const {userCredentials} = useAuthCredentials();
  const [cashList, setCashList] = useState<CashFlow[]>([]);

  console.log('data ====', date);

  const formattedDate = date.toISOString().split('T')[0];

  const {isLoading, isFetching, isError, refetch, fetchNextPage, data} =
    useInfiniteQuery({
      queryKey: [QueryKeys.MovimentationList, formattedDate],
      queryFn: ({pageParam}) =>
        cashFlowService.getList(userCredentials!.uid, pageParam, date),
      getNextPageParam: ({hasNextPage, lastVisible}) => {
        hasNextPage ? lastVisible : null;
      },
      enabled: !!userCredentials?.uid,
    });

  useEffect(() => {
    if (data) {
      const newList = data.pages.reduce<CashFlow[]>((prev, curr) => {
        return [...prev, ...curr.data];
      }, []);
      setCashList(newList);
    }
  }, [data]);

  return {
    cashList,
    isLoading,
    isFetching: isFetching && !isLoading,
    isError,
    refetch,
    fetchNextPage,
  };
}
