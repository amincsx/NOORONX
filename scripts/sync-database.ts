import { connectToDatabase } from '@/lib/db';
import News from '@/models/News';
import Education from '@/models/Education';
import { writeFile } from 'fs/promises';
import path from 'path';

interface LocalDB {
  news: any[];
  education: any[];
  _counters: {
    news: number;
    education: number;
  };
}

/**
 * Synchronizes data from MongoDB to local-db.json
 * This script fetches all published news and education content from the database
 * and updates the local JSON file used for mock/offline development
 */
async function syncDatabaseToLocal() {
  console.log('🔄 Starting database to local sync...');
  
  try {
    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...');
    await connectToDatabase();
    console.log('✅ Connected to MongoDB successfully');

    // Fetch all news from database
    console.log('📰 Fetching news from database...');
    const newsItems = await News.find({}).sort({ createdAt: -1 }).lean();
    console.log(`📰 Found ${newsItems.length} news items`);

    // Fetch all education content from database
    console.log('🎓 Fetching education content from database...');
    const educationItems = await Education.find({}).sort({ createdAt: -1 }).lean();
    console.log(`🎓 Found ${educationItems.length} education items`);

    // Transform data to match local format
    const transformedNews = newsItems.map((item, index) => ({
      ...item,
      _id: item._id?.toString() || `local_news_${index + 1}`,
      id: item._id?.toString() || `local_news_${index + 1}`,
      createdAt: item.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: item.updatedAt?.toISOString() || new Date().toISOString(),
      views: item.views || 0
    }));

    const transformedEducation = educationItems.map((item, index) => ({
      ...item,
      _id: item._id?.toString() || `local_education_${index + 1}`,
      id: item._id?.toString() || `local_education_${index + 1}`,
      createdAt: item.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: item.updatedAt?.toISOString() || new Date().toISOString(),
      views: item.views || 0
    }));

    // Create local database structure
    const localDB: LocalDB = {
      news: transformedNews,
      education: transformedEducation,
      _counters: {
        news: newsItems.length,
        education: educationItems.length
      }
    };

    // Write to local-db.json
    const dbPath = path.join(process.cwd(), 'local-db.json');
    console.log('💾 Writing data to local-db.json...');
    await writeFile(dbPath, JSON.stringify(localDB, null, 2));

    console.log('✅ Sync completed successfully!');
    console.log(`📊 Synced ${newsItems.length} news items and ${educationItems.length} education items`);
    
    return {
      success: true,
      newsCount: newsItems.length,
      educationCount: educationItems.length
    };

  } catch (error) {
    console.error('❌ Error during sync:', error);
    throw error;
  }
}

/**
 * Sync only published content to local database
 */
async function syncPublishedContentToLocal() {
  console.log('🔄 Starting published content sync...');
  
  try {
    await connectToDatabase();
    console.log('✅ Connected to MongoDB successfully');

    // Fetch only published content
    const publishedNews = await News.find({ published: true }).sort({ createdAt: -1 }).lean();
    const publishedEducation = await Education.find({ published: true }).sort({ createdAt: -1 }).lean();

    console.log(`📰 Found ${publishedNews.length} published news items`);
    console.log(`🎓 Found ${publishedEducation.length} published education items`);

    // Transform and save similar to above
    const transformedNews = publishedNews.map((item, index) => ({
      ...item,
      _id: item._id?.toString() || `local_news_${index + 1}`,
      id: item._id?.toString() || `local_news_${index + 1}`,
      createdAt: item.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: item.updatedAt?.toISOString() || new Date().toISOString(),
      views: item.views || 0
    }));

    const transformedEducation = publishedEducation.map((item, index) => ({
      ...item,
      _id: item._id?.toString() || `local_education_${index + 1}`,
      id: item._id?.toString() || `local_education_${index + 1}`,
      createdAt: item.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: item.updatedAt?.toISOString() || new Date().toISOString(),
      views: item.views || 0
    }));

    const localDB: LocalDB = {
      news: transformedNews,
      education: transformedEducation,
      _counters: {
        news: publishedNews.length,
        education: publishedEducation.length
      }
    };

    const dbPath = path.join(process.cwd(), 'local-db.json');
    await writeFile(dbPath, JSON.stringify(localDB, null, 2));

    console.log('✅ Published content sync completed!');
    return {
      success: true,
      newsCount: publishedNews.length,
      educationCount: publishedEducation.length
    };

  } catch (error) {
    console.error('❌ Error during published content sync:', error);
    throw error;
  }
}

// Export functions for use in other scripts or API endpoints
export { syncDatabaseToLocal, syncPublishedContentToLocal };

// If this script is run directly, execute the sync
if (require.main === module) {
  syncDatabaseToLocal()
    .then((result) => {
      console.log('🎉 Database sync completed:', result);
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Database sync failed:', error);
      process.exit(1);
    });
}