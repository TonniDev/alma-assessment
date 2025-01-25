'use client';
import { themeOverride } from '@ui/base/theme/themeOverride';
import { extendTheme, Theme } from '../chakra';

// @ts-expect-error: Chakra theme is not fully typed
export const theme: Theme & typeof themeOverride = extendTheme(themeOverride);
