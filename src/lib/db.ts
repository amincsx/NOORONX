import mongoose from 'mongoose';

// Try multiple environment variable names in order of preference
const getMongoDBURI = () => {
  const uriOptions = [
    process.env.MONGODB_URI,
    process.env.MONGO_URL,
    process.env.MONGODB_URI_LIARA,
    process.env.MONGODB_URI_ALT1,
    process.env.MONGODB_URI_ALT2
  ];

  for (const uri of uriOptions) {
    if (uri && uri.trim()) {
      return uri.trim();
    }
  }
  return '';
};

const MONGODB_URI = getMongoDBURI();
const NODE_ENV = process.env.NODE_ENV || 'development';

// Log available environment variables for debugging
console.log('Available environment variables:');
console.log('- MONGODB_URI:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
console.log('- MONGO_URL:', process.env.MONGO_URL ? 'SET' : 'NOT SET');
console.log('- MONGODB_URI_LIARA:', process.env.MONGODB_URI_LIARA ? 'SET' : 'NOT SET');
console.log('- NODE_ENV:', NODE_ENV);

// Only log warnings, don't throw errors during module import
if (!MONGODB_URI) {
  const message = `No MongoDB URI found in environment variables - ${MONGODB_URI}`;
  if (NODE_ENV === 'production') {
    console.error('❌ Production Error:', message);
  } else {
    console.warn('⚠️ Development Warning:', message);
  }
} else {
  console.log('✅ MongoDB URI configured:', MONGODB_URI.replace(/\/\/.*:.*@/, '//***:***@')); // Hide credentials in logs
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
    const availableVars = Object.keys(process.env)
      .filter(key => key.toLowerCase().includes('mongo'))
      .map(key => `${key}=${process.env[key] ? 'SET' : 'NOT SET'}`)
      .join(', ');

    const errorMessage = `❌ خطای اتصال: No MongoDB URI found in environment variables - ${MONGODB_URI}
Available MongoDB-related vars: ${availableVars}
Please set MONGODB_URI in your environment variables.`;

    if (NODE_ENV === 'production') {
      throw new Error(errorMessage);
    }
    throw new Error(`MongoDB URI is not configured. ${errorMessage}`);
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


