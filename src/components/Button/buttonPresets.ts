import {ButtonPreset, TouchableOpacityBoxProps} from '@components';
import {themeColor} from '@theme';

type ButtonUI = {
  container: TouchableOpacityBoxProps;
  content: themeColor;
};

export const buttonPresets: Record<
  ButtonPreset,
  {
    default: ButtonUI;
    disabled: ButtonUI;
  }
> = {
  primary: {
    default: {
      container: {
        backgroundColor: 'primary',
      },
      content: 'primaryContranst',
    },
    disabled: {
      container: {
        backgroundColor: 'gray',
      },
      content: 'backgroundContranst',
    },
  },
  outline: {
    default: {
      container: {
        borderWidth: 1,
        borderColor: 'primary',
      },
      content: 'primary',
    },
    disabled: {
      container: {
        borderWidth: 1,
        borderColor: 'gray4',
      },
      content: 'gray2',
    },
  },
  noSelected: {
    default: {
      container: {
        borderWidth: 1,
        borderColor: 'gray2',
      },
      content: 'backgroundContranst',
    },
    disabled: {
      container: {
        borderWidth: 1,
        borderColor: 'gray4',
      },
      content: 'backgroundContranst',
    },
  },
  google: {
    default: {
      container: {
        borderWidth: 1,
        borderColor: 'gray3',
      },
      content: 'backgroundContranst',
    },
    disabled: {
      container: {
        borderWidth: 1,
        borderColor: 'gray3',
      },
      content: 'gray2',
    },
  },
};
