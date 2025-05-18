import {auth} from '@services';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';

import {User} from './authTypes';

async function signIn(email: string, password: string): Promise<User> {
  const {user} = await signInWithEmailAndPassword(auth, email, password);

  return user;
}

async function signUp(
  email: string,
  password: string,
  name: string,
): Promise<User> {
  const {user} = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(user, {displayName: name});

  return user;
}

async function logout(): Promise<void> {
  await signOut(auth);
}

export const authFirebase = {
  signUp,
  signIn,
  logout,
};
