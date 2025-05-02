import {MutationOption} from '@infra';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {cashFlowService} from '../../cashFlowService';
import {CashFlow} from '../../cashFlowTypes';

export function useCashFlowUpdate(options?: MutationOption<CashFlow>) {
  const queryClient = useQueryClient();

  const {} = useMutation<
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
    onSuccess: ({}) => {
      queryClient.invalidateQueries({
        queryKey: [],
      });
    },
  });

  // return useMutation<
  //   {
  //     id: string;
  //     updatedData: {
  //       description: string;
  //       amount: number;
  //       type: 'expense' | 'income';
  //     };
  //   },
  //   CashFlow
  // >(({id, updatedData}) => cashFlowService.update(id, updatedData), options);
}
