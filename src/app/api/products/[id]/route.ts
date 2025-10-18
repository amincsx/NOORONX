import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Product from '@/models/Product';
import { MockProducts } from '@/lib/mockDB';
import { requireAuth } from '@/lib/auth';

// GET /api/products/[id] - get a single product
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const NODE_ENV = process.env.NODE_ENV || 'development';

    try {
      await connectToDatabase();
      const item = await Product.findById(id).lean();
      if (!item) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json(item, {
        status: 200,
        headers: { 'X-Database': 'mongodb' }
      });
    } catch (mongoError) {
      console.log('MongoDB not available:', mongoError);

      if (NODE_ENV === 'production') {
        return NextResponse.json({ message: 'Database error' }, { status: 503 });
      }

      console.log('Using mock database for product');
      const item = await MockProducts.findById(id);
      if (!item) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json(item, {
        status: 200,
        headers: { 'X-Database': 'mock' }
      });
    }
  } catch (error) {
    console.error(`GET /api/products/${params.id} error`, error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// PUT /api/products/[id] - update a product
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const ok = await requireAuth(request);
    if (!ok) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { id } = params;
    const body = await request.json();
    const NODE_ENV = process.env.NODE_ENV || 'development';

    try {
      await connectToDatabase();
      const updated = await Product.findByIdAndUpdate(id, body, { new: true }).lean();
      if (!updated) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json(updated, {
        status: 200,
        headers: { 'X-Database': 'mongodb' }
      });
    } catch (mongoError) {
      console.log('MongoDB not available:', mongoError);

      if (NODE_ENV === 'production') {
        return NextResponse.json({ message: 'Database error' }, { status: 503 });
      }

      console.log('Using mock database for product update');
      const updated = await MockProducts.findByIdAndUpdate(id, { $set: body });
      if (!updated) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json(updated, {
        status: 200,
        headers: { 'X-Database': 'mock' }
      });
    }
  } catch (error) {
    console.error(`PUT /api/products/${params.id} error`, error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// DELETE /api/products/[id] - delete a product
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const ok = await requireAuth(request);
    if (!ok) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { id } = params;
    const NODE_ENV = process.env.NODE_ENV || 'development';

    try {
      await connectToDatabase();
      const deleted = await Product.findByIdAndDelete(id);
      if (!deleted) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Product deleted' }, { status: 200 });
    } catch (mongoError) {
      console.log('MongoDB not available:', mongoError);

      if (NODE_ENV === 'production') {
        return NextResponse.json({ message: 'Database error' }, { status: 503 });
      }

      console.log('Using mock database for product deletion');
      const success = await MockProducts.findByIdAndDelete(id);
      if (!success) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Product deleted' }, { status: 200 });
    }
  } catch (error) {
    console.error(`DELETE /api/products/${params.id} error`, error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
