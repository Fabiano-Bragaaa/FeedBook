import 'react-native-gesture-handler';

import {ToastProvider} from '@services';
import {ThemeProvider} from '@shopify/restyle';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Toast} from '@components';
import {Router} from '@routes';
import {theme} from '@theme';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <Router />
            <Toast />
          </ToastProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
