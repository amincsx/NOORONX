import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export async function GET() {
  try {
    console.log('Testing database connection...');
    console.log('Environment check:');
    console.log('- MONGODB_URI exists:', !!process.env.MONGODB_URI);
    console.log('- MONGO_URL exists:', !!process.env.MONGO_URL);
    console.log('- NODE_ENV:', process.env.NODE_ENV);
    
    const uri = process.env.MONGODB_URI || process.env.MONGO_URL;
    if (!uri) {
      return NextResponse.json({ 
        status: 'error', 
        message: 'No MongoDB URI found in environment variables',
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
    
    // Hide credentials in log
    const safeUri = uri.replace(/\/\/.*:.*@/, '//***:***@');
    console.log('- Using URI:', safeUri);
    
    await connectToDatabase();
    console.log('Database connection test successful');
    return NextResponse.json({ 
      status: 'success', 
      message: 'Database connection successful',
      uri: safeUri,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database connection test failed:', error);
    return NextResponse.json({ 
      status: 'error', 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
