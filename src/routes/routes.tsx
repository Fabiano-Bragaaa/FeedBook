import {NavigationContainer} from '@react-navigation/native';
import {useAuthCredentials} from '@services';

import {ActivityIndicator, Box} from '@components';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';

export function Router() {
  const {userCredentials, isLoading} = useAuthCredentials();

  if (isLoading) {
    return (
      <Box flex={1} bg="background" justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Box>
    );
  }
  return (
    <NavigationContainer>
      {userCredentials?.uid ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
