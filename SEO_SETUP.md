# SEO Setup Instructions

## Files Created

### 1. `/sitemap.ts` - Dynamic Sitemap Generator
- Automatically includes all static pages (Persian & English)
- Dynamically includes published news articles
- Dynamically includes published education content  
- Dynamically includes all products
- Proper priority and frequency settings
- Fallback support for database connection issues

### 2. `/robots.ts` - Search Engine Instructions
- Allows indexing of public pages
- Blocks admin, API, and private areas
- Points to sitemap location
- Optimized for Google and other crawlers

### 3. Enhanced Layout Metadata
- Comprehensive Open Graph tags
- Twitter Card support
- Multilingual support (Persian/English)
- Proper canonical URLs
- Schema.org structured data

### 4. `/components/StructuredData.tsx`
- Organization schema markup
- Website schema markup  
- Breadcrumb navigation schema
- Rich snippets for search results

### 5. Enhanced `next.config.ts`
- Image optimization settings
- Security headers
- Caching strategies
- SEO-friendly redirects

## URLs Generated

### Static Pages:
- https://nooronx.liara.run/ (Priority: 1.0, Daily)
- https://nooronx.liara.run/about (Priority: 0.8, Weekly)
- https://nooronx.liara.run/contact (Priority: 0.8, Weekly)
- https://nooronx.liara.run/services/* (Priority: 0.8, Weekly)
- https://nooronx.liara.run/en/* (Priority: 0.6, Weekly)

### Dynamic Pages:
- https://nooronx.liara.run/news/[id] (Priority: 0.7, Weekly)
- https://nooronx.liara.run/education/[id] (Priority: 0.7, Weekly) 
- https://nooronx.liara.run/products/[id] (Priority: 0.6, Monthly)

## Google Search Console Setup

1. **Add Property**: Add `https://nooronx.liara.run` to Google Search Console
2. **Verify Ownership**: Use the verification code in layout metadata
3. **Submit Sitemap**: Submit `https://nooronx.liara.run/sitemap.xml`
4. **Monitor Indexing**: Check coverage and indexing status

## Additional SEO Recommendations

### 1. Create Social Media Images
- `/public/images/og-image.jpg` (1200x630px)
- `/public/images/twitter-image.jpg` (1200x628px)
- `/public/images/logo.png` (Company logo)

### 2. Update Verification Codes
Replace `'google-site-verification-code-here'` in layout.tsx with actual code from Google Search Console.

### 3. Social Media Links
Update social media URLs in StructuredData.tsx:
- Instagram: https://instagram.com/nooronx
- LinkedIn: https://linkedin.com/company/nooronx  
- Twitter: https://twitter.com/nooronx

### 4. Monitor Performance
- Google Search Console for indexing
- Google Analytics for traffic
- PageSpeed Insights for performance
- Core Web Vitals monitoring

## Testing

### Sitemap Test:
Visit `https://nooronx.liara.run/sitemap.xml`

### Robots Test:  
Visit `https://nooronx.liara.run/robots.txt`

### Rich Snippets Test:
Use Google's Rich Results Test tool with your pages.

### Mobile-Friendly Test:
Use Google's Mobile-Friendly Test tool.

## Expected Results

- **Better Search Rankings**: Improved visibility in search results
- **Rich Snippets**: Enhanced search result appearance  
- **Faster Indexing**: Quicker discovery of new content
- **Multilingual SEO**: Proper support for Persian and English
- **Local SEO**: Better visibility for Iranian solar energy searches

## Monitoring

After deployment, monitor:
- Google Search Console coverage reports
- Search query performance  
- Click-through rates
- Core Web Vitals scores
- Page loading speeds