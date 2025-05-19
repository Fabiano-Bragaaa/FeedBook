import {MutationOption} from '@infra';
import {useMutation} from '@tanstack/react-query';

import {authService} from '../authService';

type Variable = {
  email: string;
};

export function useAuthForgoutPassword(options?: MutationOption<void>) {
  const mutation = useMutation<void, unknown, Variable>({
    mutationFn: ({email}) => authService.forgoutPassword(email),
    retry: false,
    onSuccess: () => {
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
    onError: () => {
      if (options?.onError) {
        options.onError(options.errorMessage || 'Ocorreu um erro');
      }
    },
  });
  return {
    isLoading: mutation.isLoading,
    forgoutPassword: (email: Variable) => mutation.mutate(email),
  };
}
