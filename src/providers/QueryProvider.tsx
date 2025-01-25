'use client';

import { MutationCache } from '@tanstack/query-core';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

function onError(error: Error) {
  // TODO: Implement error log tool like Sentry
  console.error('@[QUERY ERROR]', error);
}

function QueryProvider({ children }: React.PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      queryCache: new QueryCache({ onError }),
      mutationCache: new MutationCache({ onError }),
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          retry: false,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
}

export default QueryProvider;
