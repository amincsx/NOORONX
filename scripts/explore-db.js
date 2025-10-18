// Database explorer script to see what collections and data exist
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function exploreDatabase() {
  console.log('🔍 Exploring database contents...');
  
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected successfully');
    
    // List all collections
    console.log('\n📂 Available collections:');
    const collections = await mongoose.connection.db.listCollections().toArray();
    collections.forEach((collection, index) => {
      console.log(`${index + 1}. ${collection.name}`);
    });
    
    if (collections.length === 0) {
      console.log('   No collections found - database is empty');
    }
    
    // Check each collection for data
    for (const collection of collections) {
      console.log(`\n🔍 Checking collection "${collection.name}":`);
      const count = await mongoose.connection.db.collection(collection.name).countDocuments();
      console.log(`   Documents: ${count}`);
      
      if (count > 0 && count <= 5) {
        // Show sample documents if there are few items
        const samples = await mongoose.connection.db.collection(collection.name).find({}).limit(2).toArray();
        console.log('   Sample documents:');
        samples.forEach((doc, i) => {
          console.log(`     ${i + 1}. ID: ${doc._id}, Keys: ${Object.keys(doc).slice(0, 5).join(', ')}`);
        });
      }
    }
    
    // Specifically check for news and education collections
    console.log('\n📰 Checking news collections:');
    const newsCollections = ['news', 'News', 'articles', 'posts'];
    for (const name of newsCollections) {
      try {
        const count = await mongoose.connection.db.collection(name).countDocuments();
        if (count > 0) {
          console.log(`   ✅ Found ${count} items in "${name}" collection`);
        }
      } catch (error) {
        // Collection doesn't exist
      }
    }
    
    console.log('\n🎓 Checking education collections:');
    const educationCollections = ['education', 'Education', 'educations', 'courses', 'tutorials'];
    for (const name of educationCollections) {
      try {
        const count = await mongoose.connection.db.collection(name).countDocuments();
        if (count > 0) {
          console.log(`   ✅ Found ${count} items in "${name}" collection`);
        }
      } catch (error) {
        // Collection doesn't exist
      }
    }
    
    await mongoose.connection.close();
    console.log('\n✅ Database exploration completed');
    
  } catch (error) {
    console.error('❌ Error exploring database:', error.message);
  }
}

exploreDatabase();