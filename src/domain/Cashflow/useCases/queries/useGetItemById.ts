import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {cashFlowService} from '../../cashFlowService';

export function useItemById(id: string) {
  const {data, isLoading, isError} = useQuery({
    queryKey: [QueryKeys.getItemById, id],
    queryFn: () => cashFlowService.getItemById(id),
    staleTime: 1000 * 30, //30 seconds
  });

  return {
    data,
    isLoading,
    isError,
  };
}
