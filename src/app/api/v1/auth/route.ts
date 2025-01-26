import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username === 'admin' && password === 'password123') {
    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });
    response.cookies.set('auth-token', 'valid-token', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60,
    });
    return response;
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}
