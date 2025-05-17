import {create} from 'zustand';

import {AuthCredentialsType} from './authCredentialsType';

export function useAuthCredentials(): AuthCredentialsType {
  return useAuthCredentialsZustand();
}

const useAuthCredentialsZustand = create<AuthCredentialsType>(set => ({
  userCredentials: null,
  saveCredentials: async user => set({userCredentials: user}),
  removeCredentials: async () => set({userCredentials: null}),
  isLoading: false,
}));
