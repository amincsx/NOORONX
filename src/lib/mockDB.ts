// Mock database for local testing
// This will simulate MongoDB operations using a JSON file

import { writeFile, readFile, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'local-db.json');

interface MockDB {
    news: any[];
    education: any[];
    products: any[];
    _counters: {
        news: number;
        education: number;
        products: number;
    };
}

class MockDatabase {
    private async ensureDBFile(): Promise<MockDB> {
        try {
            await access(DB_FILE, constants.F_OK);
            const content = await readFile(DB_FILE, 'utf-8');
            const db = JSON.parse(content);
            // Ensure products and its counter exist
            if (!db.products) db.products = [];
            if (!db._counters.products) db._counters.products = 0;
            return db;
        } catch {
            // File doesn't exist, create initial structure
            const initialDB: MockDB = {
                news: [],
                education: [],
                products: [],
                _counters: { news: 0, education: 0, products: 0 }
            };
            await writeFile(DB_FILE, JSON.stringify(initialDB, null, 2));
            return initialDB;
        }
    }

    private async saveDB(db: MockDB): Promise<void> {
        await writeFile(DB_FILE, JSON.stringify(db, null, 2));
    }

    async find(collection: 'news' | 'education' | 'products', query: any = {}): Promise<any[]> {
        const db = await this.ensureDBFile();
        let items = db[collection] || [];

        // Simple query filtering
        if (query.published !== undefined) {
            items = items.filter(item => item.published === query.published);
        }

        return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    async findById(collection: 'news' | 'education' | 'products', id: string): Promise<any | null> {
        const db = await this.ensureDBFile();
        const items = db[collection] || [];
        return items.find(item => item._id === id || item.id === id) || null;
    }

    async create(collection: 'news' | 'education' | 'products', data: any): Promise<any> {
        const db = await this.ensureDBFile();

        // Generate ID
        db._counters[collection]++;
        const id = `mock_${collection}_${db._counters[collection]}_${Date.now()}`;

        const newItem = {
            ...data,
            _id: id,
            id: id,
            views: data.views || 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        db[collection].push(newItem);
        await this.saveDB(db);

        return newItem;
    }

    async findByIdAndUpdate(collection: 'news' | 'education' | 'products', id: string, updateData: any): Promise<any | null> {
        const db = await this.ensureDBFile();
        const items = db[collection];
        const index = items.findIndex(item => item._id === id || item.id === id);

        if (index === -1) return null;

        let updated = { ...items[index] };

        // Handle MongoDB-style $inc operations
        if (updateData.$inc) {
            Object.keys(updateData.$inc).forEach(key => {
                updated[key] = (updated[key] || 0) + updateData.$inc[key];
            });
        }

        // Handle MongoDB-style $set operations
        if (updateData.$set) {
            updated = { ...updated, ...updateData.$set };
        }

        // Handle direct property updates (for backward compatibility)
        if (!updateData.$inc && !updateData.$set) {
            updated = { ...updated, ...updateData };
        }

        updated.updatedAt = new Date().toISOString();
        items[index] = updated;
        await this.saveDB(db);

        return updated;
    }

    async findByIdAndDelete(collection: 'news' | 'education' | 'products', id: string): Promise<any | null> {
        const db = await this.ensureDBFile();
        const items = db[collection];
        const index = items.findIndex(item => item._id === id || item.id === id);

        if (index === -1) return null;

        const deleted = items.splice(index, 1)[0];
        await this.saveDB(db);

        return deleted;
    }
}

export const mockDB = new MockDatabase();

// Mock Mongoose-like interface
export class MockModel {
    constructor(private collection: 'news' | 'education' | 'products') { }

    async find(query: any = {}) {
        const results = await mockDB.find(this.collection, query);
        return {
            sort: () => ({ lean: () => Promise.resolve(results) }),
            lean: () => Promise.resolve(results)
        };
    }

    async findById(id: string) {
        const result = await mockDB.findById(this.collection, id);
        return {
            lean: () => Promise.resolve(result)
        };
    }

    async create(data: any) {
        return mockDB.create(this.collection, data);
    }

    async findByIdAndUpdate(id: string, update: any, options: any = {}) {
        const result = await mockDB.findByIdAndUpdate(this.collection, id, update);
        return {
            lean: () => Promise.resolve(result)
        };
    }

    async findByIdAndDelete(id: string) {
        const result = await mockDB.findByIdAndDelete(this.collection, id);
        return {
            lean: () => Promise.resolve(result)
        };
    }
}

export const MockNews = new MockModel('news');
export const MockEducation = new MockModel('education');
export const MockProducts = new MockModel('products');
