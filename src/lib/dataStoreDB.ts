import { NewsItem, EducationItem, ProductItem } from '@/types/admin';

class DataStore {
    // News methods
    async getNews(): Promise<NewsItem[]> {
        try {
            const response = await fetch('/api/news?all=1');
            if (!response.ok) {
                throw new Error('Failed to fetch news');
            }
            const data = await response.json();
            return data.map((item: any) => ({
                ...item,
                id: item._id,
                createdAt: new Date(item.createdAt),
                updatedAt: new Date(item.updatedAt)
            }));
        } catch (error) {
            console.error('Error fetching news:', error);
            return [];
        }
    }

    async addNewsItem(item: Omit<NewsItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<NewsItem | null> {
        try {
            const response = await fetch('/api/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            });

            if (!response.ok) {
                throw new Error('Failed to create news item');
            }

            const data = await response.json();
            return {
                ...data,
                id: data._id,
                createdAt: new Date(data.createdAt),
                updatedAt: new Date(data.updatedAt)
            };
        } catch (error) {
            console.error('Error creating news item:', error);
            return null;
        }
    }

    async updateNewsItem(id: string, updates: Partial<NewsItem>): Promise<NewsItem | null> {
        try {
            const response = await fetch(`/api/news/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates)
            });

            if (!response.ok) {
                throw new Error('Failed to update news item');
            }

            const data = await response.json();
            return {
                ...data,
                id: data._id,
                createdAt: new Date(data.createdAt),
                updatedAt: new Date(data.updatedAt)
            };
        } catch (error) {
            console.error('Error updating news item:', error);
            return null;
        }
    }

    async deleteNewsItem(id: string): Promise<boolean> {
        try {
            const response = await fetch(`/api/news/${id}`, {
                method: 'DELETE'
            });

            return response.ok;
        } catch (error) {
            console.error('Error deleting news item:', error);
            return false;
        }
    }

    // Education methods
    async getEducation(): Promise<EducationItem[]> {
        try {
            const response = await fetch('/api/education?all=1');
            if (!response.ok) {
                throw new Error('Failed to fetch education');
            }
            const data = await response.json();
            return data.map((item: any) => ({
                ...item,
                id: item._id,
                createdAt: new Date(item.createdAt),
                updatedAt: new Date(item.updatedAt)
            }));
        } catch (error) {
            console.error('Error fetching education:', error);
            return [];
        }
    }

    async addEducationItem(item: Omit<EducationItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<EducationItem | null> {
        try {
            const response = await fetch('/api/education', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            });

            if (!response.ok) {
                throw new Error('Failed to create education item');
            }

            const data = await response.json();
            return {
                ...data,
                id: data._id,
                createdAt: new Date(data.createdAt),
                updatedAt: new Date(data.updatedAt)
            };
        } catch (error) {
            console.error('Error creating education item:', error);
            return null;
        }
    }

    async updateEducationItem(id: string, updates: Partial<EducationItem>): Promise<EducationItem | null> {
        try {
            const response = await fetch(`/api/education/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates)
            });

            if (!response.ok) {
                throw new Error('Failed to update education item');
            }

            const data = await response.json();
            return {
                ...data,
                id: data._id,
                createdAt: new Date(data.createdAt),
                updatedAt: new Date(data.updatedAt)
            };
        } catch (error) {
            console.error('Error updating education item:', error);
            return null;
        }
    }

    async deleteEducationItem(id: string): Promise<boolean> {
        try {
            const response = await fetch(`/api/education/${id}`, {
                method: 'DELETE'
            });

            return response.ok;
        } catch (error) {
            console.error('Error deleting education item:', error);
            return false;
        }
    }

    // Product methods
    async getProducts(): Promise<ProductItem[]> {
        try {
            const response = await fetch('/api/products?all=1');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            return data.map((item: any) => ({
                ...item,
                id: item._id,
                createdAt: new Date(item.createdAt),
                updatedAt: new Date(item.updatedAt)
            }));
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }

    async addProductItem(item: Omit<ProductItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductItem | null> {
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            });

            if (!response.ok) {
                throw new Error('Failed to create product item');
            }

            const data = await response.json();
            return {
                ...data,
                id: data._id,
                createdAt: new Date(data.createdAt),
                updatedAt: new Date(data.updatedAt)
            };
        } catch (error) {
            console.error('Error creating product item:', error);
            return null;
        }
    }

    async updateProductItem(id: string, updates: Partial<ProductItem>): Promise<ProductItem | null> {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates)
            });

            if (!response.ok) {
                throw new Error('Failed to update product item');
            }

            const data = await response.json();
            return {
                ...data,
                id: data._id,
                createdAt: new Date(data.createdAt),
                updatedAt: new Date(data.updatedAt)
            };
        } catch (error) {
            console.error('Error updating product item:', error);
            return null;
        }
    }

    async deleteProductItem(id: string): Promise<boolean> {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE'
            });

            return response.ok;
        } catch (error) {
            console.error('Error deleting product item:', error);
            return false;
        }
    }
}

export const dataStore = new DataStore();
