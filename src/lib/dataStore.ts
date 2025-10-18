import { NewsItem, EducationItem, ProductItem } from '@/types/admin';

// Mock data for development
const mockNewsData: NewsItem[] = [
    {
        id: '1',
        title: 'راه‌اندازی بزرگترین نیروگاه خورشیدی ایران',
        titleEn: 'Launch of Iran\'s Largest Solar Power Plant',
        content: 'این نیروگاه با ظرفیت ۱۰۰ مگاوات در استان یزد راه‌اندازی شد...',
        contentEn: 'This power plant with a capacity of 100 MW was launched in Yazd province...',
        excerpt: 'نیروگاه خورشیدی جدید در یزد با ظرفیت ۱۰۰ مگاوات',
        excerptEn: 'New solar power plant in Yazd with 100 MW capacity',
        author: 'مدیر سایت',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        published: true,
        featured: true,
        tags: ['نیروگاه خورشیدی', 'یزد', 'انرژی تجدیدپذیر'],
        views: 245
    },
    {
        id: '2',
        title: 'تکنولوژی‌های جدید پنل‌های خورشیدی',
        titleEn: 'New Solar Panel Technologies',
        content: 'بررسی جدیدترین فناوری‌ها در صنعت پنل‌های خورشیدی...',
        contentEn: 'Review of the latest technologies in the solar panel industry...',
        excerpt: 'نگاهی به آخرین پیشرفت‌ها در فناوری پنل‌های خورشیدی',
        excerptEn: 'A look at the latest advances in solar panel technology',
        author: 'تیم فنی',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-10'),
        published: true,
        featured: false,
        tags: ['فناوری', 'پنل خورشیدی', 'نوآوری'],
        views: 132
    }
];

const mockEducationData: EducationItem[] = [
    {
        id: '1',
        title: 'مبانی انرژی خورشیدی',
        titleEn: 'Solar Energy Fundamentals',
        description: 'آشنایی با اصول اولیه انرژی خورشیدی',
        descriptionEn: 'Introduction to solar energy basics',
        content: 'در این دوره با اصول اولیه انرژی خورشیدی آشنا می‌شوید...',
        contentEn: 'In this course, you will learn the basics of solar energy...',
        duration: '8 ساعت',
        level: 'beginner',
        category: 'مبانی',
        instructor: 'مهندس احمدی',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        published: true,
        featured: true,
        tags: ['مبانی', 'انرژی خورشیدی', 'مقدماتی'],
        views: 89
    }
];

const mockProductData: ProductItem[] = [
    {
        id: '1',
        name: 'پنل خورشیدی 550 وات',
        nameEn: '550W Solar Panel',
        description: 'پنل خورشیدی مونوکریستال با بازدهی بالا.',
        descriptionEn: 'High-efficiency monocrystalline solar panel.',
        price: 5000000,
        category: 'پنل‌ها',
        categoryEn: 'Panels',
        stock: 100,
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01'),
        published: true,
        featured: true,
        tags: ['پنل', '550 وات', 'مونوکریستال']
    }
];

class DataStore {
    private newsKey = 'nooronx_news';
    private educationKey = 'nooronx_education';
    private productsKey = 'nooronx_products';

    // News methods
    getNews(): NewsItem[] {
        if (typeof window === 'undefined') return mockNewsData;

        const stored = localStorage.getItem(this.newsKey);
        return stored ? JSON.parse(stored) : mockNewsData;
    }

    saveNews(news: NewsItem[]): void {
        if (typeof window === 'undefined') return;

        localStorage.setItem(this.newsKey, JSON.stringify(news));
    }

    addNewsItem(item: Omit<NewsItem, 'id' | 'createdAt' | 'updatedAt'>): NewsItem {
        const news = this.getNews();
        const newItem: NewsItem = {
            ...item,
            id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date(),
            views: 0
        };

        news.unshift(newItem);
        this.saveNews(news);
        return newItem;
    }

    updateNewsItem(id: string, updates: Partial<NewsItem>): NewsItem | null {
        const news = this.getNews();
        const index = news.findIndex(item => item.id === id);

        if (index === -1) return null;

        news[index] = {
            ...news[index],
            ...updates,
            updatedAt: new Date()
        };

        this.saveNews(news);
        return news[index];
    }

    deleteNewsItem(id: string): boolean {
        const news = this.getNews();
        const filtered = news.filter(item => item.id !== id);

        if (filtered.length === news.length) return false;

        this.saveNews(filtered);
        return true;
    }

    // Education methods
    getEducation(): EducationItem[] {
        if (typeof window === 'undefined') return mockEducationData;

        const stored = localStorage.getItem(this.educationKey);
        return stored ? JSON.parse(stored) : mockEducationData;
    }

    saveEducation(education: EducationItem[]): void {
        if (typeof window === 'undefined') return;

        localStorage.setItem(this.educationKey, JSON.stringify(education));
    }

    addEducationItem(item: Omit<EducationItem, 'id' | 'createdAt' | 'updatedAt'>): EducationItem {
        const education = this.getEducation();
        const newItem: EducationItem = {
            ...item,
            id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date(),
            views: 0
        };

        education.unshift(newItem);
        this.saveEducation(education);
        return newItem;
    }

    updateEducationItem(id: string, updates: Partial<EducationItem>): EducationItem | null {
        const education = this.getEducation();
        const index = education.findIndex(item => item.id === id);

        if (index === -1) return null;

        education[index] = {
            ...education[index],
            ...updates,
            updatedAt: new Date()
        };

        this.saveEducation(education);
        return education[index];
    }

    deleteEducationItem(id: string): boolean {
        let education = this.getEducation();
        const initialLength = education.length;
        education = education.filter(item => item.id !== id);

        if (education.length < initialLength) {
            this.saveEducation(education);
            return true;
        }
        return false;
    }

    // Product methods
    getProducts(): ProductItem[] {
        if (typeof window === 'undefined') return mockProductData;

        const stored = localStorage.getItem(this.productsKey);
        return stored ? JSON.parse(stored) : mockProductData;
    }

    saveProducts(products: ProductItem[]): void {
        if (typeof window === 'undefined') return;

        localStorage.setItem(this.productsKey, JSON.stringify(products));
    }

    addProductItem(item: Omit<ProductItem, 'id' | 'createdAt' | 'updatedAt'>): ProductItem {
        const products = this.getProducts();
        const newItem: ProductItem = {
            ...item,
            id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        products.unshift(newItem);
        this.saveProducts(products);
        return newItem;
    }

    updateProductItem(id: string, updates: Partial<ProductItem>): ProductItem | null {
        const products = this.getProducts();
        const index = products.findIndex(item => item.id === id);

        if (index === -1) return null;

        products[index] = {
            ...products[index],
            ...updates,
            updatedAt: new Date()
        };

        this.saveProducts(products);
        return products[index];
    }

    deleteProductItem(id: string): boolean {
        let products = this.getProducts();
        const initialLength = products.length;
        products = products.filter(item => item.id !== id);

        if (products.length < initialLength) {
            this.saveProducts(products);
            return true;
        }
        return false;
    }
}

export const dataStore = new DataStore();
