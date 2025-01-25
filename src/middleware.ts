import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.endsWith('/examples')) {
    return NextResponse.redirect(new URL(`/examples/start`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\.ico$|.*\\.icon$).*)'],
};
