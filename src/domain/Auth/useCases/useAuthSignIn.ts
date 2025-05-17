import {MutationOption} from '@infra';
import {useMutation} from '@tanstack/react-query';

import {authService} from '../authService';
import {User} from '../authTypes';

interface Variables {
  email: string;
  password: string;
}

export function useAuthSignIn(options?: MutationOption<User>) {
  const mutation = useMutation<User, Error, Variables>({
    mutationFn: ({email, password}) => authService.signIn(email, password),
    retry: false,
    onSuccess: variables => {
      if (options?.onSuccess) {
        options.onSuccess(variables);
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
    signIn: (variables: Variables) => mutation.mutate(variables),
  };
}
