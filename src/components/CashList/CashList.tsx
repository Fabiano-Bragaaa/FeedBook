import {CashFlow} from '@domain';

import {Box, BoxProps, Text} from '@components';

type Props = {
  item: CashFlow;
};

export function CashList({item}: Props) {
  const $line: BoxProps = {
    width: 6,
    height: '100%',
    bg: item.type === 'income' ? 'greenSuccess' : 'redError',
  };

  return (
    <Box {...$wrapper}>
      <Box {...$line} />

      <Box {...$boxText}>
        <Text preset="headingSmall">{item.amount}</Text>
      </Box>
    </Box>
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
