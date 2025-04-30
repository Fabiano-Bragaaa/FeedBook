import {ToastService} from './toastType';
import {useToastContext} from './useToastContext';
import {useToastServiceZustand, useToastZustand} from './useToastZustand';

export function useToast(): ToastService['toast'] {
  return useToastZustand();
}

export function useToastService(): Pick<
  ToastService,
  'hiddenToast' | 'showToast'
> {
  return useToastServiceZustand();
}
