import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Education from '@/models/Education';
import { MockEducation } from '@/lib/mockDB';
import { requireAuth } from '@/lib/auth';

// GET /api/education - list published education (or all with ?all=1)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeAll = searchParams.get('all') === '1';
    const query = includeAll ? {} : { published: true };
    const NODE_ENV = process.env.NODE_ENV || 'development';

    try {
      await connectToDatabase();
      const items = await Education.find(query).sort({ createdAt: -1 }).lean();
      return NextResponse.json(items, { 
        status: 200,
        headers: { 'X-Database': 'mongodb' }
      });
    } catch (mongoError) {
      console.log('MongoDB not available:', mongoError);
      
      // In production, don't fall back to mock data
      if (NODE_ENV === 'production') {
        console.error('Production database connection failed');
        return NextResponse.json(
          { message: 'Database connection failed', error: 'MongoDB unavailable' }, 
          { status: 503 }
        );
      }
      
      // In development, fall back to mock database
      console.log('Using mock database for development education');
      const mockItems = await MockEducation.find(query);
      const items = await mockItems.lean();
      return NextResponse.json(items, {
        status: 200,
        headers: { 'X-Database': 'mock' }
      });
    }
  } catch (error) {
    console.error('GET /api/education error', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// POST /api/education - create education item
export async function POST(request: Request) {
  try {
    const ok = await requireAuth(request);
    if (!ok) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const educationData = {
      title: body.title,
      titleEn: body.titleEn,
      description: body.description || '',
      descriptionEn: body.descriptionEn || '',
      content: body.content,
      contentEn: body.contentEn,
      imageUrl: body.imageUrl,
      videoUrl: body.videoUrl,
      duration: '',
      level: 'beginner',
      category: body.category || '',
      instructor: body.instructor || 'تیم نورونکس',
      published: Boolean(body.published),
      featured: Boolean(body.featured),
      tags: Array.isArray(body.tags) ? body.tags : [],
    };

    const NODE_ENV = process.env.NODE_ENV || 'development';

    try {
      await connectToDatabase();
      const created = await Education.create(educationData);
      return NextResponse.json(created, { 
        status: 201,
        headers: { 'X-Database': 'mongodb' }
      });
    } catch (mongoError) {
      console.log('MongoDB not available:', mongoError);
      
      // In production, don't fall back to mock data
      if (NODE_ENV === 'production') {
        console.error('Production database connection failed during education POST');
        return NextResponse.json(
          { message: 'Database connection failed', error: 'MongoDB unavailable' }, 
          { status: 503 }
        );
      }
      
      // In development, fall back to mock database
      console.log('Using mock database for development education');
      const created = await MockEducation.create(educationData);
      return NextResponse.json(created, {
        status: 201,
        headers: { 'X-Database': 'mock' }
      });
    }
  } catch (error) {
    console.error('POST /api/education error', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}


