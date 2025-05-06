import {MutationOption, QueryKeys} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {cashFlowService} from '../../cashFlowService';

export function useCashFlowRemove(options?: MutationOption<void>) {
  const queryClient = useQueryClient();

  const {mutate, isError, isLoading} = useMutation<void, unknown, {id: string}>(
    {
      mutationFn: ({id}) => cashFlowService.remove(id),
      onSuccess: id => {
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.MovimentationList],
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
