

import { Schema, Document, model } from 'mongoose';

export interface Freelancer {
    id?: string;
    username: string;
    email: string;
    password: string;
    OTP?: number;
    token?: string;
    isVerified?: number;
    profile?: string;
    isBlocked?: string;
    role?: 'freelancer' | 'client' | 'notspecified';
}


export interface FreelancerDetails{
    firstName: string,
    lastName: string;
    Country: string;
    language: string;
    skillsList: string[],
    bio: string;
    user: Schema.Types.ObjectId;
}


const FreelancerSchema = new Schema<Freelancer>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    OTP: { type: Number, required: true },
    token: { type: String },
    isVerified: { type: Number, required: true },
    profile: { type: String },
    isBlocked: { type: String },
    role: { type: String, enum: ['freelancer', 'client', 'notspecified'], default: 'notspecified' }
});



const FreelancerDetailsSchema = new Schema<FreelancerDetails>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    Country: { type: String, required: true },
    language:  { type: String, required: true },
    skillsList:  { type: [String], required: true },
    bio: { type: String, required: true },
    user:  { type: Schema.Types.ObjectId, required: true }
})

export const Freelancer = model('Freelancer', FreelancerSchema);
export const FreelancerDetails = model('FreelancerDetails', FreelancerDetailsSchema);
// export default model<FreelancerDetails>('FreelancerDetails', FreelancerDetailsSchema);
