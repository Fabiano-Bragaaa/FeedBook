import {SafeAreaView} from 'react-native';

import {ThemeProvider} from '@shopify/restyle';

import {Text, Button} from '@components';
import {theme} from '@theme';

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{padding: 20}}>
        <Text preset="headingLarge">Ola</Text>
        <Button title="entrar" disabled />
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
