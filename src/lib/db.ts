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
    globalForMongoose.mongoosePromise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB || undefined,
    });
  }

  globalForMongoose.mongooseConn = await globalForMongoose.mongoosePromise;
  return globalForMongoose.mongooseConn;
}


