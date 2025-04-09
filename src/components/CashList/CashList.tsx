import {CashFlow} from '@domain';

import {Box, Text} from '@components';

type Props = {
  item: CashFlow;
};

export function CashList({item}: Props) {
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      borderRadius="s12"
      borderWidth={1}
      borderColor="backgroundContranst"
      mb="s16"
      overflow="hidden">
      <Box
        width={6}
        height="100%"
        bg={item.type === 'income' ? 'greenSuccess' : 'redError'}
      />

      <Box borderColor="background" justifyContent="center" height={50} p="s12">
        <Text>{item.text}</Text>
      </Box>
    </Box>
  );
}
