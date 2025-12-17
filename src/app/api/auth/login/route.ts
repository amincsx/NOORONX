import { NextResponse } from 'next/server';
import { setAuthCookie, verifyCredentials } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Debug info (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('Login attempt:', { username, hasPassword: Boolean(password) });
      console.log('Environment:', {
        adminUser: process.env.ADMIN_USER || 'admin',
        hasAdminPass: Boolean(process.env.ADMIN_PASS),
        hasAuthSecret: Boolean(process.env.AUTH_SECRET)
      });
    }

    if (!verifyCredentials(username, password)) {
      return NextResponse.json({
        message: 'Invalid credentials',
        debug: process.env.NODE_ENV === 'development' ? {
          receivedUser: username,
          expectedUser: process.env.ADMIN_USER || 'admin'
        } : undefined
      }, { status: 401 });
    }

    await setAuthCookie(username);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown') : undefined
    }, { status: 500 });
  }
}


