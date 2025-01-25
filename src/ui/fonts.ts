import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import { Montserrat } from 'next/font/google';

export const montserrat: NextFontWithVariable = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-montserrat',
});
