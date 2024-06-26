import { Schema,  model, Model } from 'mongoose';
import { IWork } from '../interfaces/freelancerInterface';

export const WorkSchema: Schema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref: 'Freelancer',
        required: true
    },
    title: {
      type: String,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: 'Subcategory',
      required: true
    },
    categoryNames:[String],
    tags: [String],
    image1: {
      type: String,
      required: true
    },
    image2: String,
    image3: String,
    deliveryPeriod: {
      type: Number,
      required: true
    },
    referenceMaterial: {
      type: Boolean,
      default: false
    },
    logo: {
      type: Boolean,
      default: false
    },
    description: String,
    questionnaire: [String],
    date: {
      type: Number,
      default: Date.now,
  },
    amount: {
      type: Number,
      required: true
    },
    isActive:{
        type: Boolean,
        required: true,
        default: true
    },
    ratings: [
      {
          user: {
              type: Schema.Types.ObjectId,
              ref: 'User'
          },
          value: {
              type: Number,
              required: true
          }
      }
  ],
  averageRating: {
      type: Number,
      default: 0
  }
  });
  

  const WorkModel: Model<IWork> = model<IWork>('WorkModel', WorkSchema);
  
  export { WorkModel };