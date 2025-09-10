# MongoDB Setup Guide for NOORONX

## Step 1: Create .env.local file

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and replace the MongoDB connection string with your Liara details:
   ```
   MONGODB_URI=mongodb://your-username:your-password@your-liara-host:port/your-database
   ```

   For Liara, your connection string should look like:
   ```
   MONGODB_URI=mongodb://root:your-password@your-app-name.iran.liara.ir:34467/your-database
   ```

## Step 2: Test the connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000/dashboard` and try adding a news item

3. Check your Liara MongoDB database to see if the data was saved

## Step 3: Deploy to production

When you deploy to Liara or any other platform, make sure to set the environment variables:

- `MONGODB_URI` - Your MongoDB connection string
- `ADMIN_SECRET` - A secure secret for admin authentication
- `NEXTAUTH_SECRET` - A secure secret for NextAuth

## Current Features

✅ **Already working:**
- News management (add, edit, delete, publish)
- Education content management
- Real-time dashboard updates
- MongoDB integration with Mongoose
- Responsive admin interface

✅ **Database operations:**
- All CRUD operations use MongoDB via API routes
- Data persists across sessions and devices
- Proper error handling and fallbacks

The dashboard will now work with your MongoDB database on Liara.it once you configure the environment variables!
