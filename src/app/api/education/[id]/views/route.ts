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
      const Education = (await import('@/models/Education')).default;
      
      await connectDB();
      const education = await Education.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true, upsert: false }
      );
      
      if (education) {
        return NextResponse.json({ views: education.views });
      }
    } catch (mongoError) {
      console.log('MongoDB failed, using mock DB for views:', mongoError);
    }

    // Fallback to mock DB
    const educationItem = await mockDB.findById('education', id);
    if (educationItem) {
      const currentViews = educationItem.views || 0;
      const updatedItem = await mockDB.findByIdAndUpdate('education', id, { 
        views: currentViews + 1 
      });
      return NextResponse.json({ views: updatedItem?.views || currentViews + 1 });
    }

    return NextResponse.json({ error: 'Education not found' }, { status: 404 });
  } catch (error) {
    console.error('Error updating views:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
