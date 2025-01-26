'use client';
import QueryProvider from '@/src/providers/QueryProvider';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import { theme } from '@ui/base/theme/theme';

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <QueryProvider>
      <ChakraProvider value={theme}>
        <ThemeProvider attribute="class" disableTransitionOnChange defaultTheme="light">
          {children}
        </ThemeProvider>
      </ChakraProvider>
    </QueryProvider>
  );
}
