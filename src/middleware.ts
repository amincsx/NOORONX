import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const url = new URL(request.url);
  const isDashboard = url.pathname.startsWith('/dashboard');
  if (!isDashboard) return NextResponse.next();

  const cookieHeader = request.headers.get('cookie') || '';
  const authCookie = cookieHeader.split(';').map(s => s.trim()).find(s => s.startsWith('nooronx_auth='));
  if (!authCookie) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // allow if cookie exists; signature gets validated in APIs
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};


