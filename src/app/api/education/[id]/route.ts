import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Education from '@/models/Education';
import { MockEducation } from '@/lib/mockDB';
import { requireAuth } from '@/lib/auth';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, props: RouteParams) {
  try {
    const { id } = await props.params;

    try {
      await connectToDatabase();
      const item = await Education.findById(id).lean();
      if (!item) return NextResponse.json({ message: 'Not found' }, { status: 404 });
      return NextResponse.json(item, { status: 200 });
    } catch (mongoError) {
      console.log('MongoDB not available, using mock database for education');
      const mockItem = await MockEducation.findById(id);
      const item = await mockItem.lean();
      if (!item) return NextResponse.json({ message: 'Not found' }, { status: 404 });
      return NextResponse.json(item, {
        status: 200,
        headers: { 'X-Database': 'mock' }
      });
    }
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

    const body = await request.json();
    const updateData = {
      $set: {
        title: body.title,
        titleEn: body.titleEn,
        description: body.description ?? '',
        descriptionEn: body.descriptionEn ?? '',
        content: body.content,
        contentEn: body.contentEn,
        imageUrl: body.imageUrl,
        videoUrl: body.videoUrl,
        duration: '',
        level: 'beginner',
        category: body.category ?? '',
        instructor: body.instructor ?? 'تیم نورونکس',
        published: Boolean(body.published),
        featured: Boolean(body.featured),
        tags: Array.isArray(body.tags) ? body.tags : [],
      },
    };

    try {
      await connectToDatabase();
      const updated = await Education.findByIdAndUpdate(id, updateData, { new: true }).lean();
      if (!updated) return NextResponse.json({ message: 'Not found' }, { status: 404 });
      return NextResponse.json(updated, { status: 200 });
    } catch (mongoError) {
      console.log('MongoDB not available, using mock database for education');
      const mockUpdated = await MockEducation.findByIdAndUpdate(id, updateData, { new: true });
      const updated = await mockUpdated.lean();
      if (!updated) return NextResponse.json({ message: 'Not found' }, { status: 404 });
      return NextResponse.json(updated, {
        status: 200,
        headers: { 'X-Database': 'mock' }
      });
    }
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

    try {
      await connectToDatabase();
      const res = await Education.findByIdAndDelete(id).lean();
      if (!res) return NextResponse.json({ message: 'Not found' }, { status: 404 });
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (mongoError) {
      console.log('MongoDB not available, using mock database for education');
      const mockDeleted = await MockEducation.findByIdAndDelete(id);
      const res = await mockDeleted.lean();
      if (!res) return NextResponse.json({ message: 'Not found' }, { status: 404 });
      return NextResponse.json({ success: true }, {
        status: 200,
        headers: { 'X-Database': 'mock' }
      });
    }
  } catch (error) {
    console.error('DELETE /api/education/[id] error', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}


