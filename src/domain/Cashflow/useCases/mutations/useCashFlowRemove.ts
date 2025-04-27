import {MutationOption, useMutation} from '@infra';

import {cashFlowService} from '../../cashFlowService';

export function useCashFlowRemove(options?: MutationOption<void>) {
  return useMutation<{id: string}, void>(
    ({id}) => cashFlowService.remove(id),
    options,
  );
}
