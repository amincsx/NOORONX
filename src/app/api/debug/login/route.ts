import { NextResponse } from 'next/server';
import { verifyCredentials } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    const debugInfo = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      receivedCredentials: {
        username: username,
        hasPassword: Boolean(password),
        passwordLength: password ? password.length : 0
      },
      expectedCredentials: {
        username: process.env.ADMIN_USER || 'admin',
        hasExpectedPassword: Boolean(process.env.ADMIN_PASS),
        expectedPasswordLength: process.env.ADMIN_PASS ? process.env.ADMIN_PASS.length : 0
      },
      credentialsMatch: verifyCredentials(username, password),
      envVars: {
        hasAdminUser: Boolean(process.env.ADMIN_USER),
        hasAdminPass: Boolean(process.env.ADMIN_PASS),
        hasAuthSecret: Boolean(process.env.AUTH_SECRET),
        adminUser: process.env.ADMIN_USER || 'admin'
      }
    };

    return NextResponse.json(debugInfo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Debug login endpoint failed', 
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}