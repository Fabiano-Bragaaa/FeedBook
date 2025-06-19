import {MutationOption, QueryKeys} from '@infra';
import {useDay} from '@services';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {cashFlowService} from '../../cashFlowService';

export function useCashFlowRemove(options?: MutationOption<void>) {
  const {day} = useDay();

  const queryClient = useQueryClient();

  const selectedDate = day ? new Date(day.dateString) : undefined;

  const {mutate, isError, isLoading} = useMutation<void, unknown, {id: string}>(
    {
      mutationFn: ({id}) => cashFlowService.remove(id),
      onSuccess: id => {
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.MovimentationList],
        });
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.CashFlowCardHeader, selectedDate],
        });
        if (options?.onSuccess) {
          options.onSuccess(id);
        }
      },
      onError: () => {
        if (options?.onError) {
          options.onError(options?.errorMessage || 'Ocorreu um erro');
        }
      },
    },
  );

  return {
    mutate,
    isError,
    isLoading,
  };
}
