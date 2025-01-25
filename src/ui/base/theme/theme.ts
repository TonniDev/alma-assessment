'use client';
import { themeOverride } from '@ui/base/theme/themeOverride';
import { defaultConfig, createSystem } from '@chakra-ui/react';

// @ts-expect-error: Chakra theme is not fully typed
export const theme: Theme & typeof themeOverride = createSystem(defaultConfig, { theme: themeOverride });
