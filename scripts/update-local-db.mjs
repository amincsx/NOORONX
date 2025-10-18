import { readFile, writeFile } from 'fs/promises';
import path from 'path';

/**
 * Sample data sync - This demonstrates how to update local-db.json with fresh data
 * In a real scenario, you would fetch this data from your MongoDB database
 */
async function updateLocalDatabase() {
    console.log('🔄 Starting local database update...');

    try {
        const dbPath = path.join(process.cwd(), 'local-db.json');

        // Read current local database
        console.log('📖 Reading current local database...');
        const currentDataStr = await readFile(dbPath, 'utf-8');
        const currentData = JSON.parse(currentDataStr);

        console.log(`📊 Current data: ${currentData.news.length} news, ${currentData.education.length} education items`);

        // For demonstration, let's add some sample data or fetch from your actual database
        // In production, you would replace this with actual database fetching code

        // Example: Add a new sample news item
        const newNewsItem = {
            title: `جدیدترین اخبار - ${new Date().toLocaleDateString('fa-IR')}`,
            titleEn: `Latest News - ${new Date().toLocaleDateString('en-US')}`,
            content: 'محتوای کاملی از آخرین اخبار و تطورات در زمینه انرژی خورشیدی و نورونکس',
            contentEn: 'Complete content about the latest news and developments in solar energy and NOORONX',
            excerpt: 'خلاصه‌ای از آخرین اخبار',
            excerptEn: 'Summary of the latest news',
            imageUrl: '/images/news/latest.jpg',
            author: 'تیم نورونکس',
            published: true,
            featured: true,
            tags: ['solar', 'energy', 'news'],
            views: 0,
            _id: `sync_news_${Date.now()}`,
            id: `sync_news_${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Add the new item if it doesn't already exist (check by title)
        const existingNews = currentData.news.find(item => item.title === newNewsItem.title);
        if (!existingNews) {
            currentData.news.unshift(newNewsItem); // Add to beginning
            currentData._counters.news++;
            console.log('➕ Added new sample news item');
        } else {
            console.log('ℹ️  Sample news item already exists');
        }

        // Example: Add a new sample education item
        const newEducationItem = {
            title: `آموزش جدید - ${new Date().toLocaleDateString('fa-IR')}`,
            titleEn: `New Tutorial - ${new Date().toLocaleDateString('en-US')}`,
            description: 'توضیحات کوتاه درباره آموزش',
            descriptionEn: 'Short description about the tutorial',
            content: 'محتوای کاملی درباره نصب و راه‌اندازی سیستم‌های خورشیدی',
            contentEn: 'Complete content about installing and setting up solar systems',
            imageUrl: '/images/education/tutorial.jpg',
            videoUrl: '/videos/tutorial.mp4',
            duration: '15 minutes',
            level: 'beginner',
            category: 'Installation',
            instructor: 'تیم نورونکس',
            published: true,
            featured: false,
            tags: ['installation', 'tutorial', 'solar'],
            views: 0,
            _id: `sync_education_${Date.now()}`,
            id: `sync_education_${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Add the new education item if it doesn't already exist
        const existingEducation = currentData.education.find(item => item.title === newEducationItem.title);
        if (!existingEducation) {
            currentData.education.unshift(newEducationItem); // Add to beginning
            currentData._counters.education++;
            console.log('➕ Added new sample education item');
        } else {
            console.log('ℹ️  Sample education item already exists');
        }

        // Write updated data back to file
        console.log('💾 Writing updated data to local-db.json...');
        await writeFile(dbPath, JSON.stringify(currentData, null, 2));

        console.log('✅ Local database update completed!');
        console.log(`📊 Final data: ${currentData.news.length} news, ${currentData.education.length} education items`);

        return {
            success: true,
            newsCount: currentData.news.length,
            educationCount: currentData.education.length
        };

    } catch (error) {
        console.error('❌ Error updating local database:', error);
        throw error;
    }
}

/**
 * Reset local database to minimal state (for testing)
 */
async function resetLocalDatabase() {
    console.log('🔄 Resetting local database...');

    const dbPath = path.join(process.cwd(), 'local-db.json');

    const resetData = {
        news: [],
        education: [],
        _counters: {
            news: 0,
            education: 0
        }
    };

    await writeFile(dbPath, JSON.stringify(resetData, null, 2));
    console.log('✅ Local database reset completed');
}

export { updateLocalDatabase, resetLocalDatabase };

// If running directly
if (import.meta.url === `file://${process.argv[1]}`) {
    updateLocalDatabase()
        .then((result) => {
            console.log('🎉 Update process completed:', result);
        })
        .catch((error) => {
            console.error('💥 Update process failed:', error);
            process.exit(1);
        });
}