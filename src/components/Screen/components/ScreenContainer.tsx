import {ReactNode} from 'react';
import {ScrollView, View} from 'react-native';

type Props = {
  children: ReactNode;
  backgroundColor: string;
};

export function ScrollViewContainer({backgroundColor, children}: Props) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      style={{backgroundColor, flex: 1}}>
      {children}
    </ScrollView>
  );
}

export function ViewContainer({backgroundColor, children}: Props) {
  return <View style={{backgroundColor, flex: 1}}>{children}</View>;
}
