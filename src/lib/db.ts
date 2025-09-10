import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URL || '';

if (!MONGODB_URI) {
  // We don't throw here to avoid crashing build, but log for visibility
  // API routes will still fail clearly if connection is missing.
  console.warn('MONGODB_URI is not set. Set it in .env.local');
}

interface GlobalWithMongoose {
  mongooseConn?: typeof mongoose;
  mongoosePromise?: Promise<typeof mongoose>;
}

const globalForMongoose = global as unknown as GlobalWithMongoose;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (globalForMongoose.mongooseConn) {
    return globalForMongoose.mongooseConn;
  }

  if (!globalForMongoose.mongoosePromise) {
    console.log('Attempting MongoDB connection with URI:', MONGODB_URI ? 'URI is set' : 'URI is missing');
    globalForMongoose.mongoosePromise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB || undefined,
    }).catch((error) => {
      console.error('MongoDB connection failed:', error);
      throw error;
    });
  }

  try {
    globalForMongoose.mongooseConn = await globalForMongoose.mongoosePromise;
    console.log('MongoDB connected successfully');
    return globalForMongoose.mongooseConn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Reset promise so next attempt can try again
    globalForMongoose.mongoosePromise = undefined;
    throw error;
  }
}


