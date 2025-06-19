import {MutationOption, QueryKeys} from '@infra';
import {useDay} from '@services';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {cashFlowService} from '../../cashFlowService';
import {CashFlow} from '../../cashFlowTypes';

export function useCashFlowCreate(options?: MutationOption<CashFlow>) {
  const {day} = useDay();
  const queryClient = useQueryClient();

  const selectedDate = day ? new Date(day.dateString) : undefined;

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
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.CashFlowCardHeader, selectedDate],
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
