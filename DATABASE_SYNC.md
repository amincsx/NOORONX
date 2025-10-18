# Database Synchronization Guide

This guide explains how to fetch data from your MongoDB database and update the local version (local-db.json) used for development and testing.

## Architecture Overview

Your NOORONX project uses a hybrid data storage approach:

- **Production/Live Data**: MongoDB database with News and Education collections
- **Development/Local Data**: JSON file (`local-db.json`) for offline development and testing
- **Fallback System**: The API routes automatically fall back to local data when MongoDB is unavailable

## Data Models

### News Model
```typescript
{
  title: string,           // Persian title
  titleEn: string,         // English title
  content: string,         // Persian content
  contentEn: string,       // English content
  excerpt: string,         // Persian excerpt
  excerptEn: string,       // English excerpt
  imageUrl: string,        // Image URL
  author: string,          // Author name
  published: boolean,      // Publication status
  featured: boolean,       // Featured status
  tags: string[],          // Tags array
  views: number,           // View count
  createdAt: Date,         // Creation date
  updatedAt: Date          // Last update date
}
```

### Education Model
```typescript
{
  title: string,           // Persian title
  titleEn: string,         // English title
  description: string,     // Persian description
  descriptionEn: string,   // English description
  content: string,         // Persian content
  contentEn: string,       // English content
  imageUrl: string,        // Image URL
  videoUrl: string,        // Video URL
  duration: string,        // Duration
  level: string,           // beginner|intermediate|advanced
  category: string,        // Category
  instructor: string,      // Instructor name
  published: boolean,      // Publication status
  featured: boolean,       // Featured status
  tags: string[],          // Tags array
  views: number,           // View count
  createdAt: Date,         // Creation date
  updatedAt: Date          // Last update date
}
```

## Synchronization Methods

### Method 1: API Endpoint (Recommended)

**Start the development server:**
```bash
npm run dev
```

**Sync all content (published and unpublished):**
```bash
# Using PowerShell
Invoke-WebRequest -Uri "http://localhost:3001/api/sync" -Method POST -ContentType "application/json"

# Using curl (if available)
curl -X POST http://localhost:3001/api/sync
```

**Sync only published content:**
```bash
# Using PowerShell
Invoke-WebRequest -Uri "http://localhost:3001/api/sync?published=true" -Method POST -ContentType "application/json"

# Using curl (if available)
curl -X POST "http://localhost:3001/api/sync?published=true"
```

### Method 2: Direct Script Execution

**Run the TypeScript sync script:**
```bash
npx tsx scripts/sync-database.ts
```

**Run the JavaScript sync script:**
```bash
node scripts/sync-database.js
```

**Update local database with sample data:**
```bash
node scripts/update-local-db.mjs
```

## Available Scripts

### 1. `scripts/sync-database.ts`
- TypeScript version of the sync script
- Connects directly to MongoDB
- Fetches all data and updates local-db.json
- Includes both all content and published-only functions

### 2. `scripts/sync-database.js`
- JavaScript version of the sync script
- Works with Node.js directly
- Same functionality as TypeScript version

### 3. `scripts/sync-via-api.js`
- Makes HTTP requests to the sync API endpoint
- Useful when the development server is running
- Handles authentication and error responses

### 4. `scripts/update-local-db.mjs`
- Adds sample data to local database
- Useful for testing and development
- Updates counters automatically

### 5. `src/app/api/sync/route.ts`
- API endpoint for synchronization
- Accessible at `/api/sync`
- Supports query parameters
- Requires authentication (disabled in development)

## Configuration

### Environment Variables

Create a `.env.local` file with your MongoDB connection:
```env
MONGODB_URI=mongodb://localhost:27017/nooronx-local
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nooronx
```

### Local Database Structure

The `local-db.json` file structure:
```json
{
  "news": [
    // Array of news items
  ],
  "education": [
    // Array of education items
  ],
  "_counters": {
    "news": 0,        // Count of news items
    "education": 0    // Count of education items
  }
}
```

## Usage Examples

### Fetch Latest Data from Production Database

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Open a new terminal and run sync:**
   ```bash
   Invoke-WebRequest -Uri "http://localhost:3001/api/sync" -Method POST -ContentType "application/json"
   ```

3. **Check the response for success confirmation**

4. **Verify the updated data:**
   ```bash
   # View the updated local database
   Get-Content local-db.json | ConvertFrom-Json | ConvertTo-Json -Depth 10
   ```

### Add Test Data for Development

1. **Run the sample data script:**
   ```bash
   node scripts/update-local-db.mjs
   ```

2. **This will add:**
   - A new sample news article
   - A new sample education tutorial
   - Updated counters

### Reset Local Database

To start with a clean local database:
```javascript
// You can modify scripts/update-local-db.mjs and call resetLocalDatabase()
import { resetLocalDatabase } from './scripts/update-local-db.mjs';
resetLocalDatabase();
```

## Troubleshooting

### Common Issues

1. **"Module not found" errors:**
   - Ensure you're in the project root directory
   - Install dependencies: `npm install`

2. **MongoDB connection errors:**
   - Check your `MONGODB_URI` in `.env.local`
   - Ensure MongoDB is running (if using local MongoDB)
   - Verify network connectivity (if using MongoDB Atlas)

3. **Port conflicts:**
   - The dev server uses port 3001 if 3000 is busy
   - Update API calls accordingly

4. **Authentication errors:**
   - Authentication is disabled in development mode
   - In production, you'll need valid credentials

### Verification Steps

After running sync, verify the data:

1. **Check file size:**
   ```bash
   Get-Item local-db.json | Select-Object Length
   ```

2. **Count items:**
   ```bash
   $data = Get-Content local-db.json | ConvertFrom-Json
   Write-Host "News items: $($data.news.Count)"
   Write-Host "Education items: $($data.education.Count)"
   ```

3. **View recent items:**
   ```bash
   $data = Get-Content local-db.json | ConvertFrom-Json
   $data.news | Select-Object -First 3 | Format-Table title, author, published
   ```

## Integration with Development Workflow

### Before Starting Development
```bash
# 1. Start the development server
npm run dev

# 2. Sync latest data (in new terminal)
Invoke-WebRequest -Uri "http://localhost:3001/api/sync" -Method POST -ContentType "application/json"

# 3. Begin development with fresh data
```

### Before Deployment
```bash
# Ensure local data is current for testing
npm run build
```

The build process will use the API routes, which automatically fall back to local data when needed.

## Notes

- The sync process preserves existing data structure
- All dates are stored in ISO string format
- The `_id` and `id` fields are synchronized for compatibility
- View counts are preserved during sync
- The local database serves as a reliable fallback when MongoDB is unavailable