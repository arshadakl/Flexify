import { Document, Schema } from 'mongoose';

export interface AdminInter {
    _id?: string;
    adminId: string;
    password: string ;
}

export interface ICategory extends Document {
    _id: string;
    title: string;
    description?: string;
    createdAt: Date;
  }
  

  export interface ISubcategory extends Document {
    _id?: string;
    name: string;
    description?: string;
    category: Schema.Types.ObjectId; 
    createdAt: Date;
  }