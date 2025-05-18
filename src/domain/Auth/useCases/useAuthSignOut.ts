import {MutationOption} from '@infra';
import {useAuthCredentials} from '@services';
import {useMutation} from '@tanstack/react-query';

import {authService} from '../authService';

export function useAuthSignOut(options?: MutationOption<void>) {
  const {removeCredentials} = useAuthCredentials();

  const mutation = useMutation<void, unknown, void>({
    mutationFn: authService.signOut,
    retry: false,
    onSuccess: removeCredentials,
    onError: () => {
      if (options?.onError) {
        options.onError(options.errorMessage || 'Ocorreu um erro');
      }
    },
  });

  return {
    isLoading: mutation.isLoading,
    signOut: () => mutation.mutate(),
  };
}
