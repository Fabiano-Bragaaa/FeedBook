import {MutationOption} from '@infra';
import {useMutation} from '@tanstack/react-query';

import {authService} from '../authService';
import {User} from '../authTypes';

interface Variables {
  email: string;
  password: string;
  displayName: string;
}

export function useAuthSignUp(optios?: MutationOption<User>) {
  const mutation = useMutation<User, Error, Variables>({
    mutationFn: ({email, password, displayName}) =>
      authService.signUp(email, password, displayName),
    retry: false,
    onSuccess: variables => {
      if (optios?.onSuccess) {
        optios.onSuccess(variables);
      }
    },
    onError: error => {
      if (optios?.onError) {
        optios.onError(error.message);
      }
    },
  });

  return {
    isLoading: mutation.isLoading,
    signUp: (variables: Variables) => mutation.mutate(variables),
  };
}
