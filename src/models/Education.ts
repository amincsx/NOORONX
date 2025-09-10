import mongoose, { Schema, model, models } from 'mongoose';

const EducationSchema = new Schema(
  {
    title: { type: String, required: true },
    titleEn: { type: String, required: true },
    description: { type: String, default: '' },
    descriptionEn: { type: String, default: '' },
    content: { type: String, required: true },
    contentEn: { type: String, required: true },
    imageUrl: { type: String },
    videoUrl: { type: String },
    duration: { type: String, default: '' },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    category: { type: String, default: '' },
    instructor: { type: String, default: '' },
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export type EducationDocument = mongoose.InferSchemaType<typeof EducationSchema> & {
  _id: mongoose.Types.ObjectId;
};

const Education = models.Education || model('Education', EducationSchema);
export default Education;


