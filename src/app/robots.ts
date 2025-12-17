import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/api/',
          '/auth-debug/',
          '/login/',
          '/_next/',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/api/', 
          '/auth-debug/',
          '/login/',
        ],
      },
    ],
    sitemap: 'https://nooronx.com/sitemap.xml',
    host: 'https://nooronx.com',
  };
}