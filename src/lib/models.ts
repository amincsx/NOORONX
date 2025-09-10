import mongoose, { Schema, Document } from 'mongoose';

// News Item Interface
export interface INewsItem extends Document {
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  excerpt: string;
  excerptEn: string;
  author: string;
  published: boolean;
  featured: boolean;
  tags: string[];
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Education Item Interface
export interface IEducationItem extends Document {
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  excerpt: string;
  excerptEn: string;
  duration: string;
  level: string;
  instructor: string;
  published: boolean;
  featured: boolean;
  tags: string[];
  imageUrl?: string;
  videoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// News Schema
const NewsSchema: Schema = new Schema({
  title: { type: String, required: true },
  titleEn: { type: String, required: true },
  content: { type: String, required: true },
  contentEn: { type: String, required: true },
  excerpt: { type: String, required: true },
  excerptEn: { type: String, required: true },
  author: { type: String, required: true },
  published: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  tags: [{ type: String }],
  imageUrl: { type: String }
}, {
  timestamps: true
});

// Education Schema
const EducationSchema: Schema = new Schema({
  title: { type: String, required: true },
  titleEn: { type: String, required: true },
  content: { type: String, required: true },
  contentEn: { type: String, required: true },
  excerpt: { type: String, required: true },
  excerptEn: { type: String, required: true },
  duration: { type: String, required: true },
  level: { type: String, required: true },
  instructor: { type: String, required: true },
  published: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  tags: [{ type: String }],
  imageUrl: { type: String },
  videoUrl: { type: String }
}, {
  timestamps: true
});

// Create models (handle re-compilation in development)
export const NewsModel = mongoose.models.News || mongoose.model<INewsItem>('News', NewsSchema);
export const EducationModel = mongoose.models.Education || mongoose.model<IEducationItem>('Education', EducationSchema);
