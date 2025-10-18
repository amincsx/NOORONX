export interface NewsItem {
    id: string;
    _id?: string; // MongoDB ObjectId
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
    views?: number; // View count
}

export interface EducationItem {
    id: string;
    _id?: string; // MongoDB ObjectId
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
    views?: number; // View count
}

export interface ProductItem {
    id: string;
    _id?: string;
    name: string;
    nameEn: string;
    description: string;
    descriptionEn: string;
    price: number;
    category: string;
    categoryEn: string;
    imageUrl?: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
    published: boolean;
    featured: boolean;
    tags: string[];
}

export interface AdminFormData {
    title?: string;
    titleEn?: string;
    content?: string;
    contentEn?: string;
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
    name?: string;
    nameEn?: string;
    price?: number;
    stock?: number;
    published: boolean;
    featured: boolean;
    tags: string[];
}

export interface DesignConsultationItem {
    id: string;
    _id?: string;

    // Installation Location
    address: string;
    buildingType: string;
    ownership: string;

    // Installation Space
    installationType: string;
    area: string;
    roofDirection: string;
    roofAngle: string;
    obstacles?: string;
    roofMaterial: string;

    // Energy Consumption
    monthlyConsumption: string;
    consumptionCategory: string;
    solarGoal: string;
    residents: string;
    highConsumptionDevices: string[];

    // Financial
    budget: string;
    budgetCategory: string;
    financing: string;
    paybackPeriod: string;

    // Technical
    gridConnection: string;
    batteryStorage: string;
    systemType: string;

    // Contact
    fullName: string;
    phone: string;
    email: string;
    contactPreference: string;

    // Status and tracking
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
    priority: 'low' | 'medium' | 'high';
    notes?: string;
    assignedTo?: string;

    createdAt: Date;
    updatedAt: Date;
}
