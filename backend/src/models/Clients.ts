import { Schema, Document, model } from 'mongoose';
import { IWork } from '../interfaces/freelancerInterface';
import { WorkSchema } from './Works';
import { IOrder } from '../interfaces/clientInterface';


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


const OrderSchema = new Schema<IOrder>({
    workId: { type: Schema.Types.ObjectId, required: true, ref: 'Work' }, // Reference Work model
    // transactionId: { type: Schema.Types.ObjectId, required: true, ref: 'Transaction' }, // Reference Transaction model
    freelancerId: { type: Schema.Types.ObjectId, required: true, ref: 'Freelancer' }, // Reference Freelancer model
    clientId: { type: Schema.Types.ObjectId, required: true, ref: 'Client' }, // Reference Client model
    payment_intent: { type: String, required: true },
    category: { type: [String], required: true },
    amount: { type: Number, required: true },
    WorkDetails: { type: WorkSchema, required: true },
    date: { type: Number, required: true, default: Date.now } ,
    status:{ type: String, required: true}
})

export const Order = model('Orders', OrderSchema);