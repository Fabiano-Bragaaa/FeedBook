import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {IconProps} from '@components';
import {Login, SignUp, Success, ForgetPassword} from '@screens';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Success: {
    title: string;
    description: string;
    icon: Omit<IconProps, 'onPress'>;
  };
  ForgetPassword: undefined;
};

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

export function Router() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false}}>
        <Screen name="Login" component={Login} />
        <Screen name="SignUp" component={SignUp} />
        <Screen name="Success" component={Success} />
        <Screen name="ForgetPassword" component={ForgetPassword} />
      </Navigator>
    </NavigationContainer>
  );
}
