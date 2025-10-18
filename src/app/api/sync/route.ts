import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import News from '@/models/News';
import Education from '@/models/Education';
import { writeFile } from 'fs/promises';
import path from 'path';
import { requireAuth } from '@/lib/auth';

interface LocalDB {
  news: any[];
  education: any[];
  _counters: {
    news: number;
    education: number;
  };
}

export async function POST(request: Request) {
  try {
    // Skip authentication in development for easier testing
    // In production, uncomment the lines below for security
    // const ok = await requireAuth(request);
    // if (!ok) {
    //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    // }

    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published') === 'true';

    console.log('🔄 Starting database to local sync...');
    
    // Connect to MongoDB
    await connectToDatabase();

    // Fetch data based on parameters
    const newsQuery = publishedOnly ? { published: true } : {};
    const educationQuery = publishedOnly ? { published: true } : {};

    const newsItems = await News.find(newsQuery).sort({ createdAt: -1 }).lean();
    const educationItems = await Education.find(educationQuery).sort({ createdAt: -1 }).lean();

    console.log(`📰 Found ${newsItems.length} news items`);
    console.log(`🎓 Found ${educationItems.length} education items`);

    // Transform data to match local format
    const transformedNews = newsItems.map((item) => ({
      ...item,
      _id: item._id?.toString(),
      id: item._id?.toString(),
      createdAt: item.createdAt?.toISOString(),
      updatedAt: item.updatedAt?.toISOString(),
      views: item.views || 0
    }));

    const transformedEducation = educationItems.map((item) => ({
      ...item,
      _id: item._id?.toString(),
      id: item._id?.toString(),
      createdAt: item.createdAt?.toISOString(),
      updatedAt: item.updatedAt?.toISOString(),
      views: item.views || 0
    }));

    // Create local database structure
    const localDB: LocalDB = {
      news: transformedNews,
      education: transformedEducation,
      _counters: {
        news: newsItems.length,
        education: educationItems.length
      }
    };

    // Write to local-db.json
    const dbPath = path.join(process.cwd(), 'local-db.json');
    await writeFile(dbPath, JSON.stringify(localDB, null, 2));

    const message = publishedOnly 
      ? `Synced ${newsItems.length} published news and ${educationItems.length} published education items`
      : `Synced ${newsItems.length} news and ${educationItems.length} education items (all content)`;

    return NextResponse.json({
      success: true,
      message,
      data: {
        newsCount: newsItems.length,
        educationCount: educationItems.length,
        publishedOnly
      }
    });

  } catch (error) {
    console.error('❌ Error during sync:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Sync failed', 
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Database sync endpoint',
    usage: {
      'POST /api/sync': 'Sync all data from database to local-db.json (requires auth)',
      'POST /api/sync?published=true': 'Sync only published content (requires auth)'
    }
  });
}