import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {auth} from '@services';
import {GoogleAuthProvider, signInWithCredential} from 'firebase/auth';

import {User} from '../Auth/authTypes';

async function signInWithGoogle(): Promise<User | undefined> {
  try {
    const {data} = await GoogleSignin.signIn();
    const googleCredendials = GoogleAuthProvider.credential(data?.idToken);

    const userCredentials = await signInWithCredential(auth, googleCredendials);

    return userCredentials.user;
  } catch (error) {
    console.log('erro ao logar com o google ==>', error);
  }
}

export const authGoogle = {
  signInWithGoogle,
};
