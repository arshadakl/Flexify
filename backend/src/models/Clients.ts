import { Schema, Document, model } from 'mongoose';
import { IWork } from '../interfaces/freelancerInterface';
import { WorkSchema } from './Works';
import { IOrder, IRequirement } from '../interfaces/clientInterface';


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
    date: { type: Number, required: true, default: Date.now },
    deadline: { type: Number },
    status:{ type: String, required: true},
    requirementStatus : { type: Boolean, required: true},
})

const answerSchema = new Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }
});

const RequirementSchema = new Schema<IRequirement>({
    orderId: { type: Schema.Types.ObjectId, required: true, ref: 'Orders' }, 
    workId: { type: Schema.Types.ObjectId, required: true, ref: 'Work' }, 
    freelancerId: { type: Schema.Types.ObjectId, required: true, ref: 'Freelancer' }, 
    clientId: { type: Schema.Types.ObjectId, required: true, ref: 'Client' }, 
    logo:{ type: String},
    referenceMaterial:{ type: String},
    answers:  [answerSchema],
    date: { type: Number, required: true, default: Date.now } 
})

export const Requirement = model('Requirement', RequirementSchema);
export const Order = model('Orders', OrderSchema);