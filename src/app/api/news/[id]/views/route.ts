import { NextResponse } from 'next/server';
import { mockDB } from '@/lib/mockDB';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        // Try MongoDB first
        try {
            const connectDB = (await import('@/lib/mongodb')).default;
            const News = (await import('@/models/News')).default;

            await connectDB();
            const news = await News.findByIdAndUpdate(
                id,
                { $inc: { views: 1 } },
                { new: true, upsert: false }
            );

            if (news) {
                return NextResponse.json({ views: news.views });
            }
        } catch (mongoError) {
            console.log('MongoDB failed, using mock DB for views:', mongoError);
        }

        // Fallback to mock DB
        const newsItem = await mockDB.findById('news', id);
        if (newsItem) {
            const updatedItem = await mockDB.findByIdAndUpdate('news', id, {
                $inc: { views: 1 }
            });
            return NextResponse.json({ views: updatedItem?.views || (newsItem.views || 0) + 1 });
        }

        return NextResponse.json({ error: 'News not found' }, { status: 404 });
    } catch (error) {
        console.error('Error updating views:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
