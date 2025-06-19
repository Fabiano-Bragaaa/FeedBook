import {QueryKeys} from '@infra';
import {useAuthCredentials} from '@services';
import {useQuery} from '@tanstack/react-query';

import {cashFlowService} from '../../cashFlowService';

export function useGetTransactionDates() {
  const {userCredentials} = useAuthCredentials();
  const {data, isLoading} = useQuery({
    queryKey: [QueryKeys.GetTransactionDates],
    queryFn: () => cashFlowService.getTransactionDates(userCredentials!.uid),
    staleTime: 1000 * 30,
  });

  return {
    data,
    isLoading,
  };
}
