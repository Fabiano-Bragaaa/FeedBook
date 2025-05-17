import {authFirebase} from './authFirebase';
import {User} from './authTypes';

async function signUp(
  email: string,
  password: string,
  name: string,
): Promise<User> {
  const user = await authFirebase.signUp(email, password, name);

  return user;
}

export const authService = {
  signUp,
};
