import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {cashFlowService} from '../../cashFlowService';

export function useGetTransactionDates() {
  const {data, isLoading} = useQuery({
    queryKey: [QueryKeys.GetTransactionDates],
    queryFn: cashFlowService.getTransactionDates,
    staleTime: 1000 * 30,
  });

  return {
    data,
    isLoading,
  };
}
