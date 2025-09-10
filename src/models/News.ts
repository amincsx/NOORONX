import mongoose, { Schema, model, models } from 'mongoose';

const NewsSchema = new Schema(
  {
    title: { type: String, required: true },
    titleEn: { type: String, required: true },
    content: { type: String, required: true },
    contentEn: { type: String, required: true },
    excerpt: { type: String, default: '' },
    excerptEn: { type: String, default: '' },
    imageUrl: { type: String },
    author: { type: String, default: 'مدیر سایت' },
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
    views: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export type NewsDocument = mongoose.InferSchemaType<typeof NewsSchema> & {
  _id: mongoose.Types.ObjectId;
};

const News = models.News || model('News', NewsSchema);
export default News;


