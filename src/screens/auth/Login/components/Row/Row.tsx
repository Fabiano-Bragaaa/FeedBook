import {Box, Text} from '@components';

export function Row() {
  return (
    <Box flexDirection="row" alignItems="center" justifyContent="center">
      <Box height={1} bg="gray3" flex={1} my="s20" />
      <Text mx="s10" color="gray1" preset="paragraphLarge" bold>
        ou
      </Text>
      <Box height={1} bg="gray3" flex={1} my="s32" alignSelf="center" />
    </Box>
  );
}
