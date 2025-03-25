import {useNavigation} from '@react-navigation/native';

import {RootStackParamList} from '@routes';

export function useResetNavigationSuccess() {
  const navigation = useNavigation();

  function reset(params: RootStackParamList['Success']) {
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
