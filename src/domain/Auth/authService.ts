import {authFirebase} from './authFirebase';
import {User} from './authTypes';

async function signIn(email: string, password: string): Promise<User> {
  const user = await authFirebase.signIn(email, password);

  return user;
}

async function signUp(
  email: string,
  password: string,
  name: string,
): Promise<User> {
  const user = await authFirebase.signUp(email, password, name);

  return user;
}

async function signOut(): Promise<void> {
  await authFirebase.logout();
}

async function forgotPassword(email: string): Promise<void> {
  await authFirebase.forgoutPassword(email);
}
export const authService = {
  signIn,
  signUp,
  signOut,
  forgotPassword,
};
