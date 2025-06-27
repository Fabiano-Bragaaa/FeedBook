import { ThemeProvider } from '@shopify/restyle';
import {render} from '@testing-library/react-native';

import { theme } from '@theme';

import {Button} from '../Button';

describe('<Button />', () => {
  test('the component rendered', () => {
    render(
  <ThemeProvider theme={theme}>
    <Button title="Button title" />
  </ThemeProvider>
  );
  });
});
