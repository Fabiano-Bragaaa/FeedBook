import {MutationOption, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {cashFlowService} from '../../cashFlowService';
import {CashFlow} from '../../cashFlowTypes';

export function useCashFlowCreate(options?: MutationOption<CashFlow>) {
  const queryClient = useQueryClient();

  const {mutate, isLoading, isError} = useMutation<
    CashFlow,
    unknown,
    Omit<CashFlow, 'id'>
  >({
    mutationFn: cashFlow => cashFlowService.create(cashFlow),
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
