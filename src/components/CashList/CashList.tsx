import {CashFlow} from '@domain';
import {formatCurrency} from '@utils';

import {
  Box,
  BoxProps,
  Text,
  TouchableOpacityBox,
  TouchableOpacityBoxProps,
} from '@components';

type Props = TouchableOpacityBoxProps & {
  item: CashFlow;
};

export function CashList({item, ...touchableOpacityBoxProps}: Props) {
  const $line: BoxProps = {
    width: 6,
    height: '100%',
    bg: item.type === 'income' ? 'greenSuccess' : 'redError',
  };

  return (
    <TouchableOpacityBox
      activeOpacity={0.7}
      {...$wrapper}
      {...touchableOpacityBoxProps}>
      <Box {...$line} />

      <Box {...$boxText}>
        <Text preset="headingSmall">{formatCurrency(item.amount)}</Text>
      </Box>
    </TouchableOpacityBox>
  );
}

const $wrapper: BoxProps = {
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: 's12',
  borderWidth: 1,
  borderColor: 'gray3',
  mb: 's16',
  height: 52,
  overflow: 'hidden',
  backgroundColor: 'background',
};

const $boxText: BoxProps = {
  justifyContent: 'center',
  height: 50,
  p: 's12',
};
