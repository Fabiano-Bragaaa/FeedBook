import {createContext, PropsWithChildren, useState} from 'react';

import {Toast, ToastService} from '../toastType';

export const ToastContext = createContext<ToastService>({
  toast: null,
  showToast: () => {},
  hiddenToast: () => {},
});

export function ToastProvider({children}: PropsWithChildren) {
  const [toast, setToast] = useState<ToastService['toast']>(null);

  function showToast(_toast: Toast) {
    setToast(_toast);
  }

  function hiddenToast() {
    setToast(null);
  }

  return (
    <ToastContext.Provider value={{hiddenToast, showToast, toast}}>
      {children}
    </ToastContext.Provider>
  );
}
