import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URL || '';
const NODE_ENV = process.env.NODE_ENV || 'development';

// Only log warnings, don't throw errors during module import
if (!MONGODB_URI) {
  if (NODE_ENV === 'production') {
    console.warn('Warning: MONGODB_URI not defined in production environment');
  } else {
    console.warn('MONGODB_URI is not set. Set it in .env.local');
  }
} else {
  console.log('MongoDB URI configured:', MONGODB_URI.replace(/\/\/.*:.*@/, '//***:***@')); // Hide credentials in logs
}

interface GlobalWithMongoose {
  mongooseConn?: typeof mongoose;
  mongoosePromise?: Promise<typeof mongoose>;
}

const globalForMongoose = global as unknown as GlobalWithMongoose;

let isMongoAvailable = true;

export async function connectToDatabase(): Promise<typeof mongoose> {
  // Check for MongoDB URI when actually connecting
  if (!MONGODB_URI) {
    if (NODE_ENV === 'production') {
      throw new Error('MONGODB_URI must be defined in production environment');
    }
    throw new Error('MongoDB URI is not configured');
  }

  // If we know MongoDB is not available in development, throw immediately
  if (!isMongoAvailable && NODE_ENV === 'development') {
    throw new Error('MongoDB not available - using mock database');
  }

  if (globalForMongoose.mongooseConn) {
    return globalForMongoose.mongooseConn;
  }

  if (!globalForMongoose.mongoosePromise) {
    console.log('Attempting MongoDB connection with URI:', MONGODB_URI ? 'URI is set' : 'URI is missing');

    const connectionOptions: any = {
      dbName: process.env.MONGODB_DB || undefined,
    };

    // Different timeout settings for development vs production
    if (NODE_ENV === 'development') {
      connectionOptions.serverSelectionTimeoutMS = 5000; // Fail fast for local testing
    } else {
      connectionOptions.serverSelectionTimeoutMS = 30000; // More patient in production
      connectionOptions.retryWrites = true;
      connectionOptions.w = 'majority';
    }

    globalForMongoose.mongoosePromise = mongoose.connect(MONGODB_URI, connectionOptions)
      .catch((error) => {
        console.error('MongoDB connection failed:', error);
        if (NODE_ENV === 'development') {
          isMongoAvailable = false;
        }
        throw error;
      });
  }

  try {
    globalForMongoose.mongooseConn = await globalForMongoose.mongoosePromise;
    console.log('MongoDB connected successfully');
    isMongoAvailable = true;
    return globalForMongoose.mongooseConn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Reset promise so next attempt can try again
    globalForMongoose.mongoosePromise = undefined;

    if (NODE_ENV === 'development') {
      isMongoAvailable = false;
    }

    throw error;
  }
}

export function isMongoDBAvailable(): boolean {
  return isMongoAvailable;
}


