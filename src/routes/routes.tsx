import {NavigationContainer} from '@react-navigation/native';
import {useAuthCredentials} from '@services';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';

export function Router() {
  const {userCredentials} = useAuthCredentials();
  return (
    <NavigationContainer>
      {userCredentials ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
