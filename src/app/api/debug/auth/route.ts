import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const authCookie = cookieStore.get('nooronx_auth');

        const debugInfo = {
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV,
            hasAuthCookie: Boolean(authCookie),
            cookieValue: authCookie ? '[PRESENT]' : null,
            envVars: {
                hasAdminUser: Boolean(process.env.ADMIN_USER),
                hasAdminPass: Boolean(process.env.ADMIN_PASS),
                hasAuthSecret: Boolean(process.env.AUTH_SECRET),
                adminUser: process.env.ADMIN_USER || 'admin',
            },
            headers: {
                cookie: Boolean(cookieStore.toString()),
                userAgent: process.env.NODE_ENV === 'development' ? 'debug-mode' : '[hidden]'
            }
        };

        return NextResponse.json(debugInfo, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            error: 'Debug endpoint failed',
            message: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}