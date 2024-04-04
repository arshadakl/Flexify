import mongoose, { Document, Schema } from 'mongoose';
import { ICategory, ISubcategory } from '../interfaces/adminInterface';



const categorySchema: Schema<ICategory> = new Schema({
  title: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now }
});


const subcategorySchema: Schema<ISubcategory> = new Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' }, 
  createdAt: { type: Date, default: Date.now }
});

const Category = mongoose.model<ICategory>('Category', categorySchema);


const Subcategory = mongoose.model<ISubcategory>('Subcategory', subcategorySchema);

export { Category, Subcategory };
