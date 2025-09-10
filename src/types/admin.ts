export interface NewsItem {
    id: string;
    title: string;
    titleEn: string;
    content: string;
    contentEn: string;
    excerpt: string;
    excerptEn: string;
    imageUrl?: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
    published: boolean;
    featured: boolean;
    tags: string[];
}

export interface EducationItem {
    id: string;
    title: string;
    titleEn: string;
    description: string;
    descriptionEn: string;
    content: string;
    contentEn: string;
    imageUrl?: string;
    videoUrl?: string;
    duration: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    category: string;
    instructor: string;
    createdAt: Date;
    updatedAt: Date;
    published: boolean;
    featured: boolean;
    tags: string[];
}

export interface AdminFormData {
    title: string;
    titleEn: string;
    content: string;
    contentEn: string;
    excerpt?: string;
    excerptEn?: string;
    description?: string;
    descriptionEn?: string;
    imageUrl?: string;
    videoUrl?: string;
    duration?: string;
    level?: 'beginner' | 'intermediate' | 'advanced';
    category?: string;
    instructor?: string;
    author?: string;
    published: boolean;
    featured: boolean;
    tags: string[];
}
