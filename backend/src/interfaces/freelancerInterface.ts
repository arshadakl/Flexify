
import mongoose, { Document, Schema, Model, model } from 'mongoose';
export interface IWork extends Document {
  title: string;
  category: Schema.Types.ObjectId;
  subcategory: Schema.Types.ObjectId;
  categoryNames: string[];
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
  date?:number
  user: string;
  ratings?: {
    user: Schema.Types.ObjectId | string;
    value: number;
  }[];
  averageRating?: number;
}


export interface SingleWorkDetails {
  _id: mongoose.Types.ObjectId;
  title: string;
  category: mongoose.Types.ObjectId;
  subcategory: mongoose.Types.ObjectId;
  categoryNames: string[];
  tags: string[];
  image1: string;
  image2?: string;
  image3?: string;
  deliveryPeriod: number;
  referenceMaterial: boolean;
  logo: boolean;
  description?: string;
  questionnaire: string[];
  amount: number;
  isActive: boolean;
  user: {
    username: string;
    email: string;
    profile: string;
    firstName: string;
    lastName: string;
    country: string;
    language: string;
    skills: string[];
    bio: string;
  };
  categoryTitle: string;
  subcategoryName: string;
}


export interface MyError {
  message: string;
}



export interface DailyData {
  day: string;
  orderCount: number;
  totalAmount: number;
}

export interface FreelancerDetails {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  // Add other properties as needed
}

export interface ChartDataResponse {
  _id: mongoose.Types.ObjectId;
  freelancerDetails: FreelancerDetails;
  orderCount: { day: string; orderCount: number; }[];
  Amount: { day: string; totalAmount: number; }[];
}


export interface DataPoint {
  day: string;
  orderCount?: number;
  totalAmount?: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export interface INotification extends Document {
  toUser: string; 
  message: string; 
  date: Date; 
}