import type { StyleFunctionProps } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';
import { textareaTheme } from '@ui/base/textarea.theme';
import { inputTheme } from '../input.theme';
import { colors } from './theme.colors';

export const themeOverride = {
  fonts: {
    heading: 'var(--font-montserrat)',
    body: 'var(--font-montserrat)',
    h1: 'var(--font-montserrat)',
  },
  components: {
    Input: inputTheme,
    Textarea: textareaTheme,
  },
  light: {},
  dark: {},
  colors: {
    ...colors,
    primaryFontColor: {
      darkMode: colors.gray200,
      lightMode: colors.gray900,
    },
  },
  breakpoints: {
    lg: '70em',
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        fontWeight: 400,
        minHeight: '100vh',
        placeItems: 'flex-start',
        backgroundColor: mode(colors.gray50, colors.secondary['800'])(props),
        color: mode(colors.gray700, colors.gray200)(props),
      },
    }),
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
};
