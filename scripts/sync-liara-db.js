// Simple sync script that works with the Liara MongoDB
const fs = require('fs').promises;
const path = require('path');

// Simple fetch function for making API calls
async function syncDataFromAPI() {
  console.log('🔄 Starting data sync from API...');
  
  try {
    // Check if we're in a Next.js environment by trying to start the dev server first
    console.log('📡 Attempting to fetch data from API endpoints...');
    
    // We'll use the existing API routes that are already configured
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);
    
    // Check if Next.js server is running by trying to make a request
    const http = require('http');
    
    const makeRequest = (path) => {
      return new Promise((resolve, reject) => {
        const options = {
          hostname: 'localhost',
          port: 3001, // or 3000
          path: path,
          method: 'GET',
          timeout: 5000
        };
        
        const req = http.request(options, (res) => {
          let data = '';
          res.on('data', (chunk) => data += chunk);
          res.on('end', () => {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              resolve(data);
            }
          });
        });
        
        req.on('error', reject);
        req.on('timeout', () => {
          req.destroy();
          reject(new Error('Request timeout'));
        });
        req.setTimeout(5000);
        req.end();
      });
    };
    
    // Try to fetch data from API endpoints
    let newsData = [];
    let educationData = [];
    
    try {
      console.log('📰 Fetching news data...');
      newsData = await makeRequest('/api/news?all=1');
      console.log(`✅ Retrieved ${Array.isArray(newsData) ? newsData.length : 0} news items`);
    } catch (error) {
      console.log('⚠️  Could not fetch news data from API:', error.message);
    }
    
    try {
      console.log('🎓 Fetching education data...');
      educationData = await makeRequest('/api/education?all=1');
      console.log(`✅ Retrieved ${Array.isArray(educationData) ? educationData.length : 0} education items`);
    } catch (error) {
      console.log('⚠️  Could not fetch education data from API:', error.message);
    }
    
    // If we got data, update the local database
    if (Array.isArray(newsData) || Array.isArray(educationData)) {
      const localDB = {
        news: Array.isArray(newsData) ? newsData.map(item => ({
          ...item,
          _id: item._id?.toString() || item.id,
          id: item._id?.toString() || item.id,
          createdAt: item.createdAt || new Date().toISOString(),
          updatedAt: item.updatedAt || new Date().toISOString(),
          views: item.views || 0
        })) : [],
        education: Array.isArray(educationData) ? educationData.map(item => ({
          ...item,
          _id: item._id?.toString() || item.id,
          id: item._id?.toString() || item.id,
          createdAt: item.createdAt || new Date().toISOString(),
          updatedAt: item.updatedAt || new Date().toISOString(),
          views: item.views || 0
        })) : [],
        _counters: {
          news: Array.isArray(newsData) ? newsData.length : 0,
          education: Array.isArray(educationData) ? educationData.length : 0
        }
      };
      
      // Write to local-db.json
      const dbPath = path.join(process.cwd(), 'local-db.json');
      await fs.writeFile(dbPath, JSON.stringify(localDB, null, 2));
      
      console.log('✅ Successfully updated local-db.json');
      console.log(`📊 Final counts: ${localDB.news.length} news, ${localDB.education.length} education items`);
      
      return {
        success: true,
        newsCount: localDB.news.length,
        educationCount: localDB.education.length
      };
    } else {
      console.log('❌ No valid data received from API endpoints');
      return { success: false, message: 'No data received' };
    }
    
  } catch (error) {
    console.error('❌ Error during sync:', error);
    return { success: false, error: error.message };
  }
}

// Alternative: Direct MongoDB connection
async function syncDataFromMongoDB() {
  console.log('🔄 Starting direct MongoDB sync...');
  
  try {
    // Try to use mongoose if available
    const mongoose = require('mongoose');
    
    // Load environment variables
    require('dotenv').config({ path: '.env.local' });
    
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Define schemas
    const newsSchema = new mongoose.Schema({}, { strict: false, collection: 'news' });
    const educationSchema = new mongoose.Schema({}, { strict: false, collection: 'educations' });
    
    const News = mongoose.models.News || mongoose.model('News', newsSchema);
    const Education = mongoose.models.Education || mongoose.model('Education', educationSchema);
    
    // Fetch data
    console.log('📰 Fetching news from MongoDB...');
    const newsData = await News.find({}).lean();
    console.log(`✅ Found ${newsData.length} news items`);
    
    console.log('🎓 Fetching education from MongoDB...');
    const educationData = await Education.find({}).lean();
    console.log(`✅ Found ${educationData.length} education items`);
    
    // Transform and save
    const localDB = {
      news: newsData.map(item => ({
        ...item,
        _id: item._id?.toString(),
        id: item._id?.toString(),
        createdAt: item.createdAt?.toISOString() || new Date().toISOString(),
        updatedAt: item.updatedAt?.toISOString() || new Date().toISOString(),
        views: item.views || 0
      })),
      education: educationData.map(item => ({
        ...item,
        _id: item._id?.toString(),
        id: item._id?.toString(),
        createdAt: item.createdAt?.toISOString() || new Date().toISOString(),
        updatedAt: item.updatedAt?.toISOString() || new Date().toISOString(),
        views: item.views || 0
      })),
      _counters: {
        news: newsData.length,
        education: educationData.length
      }
    };
    
    const dbPath = path.join(process.cwd(), 'local-db.json');
    await fs.writeFile(dbPath, JSON.stringify(localDB, null, 2));
    
    console.log('✅ Successfully synced from MongoDB');
    console.log(`📊 Synced ${newsData.length} news and ${educationData.length} education items`);
    
    await mongoose.connection.close();
    
    return {
      success: true,
      newsCount: newsData.length,
      educationCount: educationData.length
    };
    
  } catch (error) {
    console.error('❌ MongoDB sync failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Main sync function
async function main() {
  console.log('🚀 Starting NOORONX database sync...');
  
  // Try MongoDB first, then fall back to API
  let result = await syncDataFromMongoDB();
  
  if (!result.success) {
    console.log('🔄 MongoDB sync failed, trying API method...');
    result = await syncDataFromAPI();
  }
  
  if (result.success) {
    console.log('🎉 Sync completed successfully!');
    console.log(`📊 Result: ${result.newsCount} news, ${result.educationCount} education items`);
  } else {
    console.log('💥 All sync methods failed');
    console.log('📝 Make sure:');
    console.log('   1. MongoDB URI is correct in .env.local');
    console.log('   2. Network connection is available');
    console.log('   3. Next.js server is running (npm run dev)');
  }
  
  return result;
}

// Run if this script is executed directly
if (require.main === module) {
  main()
    .then((result) => {
      process.exit(result.success ? 0 : 1);
    })
    .catch((error) => {
      console.error('💥 Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { main, syncDataFromMongoDB, syncDataFromAPI };