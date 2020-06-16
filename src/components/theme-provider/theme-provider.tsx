import * as React from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import defaultTheme from './default';
import Reset from '../reset';

export interface IThemeProps {
  /**
   * The theme you want to use with the provider.
   *
   * @default DefaultTheme
   */
  theme?: DefaultTheme;
}

export const Theme: React.FC<IThemeProps> = ({ theme = defaultTheme, ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Reset />
        {props.children}
      </>
    </ThemeProvider>
  );
};

Theme.displayName = 'Theme';

export default Theme;
