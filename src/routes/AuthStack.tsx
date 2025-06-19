import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {IconProps} from '@components';
import {ForgetPassword, Login, SignUp, Success} from '@screens';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Success: {
    title: string;
    description: string;
    icon: Omit<IconProps, 'onPress'>;
  };
  ForgetPassword: undefined;
};

const {Navigator, Screen} = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Navigator screenOptions={{headerShown: false, fullScreenGestureEnabled: false}}>
      <Screen name="Login" component={Login} />
      <Screen name="SignUp" component={SignUp} />
      <Screen name="Success" component={Success} />
      <Screen name="ForgetPassword" component={ForgetPassword} />
    </Navigator>
  );
}
