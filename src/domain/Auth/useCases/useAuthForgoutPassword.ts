import {MutationOption} from '@infra';
import {useMutation} from '@tanstack/react-query';

import {authService} from '../authService';

type Variable = {
  email: string;
};

export function useAuthForgoutPassword(options?: MutationOption<void>) {
  const mutation = useMutation<void, Error, Variable>({
    mutationFn: ({email}) => authService.forgotPassword(email),
    retry: false,
    onSuccess: () => {
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
  });
  return {
    isLoading: mutation.isLoading,
    forgoutPassword: (email: Variable) => mutation.mutate(email),
  };
}
