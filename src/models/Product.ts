import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    nameEn: { type: String, required: true },
    description: { type: String, required: true },
    descriptionEn: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    categoryEn: { type: String, required: true },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    stock: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export type ProductDocument = mongoose.InferSchemaType<typeof ProductSchema> & {
  _id: mongoose.Types.ObjectId;
};

const Product = models.Product || model('Product', ProductSchema);
export default Product;
