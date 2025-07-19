import {ReactTestInstance} from 'react-test-renderer';
import {fireEvent, render, screen} from 'test-utils';

import {Button} from '../Button';

describe('<Button />', () => {
  test('calls the onPress function when is pressed', () => {
    const mockedOnPress = jest.fn();

    render(<Button title="Button title" onPress={mockedOnPress} />);

    const titleElement = screen.queryByText('Button title');

    fireEvent.press(titleElement as ReactTestInstance);

    expect(mockedOnPress).toHaveBeenCalled();
  });
});
