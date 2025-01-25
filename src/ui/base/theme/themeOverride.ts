import { colors } from './theme.colors';

export const themeOverride = {
  tokens: {
    fonts: {
      heading: { value: 'var(--font-montserrat)' },
      body: { value: 'var(--font-montserrat)' },
      h1: { value: 'var(--font-montserrat)' },
      fontFamily: { value: 'var(--font-montserrat)' },
    },
    breakpoints: {
      base: {value:  '0em' },
      sm: {value:  '30em' },
      md: {value:  '52em' },
      lg: {value:  '70em' },
      xl: {value:  '85em' },
      "2xl": {value: '96em' },
    },
    colors: {
      ...colors,
    },
  },
};
