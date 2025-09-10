import { NextResponse } from 'next/server';
import { setAuthCookie, verifyCredentials } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    if (!verifyCredentials(username, password)) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
    setAuthCookie(username);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}


