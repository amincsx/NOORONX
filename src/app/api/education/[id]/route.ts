import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Education from '@/models/Education';
import { requireAuth } from '@/lib/auth';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, props: RouteParams) {
  try {
    const { id } = await props.params;
    await connectToDatabase();
    const item = await Education.findById(id).lean();
    if (!item) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.error('GET /api/education/[id] error', error);
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

    const updated = await Education.findByIdAndUpdate(
      id,
      {
        $set: {
          title: body.title,
          titleEn: body.titleEn,
          description: body.description ?? '',
          descriptionEn: body.descriptionEn ?? '',
          content: body.content,
          contentEn: body.contentEn,
          imageUrl: body.imageUrl,
          videoUrl: body.videoUrl,
          duration: body.duration ?? '',
          level: body.level || 'beginner',
          category: body.category ?? '',
          instructor: body.instructor ?? '',
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
    console.error('PUT /api/education/[id] error', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: RouteParams) {
  try {
    const { id } = await props.params;
    const ok = await requireAuth(request);
    if (!ok) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    await connectToDatabase();
    const res = await Education.findByIdAndDelete(id).lean();
    if (!res) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/education/[id] error', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}


