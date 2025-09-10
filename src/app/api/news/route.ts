import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import News from '@/models/News';
import { requireAuth } from '@/lib/auth';

// GET /api/news - list published news (optionally include drafts with ?all=1)
export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const includeAll = searchParams.get('all') === '1';

    const query = includeAll ? {} : { published: true };
    const items = await News.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json(items, { status: 200 });
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
    await connectToDatabase();
    const body = await request.json();

    const created = await News.create({
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
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('POST /api/news error', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}


