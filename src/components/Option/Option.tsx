import {
  BoxProps,
  Icon,
  IconProps,
  TouchableOpacityBox,
  TouchableOpacityBoxProps,
} from '@components';
import {themeColor} from '@theme';

type OptionProps = TouchableOpacityBoxProps & {
  icon: Pick<IconProps, 'name' | 'color'>;
  bg: themeColor;
};

export function Option({icon, bg, ...touchableOpacityBoxProps}: OptionProps) {
  const $wrapper: BoxProps = {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    bg,
    borderRadius: 's8',
  };
  return (
    <TouchableOpacityBox
      {...$wrapper}
      activeOpacity={0.7}
      {...touchableOpacityBoxProps}>
      <Icon name={icon.name} color={icon.color} />
    </TouchableOpacityBox>
  );
}
