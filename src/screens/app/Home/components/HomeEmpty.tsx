import {ActivityIndicator, Box, Button, Text} from '@components';

interface Props {
  loading: boolean;
  error: unknown;
  refetch: () => void;
}

export function HomeEmpty({error, loading, refetch}: Props) {
  if (loading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Não foi possível carregar o feed</Text>
        <Button title="Recarregar" preset="outline" onPress={refetch} />
      </Box>
    );
  }

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text bold preset="paragraphMedium">
        Não há nada na sua lista
      </Text>
    </Box>
  );
}
