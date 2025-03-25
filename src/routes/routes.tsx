import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {IconProps} from '@components';
import {Login, SignUp} from '@screens';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Sucess: {
    title: string;
    description: string;
    icon: Pick<IconProps, 'name' | 'size'>;
  };
  ForgetPassword: undefined;
};

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

export function Router() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Login" component={Login} />
        <Screen name="SignUp" component={SignUp} />
      </Navigator>
    </NavigationContainer>
  );
}
