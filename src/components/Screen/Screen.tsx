import {ReactNode} from 'react';
import {KeyboardAvoidingView, Platform, Pressable} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Box, Icon, Text} from '@components';
import {useAppSafeArea, useAppTheme} from '@hooks';

import {ScrollViewContainer, ViewContainer} from './components/ScreenContainer';

type ScreenProps = {
  children: ReactNode;
  canGoBack?: boolean;
  scrollable?: boolean;
};

export function Screen({
  children,
  canGoBack = false,
  scrollable = false,
}: ScreenProps) {
  const {top, bottom} = useAppSafeArea();
  const {colors} = useAppTheme();
  const {goBack} = useNavigation();

  const Container = scrollable ? ScrollViewContainer : ViewContainer;

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Container backgroundColor={colors.background}>
        <Box
          paddingHorizontal="s24"
          style={{paddingTop: top, paddingBottom: bottom}}>
          {canGoBack && (
            <Pressable onPress={goBack}>
              <Box mb="s24" flexDirection="row" alignItems="center">
                <Icon name="arrowLeft" color="primary" onPress={goBack} />
                <Text preset="paragraphMedium" semiBold ml="s8">
                  Voltar
                </Text>
              </Box>
            </Pressable>
          )}
          {children}
        </Box>
      </Container>
    </KeyboardAvoidingView>
  );
}
