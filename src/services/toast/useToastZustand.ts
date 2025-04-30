import {create} from 'zustand';

import {ToastService} from './toastType';

const useToastStore = create<ToastService>(set => ({
  toast: null,
  showToast: toast => set({toast}),
  hiddenToast: () => set({toast: null}),
}));

export function useToastZustand(): ToastService['toast'] {
  return useToastStore(state => state.toast);
}

export function useToastServiceZustand(): Pick<
  ToastService,
  'hiddenToast' | 'showToast'
> {
  const showToast = useToastStore(state => state.showToast);
  const hiddenToast = useToastStore(state => state.hiddenToast);

  return {
    showToast,
    hiddenToast,
  };
}
