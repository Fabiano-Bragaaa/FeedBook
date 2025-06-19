import {MutationOption, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {cashFlowService} from '../../cashFlowService';
import {CashFlow} from '../../cashFlowTypes';

export function useCashFlowUpdate(options?: MutationOption<CashFlow>) {
  const queryClient = useQueryClient();

  const {mutate, isError, isLoading} = useMutation<
    CashFlow,
    unknown,
    {
      id: string;
      updatedData: {
        description: string;
        amount: number;
        type: 'expense' | 'income';
      };
    }
  >({
    mutationFn: ({id, updatedData}) => cashFlowService.update(id, updatedData),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.MovimentationList],
      });
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: () => {
      if (options?.onError) {
        options.onError(options?.errorMessage || 'Ocorreu um erro');
      }
    },
  });

  return {
    mutate,
    isLoading,
    isError,
  };
}
