import { cookies } from 'next/headers';
import crypto from 'crypto';

const AUTH_COOKIE = 'nooronx_auth';
const DEFAULT_USERNAME = process.env.ADMIN_USER || 'admin';
const DEFAULT_PASSWORD = process.env.ADMIN_PASS || 'admin123';
const AUTH_SECRET = process.env.AUTH_SECRET || 'change-me-secret';

function sign(value: string): string {
  const h = crypto.createHmac('sha256', AUTH_SECRET).update(value).digest('hex');
  return `${value}.${h}`;
}

function verify(signed: string): string | null {
  const idx = signed.lastIndexOf('.');
  if (idx === -1) return null;
  const value = signed.slice(0, idx);
  const sig = signed.slice(idx + 1);
  const expected = crypto.createHmac('sha256', AUTH_SECRET).update(value).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected)) ? value : null;
}

export function verifyCredentials(username: string, password: string): boolean {
  return username.trim() === DEFAULT_USERNAME && password.trim() === DEFAULT_PASSWORD;
}

export function setAuthCookie(username: string) {
  const value = `${username}|${Date.now()}`;
  const signed = sign(value);
  cookies().set(AUTH_COOKIE, signed, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  });
}

export function clearAuthCookie() {
  cookies().set(AUTH_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
}

export function isAuthenticated(): boolean {
  const cookie = cookies().get(AUTH_COOKIE);
  if (!cookie) return false;
  const raw = verify(cookie.value);
  if (!raw) return false;
  return true;
}

export async function requireAuth(request: Request): Promise<boolean> {
  const headerCookie = request.headers.get('cookie') || '';
  const match = headerCookie.split(';').map(s => s.trim()).find(s => s.startsWith(`${AUTH_COOKIE}=`));
  if (!match) return false;
  const value = decodeURIComponent(match.split('=')[1] || '');
  const raw = verify(value);
  return Boolean(raw);
}


