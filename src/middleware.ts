import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth-token')?.value;
  const publicRoutes = ['/auth', '/auth/logout', '/immigration-assessment'];
  const isPublicRoute = publicRoutes.some(route => req.nextUrl.pathname.startsWith(route));

  console.log('READING', token, isPublicRoute);

  if (isPublicRoute) {
    if (token) {
      return NextResponse.redirect(new URL('/leads', req.url));
    }
    return NextResponse.next();
  }

  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\.ico$|.*\\.icon$).*)'],
};
