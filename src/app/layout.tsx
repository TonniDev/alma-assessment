import { Cookies } from '@/src/providers/Cookies';
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
      <body>
        <Cookies>
          {children}
        </Cookies>
      </body>
    </html>
  );
}
