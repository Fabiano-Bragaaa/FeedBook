

import { render } from 'test-utils';

import {Button} from '../Button';

describe('<Button />', () => {
  test('the component rendered', () => {
    render(
    <Button title="Button title" />
  );
  });
});
