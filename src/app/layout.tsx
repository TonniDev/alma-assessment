import { Providers } from '@/src/providers/providers';
import { montserrat } from '@ui/fonts';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Alma Assessment',
    default: 'Alma Assessment',
  },
  description: 'Frontend assessment for Alma',
  metadataBase: new URL('https://alma-assessment-tonnis-project.vercel.app'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body className="light">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
