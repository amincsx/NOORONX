import { NextResponse } from 'next/server';
import { connectToDatabase, isMongoDBAvailable } from '@/lib/db';
import News from '@/models/News';
import { MockNews } from '@/lib/mockDB';
import { requireAuth } from '@/lib/auth';

// GET /api/news - list published news (optionally include drafts with ?all=1)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeAll = searchParams.get('all') === '1';
    const NODE_ENV = process.env.NODE_ENV || 'development';

    try {
      await connectToDatabase();
      const query = includeAll ? {} : { published: true };
      const items = await News.find(query).sort({ createdAt: -1 }).lean();
      return NextResponse.json(items, { 
        status: 200,
        headers: { 'X-Database': 'mongodb' }
      });
    } catch (mongoError) {
      console.log('MongoDB not available:', mongoError);
      
      // In production, don't fall back to mock data - return error instead
      if (NODE_ENV === 'production') {
        console.error('Production database connection failed - this should not happen');
        return NextResponse.json(
          { message: 'Database connection failed', error: 'MongoDB unavailable' }, 
          { status: 503 }
        );
      }
      
      // In development, fall back to mock database
      console.log('Using mock database for development');
      const items = await MockNews.find(includeAll ? {} : { published: true });
      const results = await items.lean();
      return NextResponse.json(results, {
        status: 200,
        headers: { 'X-Database': 'mock' }
      });
    }
  } catch (error) {
    console.error('GET /api/news error', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// POST /api/news - create news item
export async function POST(request: Request) {
  try {
    const ok = await requireAuth(request);
    if (!ok) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const newsData = {
      title: body.title,
      titleEn: body.titleEn,
      content: body.content,
      contentEn: body.contentEn,
      excerpt: body.excerpt || '',
      excerptEn: body.excerptEn || '',
      imageUrl: body.imageUrl,
      author: body.author || 'مدیر سایت',
      published: Boolean(body.published),
      featured: Boolean(body.featured),
      tags: Array.isArray(body.tags) ? body.tags : [],
    };

    const NODE_ENV = process.env.NODE_ENV || 'development';

    try {
      await connectToDatabase();
      const created = await News.create(newsData);
      return NextResponse.json(created, { 
        status: 201,
        headers: { 'X-Database': 'mongodb' }
      });
    } catch (mongoError) {
      console.log('MongoDB not available:', mongoError);
      
      // In production, don't fall back to mock data
      if (NODE_ENV === 'production') {
        console.error('Production database connection failed during POST');
        return NextResponse.json(
          { message: 'Database connection failed', error: 'MongoDB unavailable' }, 
          { status: 503 }
        );
      }
      
      // In development, fall back to mock database
      console.log('Using mock database for development');
      const created = await MockNews.create(newsData);
      return NextResponse.json(created, {
        status: 201,
        headers: { 'X-Database': 'mock' }
      });
    }
  } catch (error) {
    console.error('POST /api/news error', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}


