import {create} from 'zustand';
import {persist} from 'zustand/middleware';

import {storage} from '../storage/storage';

import {AuthCredentialsType} from './authCredentialsType';

export function useAuthCredentials(): AuthCredentialsType {
  return useAuthCredentialsZustand();
}

const useAuthCredentialsZustand = create<AuthCredentialsType>()(
  persist(
    set => ({
      userCredentials: null,
      saveCredentials: async user => set({userCredentials: user}),
      removeCredentials: async () => set({userCredentials: null}),
      isLoading: true,
    }),
    {
      name: '@Auth',
      storage: storage,
      onRehydrateStorage: () => () => {
        useAuthCredentialsZustand.setState({isLoading: false});
      },
    },
  ),
);
