

import { Schema, Document, model } from 'mongoose';
import { AdminInter } from '../interfaces/adminInterface';



const AdminSchema = new Schema<AdminInter>({
    
    adminId: { type: String, required: true },
    password: { type: String, required: true }
});

export const Admin = model('Admin', AdminSchema);

