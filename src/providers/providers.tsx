'use client';
import QueryProvider from '@/src/providers/QueryProvider';
import { ChakraProvider, cookieStorageManagerSSR, localStorageManager } from '@ui/base/chakra';
import { theme } from '@ui/base/theme/theme';

export function Providers({ cookie, children }: React.PropsWithChildren<{ cookie?: string }>) {
  const colorModeManager = typeof cookie === 'string' ? cookieStorageManagerSSR(cookie) : localStorageManager;
  return (
    <QueryProvider>
      <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
        {children}
      </ChakraProvider>
    </QueryProvider>
  );
}
