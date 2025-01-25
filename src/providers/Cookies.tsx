import { cookies as getCookies } from 'next/dist/server/request/cookies';
import { Providers } from './providers';

export async function Cookies({ children }: React.PropsWithChildren) {
  const cookies = await getCookies();
  const chakraCookie = cookies.get('chakra-ui-color-mode')?.value;
  return <Providers cookie={chakraCookie}>{children}</Providers>;
}
