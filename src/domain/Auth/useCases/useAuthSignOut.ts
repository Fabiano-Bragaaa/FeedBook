import {MutationOption} from '@infra';
import {useAuthCredentials} from '@services';
import {useMutation} from '@tanstack/react-query';

import {authService} from '../authService';

export function useAuthSignOut(options?: MutationOption<void>) {
  const {removeCredentials} = useAuthCredentials();

  const mutation = useMutation<void, Error, void>({
    mutationFn: authService.signOut,
    retry: false,
    onSuccess: removeCredentials,
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
  });

  return {
    isLoading: mutation.isLoading,
    signOut: () => mutation.mutate(),
  };
}
