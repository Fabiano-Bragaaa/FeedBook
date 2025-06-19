import {User} from '@domain';

export interface AuthCredentialsType {
  userCredentials: User | null;
  saveCredentials: (user: User) => Promise<void>;
  removeCredentials: () => Promise<void>;
  isLoading: boolean;
}
