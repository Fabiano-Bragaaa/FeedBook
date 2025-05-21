import {User} from '../Auth/authTypes';

import {authGoogle} from './authGoogle';

async function signInWithGoogle(): Promise<User> {
  const response = await authGoogle.signInWithGoogle();

  if (!response) {
    throw new Error('Erro ao fazer login com o google');
  }

  return response;
}

export const authGoogleService = {
  signInWithGoogle,
};
