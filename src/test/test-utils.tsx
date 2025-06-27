import { ReactElement, ReactNode } from 'react';

import { ThemeProvider } from '@shopify/restyle';
import { render, RenderOptions } from '@testing-library/react-native';

import { theme } from '@theme';

const AllTheProvider = ({children}: {children: ReactNode}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

function customRender<T = unknown>(component: ReactElement<T>, options?:Omit<RenderOptions, 'wrapper'>,) {
  return render(component, {wrapper: AllTheProvider, ...options});
}

export * from '@testing-library/react-native';
export {customRender as render};
