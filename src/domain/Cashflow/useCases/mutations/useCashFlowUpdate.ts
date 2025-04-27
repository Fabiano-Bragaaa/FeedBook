import {MutationOption, useMutation} from '@infra';

import {cashFlowService} from '../../cashFlowService';
import {CashFlow} from '../../cashFlowTypes';

export function useCashFlowUpdate(options?: MutationOption<CashFlow>) {
  return useMutation<
    {
      id: string;
      updatedData: {
        description: string;
        amount: number;
        type: 'expense' | 'income';
      };
    },
    CashFlow
  >(({id, updatedData}) => cashFlowService.update(id, updatedData), options);
}
