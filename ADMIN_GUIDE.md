# NOORONX Admin Dashboard Guide

## Overview
The NOORONX Admin Dashboard is a comprehensive content management system for managing news and educational content on your solar energy website.

## Features

### 🎯 Dashboard Overview
- **Statistics**: View total news, education items, featured content, and page views
- **Recent Activity**: Quick preview of latest news and education content
- **Three Main Tabs**: Overview, News Management, Education Management

### 📰 News Management
- **Add News**: Create new news articles with bilingual support (Persian & English)
- **Edit News**: Modify existing news items
- **Delete News**: Remove unwanted content
- **Publish Control**: Toggle published/draft status
- **Featured Content**: Mark important news as featured
- **Rich Content**: Support for images, excerpts, author info, and tags

### 🎓 Education Management
- **Add Courses**: Create educational content with detailed information
- **Course Levels**: Beginner, Intermediate, Advanced
- **Media Support**: Images and video links
- **Instructor Info**: Track course instructors
- **Duration & Category**: Organize content by time and subject
- **Featured Courses**: Highlight important educational content

### 🌐 Bilingual Support
All content supports both Persian (فارسی) and English languages:
- Title & Title English
- Content & Content English
- Description & Description English
- Excerpt & Excerpt English

### 🏷️ Content Organization
- **Tags**: Add multiple tags to content for better organization
- **Categories**: Classify education content by subject
- **Status Control**: Published/Draft mode for content review
- **Featured Flag**: Highlight important content

## How to Use

### 1. Access the Dashboard
Navigate to `/dashboard` in your browser when the Next.js app is running.

### 2. Adding Content

#### Adding News:
1. Click the "News Management" tab
2. Click "افزودن خبر جدید" (Add New News)
3. Fill in the required fields:
   - Persian and English titles
   - Persian and English content
   - Optional: excerpt, image URL, author
   - Tags and status options
4. Click "ذخیره" (Save)

#### Adding Education Content:
1. Click the "Education Management" tab
2. Click "افزودن آموزش جدید" (Add New Education)
3. Fill in the required fields:
   - Persian and English titles
   - Persian and English content
   - Persian and English descriptions
   - Duration, level, category
   - Optional: video URL, instructor
   - Tags and status options
4. Click "ذخیره" (Save)

### 3. Managing Content
- **Edit**: Click the "ویرایش" (Edit) button on any content item
- **Delete**: Click the "حذف" (Delete) button and confirm
- **Toggle Published**: Click the eye icon to publish/unpublish
- **Toggle Featured**: Click the star icon to feature/unfeature

### 4. Viewing Public Content
- **News Page**: `/news` - Shows all published news articles
- **Education Page**: `/education` - Shows all published courses

## Data Storage
The system uses localStorage for data persistence during development. In production, you would typically integrate with a proper database system.

## Content Display
- **News**: Displayed as cards with image, title, excerpt, author, date, and tags
- **Education**: Displayed as course cards with level, duration, instructor, and category info
- **Responsive**: All content is mobile-friendly and responsive

## Features by Tab

### Overview Tab
- News statistics (total and published count)
- Education statistics (total and published count)
- Featured content count
- Sample visitor analytics
- Recent activity preview

### News Management Tab
- Complete CRUD operations for news articles
- Bulk status management
- Tag-based organization
- Author attribution
- Publication date tracking

### Education Management Tab
- Course creation and management
- Level-based organization (Beginner/Intermediate/Advanced)
- Duration and category tracking
- Instructor assignment
- Video content support

## Best Practices
1. Always fill in both Persian and English content for better accessibility
2. Use descriptive tags to improve content discoverability
3. Add relevant images to make content more engaging
4. Use the draft mode to review content before publishing
5. Regularly update featured content to keep the site fresh
6. Organize education content by proper levels and categories

## Technical Notes
- The system is built with Next.js 15, React 18, and TypeScript
- Uses Tailwind CSS for styling
- Implements responsive design patterns
- Supports both light and dark themes
- Uses Lucide React for consistent iconography
