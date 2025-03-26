import {useNavigation} from '@react-navigation/native';

import {AuthStackParamList} from '@routes';

export function useResetNavigationSuccess() {
  const navigation = useNavigation();

  function reset(params: AuthStackParamList['Success']) {
    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'Login',
        },
        {
          name: 'Success',
          params,
        },
      ],
    });
  }

  return {reset};
}
