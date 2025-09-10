import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import News from '@/models/News';
import { requireAuth } from '@/lib/auth';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, props: RouteParams) {
  try {
    const { id } = await props.params;
    await connectToDatabase();
    const item = await News.findById(id).lean();
    if (!item) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.error('GET /api/news/[id] error', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, props: RouteParams) {
  try {
    const { id } = await props.params;
    const ok = await requireAuth(request);
    if (!ok) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    await connectToDatabase();
    const body = await request.json();

    const updated = await News.findByIdAndUpdate(
      id,
      {
        $set: {
          title: body.title,
          titleEn: body.titleEn,
          content: body.content,
          contentEn: body.contentEn,
          excerpt: body.excerpt ?? '',
          excerptEn: body.excerptEn ?? '',
          imageUrl: body.imageUrl,
          author: body.author,
          published: Boolean(body.published),
          featured: Boolean(body.featured),
          tags: Array.isArray(body.tags) ? body.tags : [],
        },
      },
      { new: true }
    ).lean();

    if (!updated) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('PUT /api/news/[id] error', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: RouteParams) {
  try {
    const { id } = await props.params;
    const ok = await requireAuth(request);
    if (!ok) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    await connectToDatabase();
    const res = await News.findByIdAndDelete(id).lean();
    if (!res) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/news/[id] error', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}


