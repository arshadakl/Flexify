

import { Schema, Document, model } from 'mongoose';

export interface Admin {
    _id?: string;
    username: string;
    password: string ;
}


const AdminSchema = new Schema<Admin>({
    
    username: { type: String, required: true },
    password: { type: String, required: true }
});

export const Admin = model('Admin', AdminSchema);

