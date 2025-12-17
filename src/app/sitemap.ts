import { MetadataRoute } from 'next';
import { connectToDatabase } from '@/lib/db';
import News from '@/models/News';
import { EducationItem } from '@/types/admin';
import { dataStore } from '@/lib/dataStore';

const SITE_URL = 'https://nooronx.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages
    const staticPages = [
        // Main Persian pages
        '',
        '/about',
        '/contact',
        '/calculator',
        '/catalog',
        '/design',
        '/education',
        '/news',
        '/faq',
        '/privacy',
        '/terms',
        '/warranty',
        '/support',
        '/team',
        '/services/consultation',
        '/services/inspection',
        '/services/installation',
        '/services/maintenance',
        '/اخبار',
        '/اموزش',
        '/طراحی',

        // English pages
        '/en',
        '/en/about',
        '/en/contact',
        '/en/design',
        '/en/education',
        '/en/news',
        '/en/team',
        '/en/services/consultation',
        '/en/services/installation',
    ];

    const staticSitemapEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
        url: `${SITE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'daily' : 'weekly',
        priority: path === '' ? 1 : path.includes('/en/') ? 0.6 : 0.8,
    }));

    // Dynamic pages - News
    let newsSitemapEntries: MetadataRoute.Sitemap = [];
    try {
        await connectToDatabase();
        const publishedNews = await News.find({ published: true }).lean();
        newsSitemapEntries = publishedNews.map((newsItem) => ({
            url: `${SITE_URL}/news/${newsItem._id}`,
            lastModified: new Date(newsItem.updatedAt || newsItem.createdAt),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));

        // English news URLs
        const englishNewsSitemapEntries: MetadataRoute.Sitemap = publishedNews.map((newsItem) => ({
            url: `${SITE_URL}/en/news/${newsItem._id}`,
            lastModified: new Date(newsItem.updatedAt || newsItem.createdAt),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }));

        newsSitemapEntries = [...newsSitemapEntries, ...englishNewsSitemapEntries];
    } catch (error) {
        console.log('Using fallback for news sitemap due to DB error:', error);
        // Fallback to dataStore
        const fallbackNews = dataStore.getNews().filter(item => item.published);
        newsSitemapEntries = fallbackNews.map((newsItem) => ({
            url: `${SITE_URL}/news/${newsItem.id}`,
            lastModified: new Date(newsItem.updatedAt),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));
    }

    // Dynamic pages - Education  
    let educationSitemapEntries: MetadataRoute.Sitemap = [];
    try {
        const Education = (await import('@/models/Education')).default;
        const publishedEducation = await Education.find({ published: true }).lean();
        educationSitemapEntries = publishedEducation.map((eduItem: any) => ({
            url: `${SITE_URL}/education/${eduItem._id}`,
            lastModified: new Date(eduItem.updatedAt || eduItem.createdAt),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));

        // English education URLs
        const englishEducationSitemapEntries: MetadataRoute.Sitemap = publishedEducation.map((eduItem: any) => ({
            url: `${SITE_URL}/en/education/${eduItem._id}`,
            lastModified: new Date(eduItem.updatedAt || eduItem.createdAt),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }));

        educationSitemapEntries = [...educationSitemapEntries, ...englishEducationSitemapEntries];
    } catch (error) {
        console.log('Using fallback for education sitemap due to DB error:', error);
        // Fallback to dataStore
        const fallbackEducation = dataStore.getEducation().filter(item => item.published);
        educationSitemapEntries = fallbackEducation.map((eduItem) => ({
            url: `${SITE_URL}/education/${eduItem.id}`,
            lastModified: new Date(eduItem.updatedAt),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));
    }

    // Dynamic pages - Products
    let productsSitemapEntries: MetadataRoute.Sitemap = [];
    try {
        const Product = (await import('@/models/Product')).default;
        const allProducts = await Product.find({}).lean();
        productsSitemapEntries = allProducts.map((product: any) => ({
            url: `${SITE_URL}/products/${product._id}`,
            lastModified: new Date(product.updatedAt || product.createdAt),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }));

        // English product URLs
        const englishProductsSitemapEntries: MetadataRoute.Sitemap = allProducts.map((product: any) => ({
            url: `${SITE_URL}/en/products/${product._id}`,
            lastModified: new Date(product.updatedAt || product.createdAt),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        }));

        productsSitemapEntries = [...productsSitemapEntries, ...englishProductsSitemapEntries];
    } catch (error) {
        console.log('Using fallback for products sitemap due to DB error:', error);
        // Fallback to dataStore
        const fallbackProducts = dataStore.getProducts();
        productsSitemapEntries = fallbackProducts.map((product) => ({
            url: `${SITE_URL}/products/${product.id}`,
            lastModified: new Date(product.updatedAt),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }));
    }

    return [
        ...staticSitemapEntries,
        ...newsSitemapEntries,
        ...educationSitemapEntries,
        ...productsSitemapEntries,
    ];
}