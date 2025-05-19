import {auth} from '@services';
import {translateFirebaseError} from '@utils';
import {FirebaseError} from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';

import {User} from './authTypes';

const DEFAULT_ERROR = 'Erro inesperado. Tente novamente.';

async function signIn(email: string, password: string): Promise<User> {
  try {
    const {user} = await signInWithEmailAndPassword(auth, email, password);

    return user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(translateFirebaseError(error.code));
    }
    throw new Error(DEFAULT_ERROR);
  }
}

async function signUp(
  email: string,
  password: string,
  name: string,
): Promise<User> {
  try {
    const {user} = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(user, {displayName: name});

    return user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(translateFirebaseError(error.code));
    }
    throw new Error(DEFAULT_ERROR);
  }
}

async function logout(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error.code);

      throw new Error(translateFirebaseError(error.code));
    }
    throw new Error(DEFAULT_ERROR);
  }
}

async function forgoutPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(translateFirebaseError(error.code));
    }
    throw new Error(DEFAULT_ERROR);
  }
}

export const authFirebase = {
  signUp,
  signIn,
  logout,
  forgoutPassword,
};
