import {useContext} from 'react';

import {ToastContext} from './Providers/ToastProvider';
import {ToastService} from './toastType';

export function useToastContext(): ToastService {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('Toast must be used within a ToastProvider');
  }

  return context;
}
