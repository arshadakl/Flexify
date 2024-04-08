
import { Document, Schema, Model, model } from 'mongoose';

export interface IWork extends Document {
    title: string;
    category: Schema.Types.ObjectId;
    subcategory: Schema.Types.ObjectId;
    categoryNames:string[];
    tags: string[];
    image1: string;
    image2?: string;
    deliveryPeriod: number;
    image3?: string;
    referenceMaterial: boolean;
    logo: boolean;
    description?: string;
    questionnaire: string[];
    amount: number;
    isActive: boolean;
  }