import {NavigationContainer} from '@react-navigation/native';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';

export function Router() {
  const authenticaded = true;
  return (
    <NavigationContainer>
      {authenticaded ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
