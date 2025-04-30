import {useEffect} from 'react';
import {Dimensions} from 'react-native';

import {useToast, useToastService} from '@services';

import {$shadowProps} from '@theme';

import {Box, BoxProps} from '../Box/Box';
import {Icon} from '../Icon/Icon';
import {Text} from '../Text/Text';

const MAX_WIDTH = Dimensions.get('screen').width * 0.9;

export function Toast() {
  const toast = useToast();
  const {hiddenToast} = useToastService();

  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        hiddenToast();
      }, 2000);
    }
  }, [toast, hiddenToast]);

  if (!toast) {
    return;
  }

  return (
    <Box top={100} {...$boxStyle}>
      <Icon name="checkRound" color="success" size={40} />
      <Text style={{flexShrink: 1}} ml="s16" preset="paragraphMedium" bold>
        {toast.message}
      </Text>
    </Box>
  );
}

const $boxStyle: BoxProps = {
  position: 'absolute',
  alignSelf: 'center',
  bg: 'background',
  flexDirection: 'row',
  alignItems: 'center',
  p: 's16',
  borderRadius: 's16',
  opacity: 0.95,
  maxWidth: MAX_WIDTH,
  style: {...$shadowProps},
};
