import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import News from '@/models/News';
import { requireAuth } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        const ok = await requireAuth(request);
        if (!ok) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        try {
            await connectToDatabase();
            const allNews = await News.find({}).lean();

            const debugInfo = allNews.map(item => ({
                mongoId: item._id?.toString(),
                customId: item.id,
                title: item.title?.substring(0, 50) + '...',
                hasId: Boolean(item.id),
                hasMongoId: Boolean(item._id),
                idType: typeof item.id,
                mongoIdType: typeof item._id
            }));

            return NextResponse.json({
                total: allNews.length,
                items: debugInfo
            }, { status: 200 });

        } catch (error) {
            return NextResponse.json({
                error: 'Database connection failed',
                message: error instanceof Error ? error.message : 'Unknown error'
            }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({
            error: 'Debug endpoint failed',
            message: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}