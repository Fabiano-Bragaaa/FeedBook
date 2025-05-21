import {MutationOption} from '@infra';
import {useAuthCredentials} from '@services';
import {useMutation} from '@tanstack/react-query';

import {User} from '../../Auth/authTypes';
import {authGoogleService} from '../authGoogleService';

export function useAuthGoogleSignIn(options?: MutationOption<User>) {
  const {saveCredentials} = useAuthCredentials();

  const mutation = useMutation<User, Error, void>({
    mutationFn: authGoogleService.signInWithGoogle,
    retry: false,
    onSuccess: variables => {
      saveCredentials(variables);
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
  });

  return {
    isLoading: mutation.isLoading,
    signInWithGoogle: mutation.mutate,
  };
}
