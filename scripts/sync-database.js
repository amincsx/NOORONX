const { connectToDatabase } = require('../src/lib/db');
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');

// Define schemas directly (since we can't import TypeScript models easily)
const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    titleEn: { type: String, required: true },
    content: { type: String, required: true },
    contentEn: { type: String, required: true },
    excerpt: { type: String, default: '' },
    excerptEn: { type: String, default: '' },
    imageUrl: { type: String },
    author: { type: String, default: 'مدیر سایت' },
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
    views: { type: Number, default: 0 },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const EducationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    titleEn: { type: String, required: true },
    description: { type: String, default: '' },
    descriptionEn: { type: String, default: '' },
    content: { type: String, required: true },
    contentEn: { type: String, required: true },
    imageUrl: { type: String },
    videoUrl: { type: String },
    duration: { type: String, default: '' },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    category: { type: String, default: '' },
    instructor: { type: String, default: '' },
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
    views: { type: Number, default: 0 },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

async function syncDatabaseToLocal() {
    console.log('🔄 Starting database to local sync...');

    try {
        // Connect to MongoDB
        console.log('📡 Connecting to MongoDB...');
        await connectToDatabase();
        console.log('✅ Connected to MongoDB successfully');

        // Get or create models
        const News = mongoose.models.News || mongoose.model('News', NewsSchema);
        const Education = mongoose.models.Education || mongoose.model('Education', EducationSchema);

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
        const localDB = {
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
        await fs.writeFile(dbPath, JSON.stringify(localDB, null, 2));

        console.log('✅ Sync completed successfully!');
        console.log(`📊 Synced ${newsItems.length} news items and ${educationItems.length} education items`);

        // Close the connection
        await mongoose.connection.close();

        return {
            success: true,
            newsCount: newsItems.length,
            educationCount: educationItems.length
        };

    } catch (error) {
        console.error('❌ Error during sync:', error);
        await mongoose.connection.close();
        throw error;
    }
}

// Run the sync if this script is executed directly
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

module.exports = { syncDatabaseToLocal };