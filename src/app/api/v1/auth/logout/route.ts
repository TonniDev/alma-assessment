import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL('/auth', req.url);
  const response = NextResponse.redirect(url);
  response.cookies.delete('auth-token');
  return response;
}
