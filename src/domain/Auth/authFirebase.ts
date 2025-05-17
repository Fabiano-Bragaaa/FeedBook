import {auth} from '@services';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';

import {User} from './authTypes';

async function signUp(
  email: string,
  password: string,
  name: string,
): Promise<User> {
  const {user} = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(user, {displayName: name});

  return user;
}

export const authFirebase = {
  signUp,
};
