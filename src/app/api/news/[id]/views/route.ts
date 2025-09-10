import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';
import { mockDB } from '@/lib/mockDB';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Try MongoDB first
    try {
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
      const currentViews = newsItem.views || 0;
      const updatedItem = await mockDB.findByIdAndUpdate('news', id, { 
        views: currentViews + 1 
      });
      return NextResponse.json({ views: updatedItem?.views || currentViews + 1 });
    }

    return NextResponse.json({ error: 'News not found' }, { status: 404 });
  } catch (error) {
    console.error('Error updating views:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
