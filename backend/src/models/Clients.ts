import { Schema, Document, model } from 'mongoose';


export interface clientDetails{
    firstName: string,
    lastName: string;
    Country: string;
    language: string;
    bio: string;
    user: string;
}

const ClientDetailsSchema = new Schema<clientDetails>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    Country: { type: String, required: true },
    language:  { type: String, required: true },
    bio: { type: String, required: true },
    user:  { type: String, required: true }
})


export const ClientDetails = model('ClientDetails', ClientDetailsSchema);