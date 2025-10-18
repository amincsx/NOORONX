import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Product from '@/models/Product';
import { MockProducts } from '@/lib/mockDB';
import { requireAuth } from '@/lib/auth';

// GET /api/products - list published products (or all with ?all=1)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeAll = searchParams.get('all') === '1';
    const query = includeAll ? {} : { published: true };
    const NODE_ENV = process.env.NODE_ENV || 'development';

    try {
      await connectToDatabase();
      const items = await Product.find(query).sort({ createdAt: -1 }).lean();
      return NextResponse.json(items, {
        status: 200,
        headers: { 'X-Database': 'mongodb' }
      });
    } catch (mongoError) {
      console.log('MongoDB not available:', mongoError);

      if (NODE_ENV === 'production') {
        return NextResponse.json(
          { message: 'Database connection failed', error: 'MongoDB unavailable' },
          { status: 503 }
        );
      }

      console.log('Using mock database for products');
      const mockItems = await MockProducts.find(query);
      const items = await mockItems.lean();
      return NextResponse.json(items, {
        status: 200,
        headers: { 'X-Database': 'mock' }
      });
    }
  } catch (error) {
    console.error('GET /api/products error', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// POST /api/products - create product
export async function POST(request: Request) {
  try {
    const ok = await requireAuth(request);
    if (!ok) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const productData = {
      name: body.name,
      nameEn: body.nameEn,
      description: body.description,
      descriptionEn: body.descriptionEn,
      imageUrl: body.imageUrl,
      price: body.price,
      category: body.category,
      categoryEn: body.categoryEn,
      tags: body.tags || [],
      published: Boolean(body.published),
      featured: Boolean(body.featured),
      stock: body.stock || 0,
    };

    const NODE_ENV = process.env.NODE_ENV || 'development';

    try {
      await connectToDatabase();
      const created = await Product.create(productData);
      return NextResponse.json(created, {
        status: 201,
        headers: { 'X-Database': 'mongodb' }
      });
    } catch (mongoError) {
      console.log('MongoDB not available:', mongoError);

      if (NODE_ENV === 'production') {
        return NextResponse.json(
          { message: 'Database connection failed', error: 'MongoDB unavailable' },
          { status: 503 }
        );
      }

      console.log('Using mock database for products');
      const created = await MockProducts.create(productData);
      return NextResponse.json(created, {
        status: 201,
        headers: { 'X-Database': 'mock' }
      });
    }
  } catch (error) {
    console.error('POST /api/products error', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
