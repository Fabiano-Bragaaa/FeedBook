import {MutationOption, useMutation} from '@infra';

import {cashFlowService} from '../../cashFlowService';
import {CashFlow} from '../../cashFlowTypes';

export function useCashFlowCreate(options?: MutationOption<CashFlow>) {
  return useMutation<{data: Omit<CashFlow, 'id'>}, CashFlow>(
    ({data}) => cashFlowService.create(data),
    options,
  );
}
