import {auth} from '@services';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
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

async function forgoutPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

export const authFirebase = {
  signUp,
  signIn,
  logout,
  forgoutPassword,
};
