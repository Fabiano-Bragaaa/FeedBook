import {SafeAreaView} from 'react-native';

import {ThemeProvider} from '@shopify/restyle';

import {Text, Button, Icon} from '@components';
import {theme} from '@theme';

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{padding: 20}}>
        <Text preset="headingLarge">Ola</Text>
        <Button title="entrar" disabled />
        <Icon name="bookmark" />
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
