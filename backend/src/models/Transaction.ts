
import { Schema, Document, model } from 'mongoose';
import { ITransaction } from '../interfaces/clientInterface';

const  TransactionSchema= new Schema<ITransaction>({
    session_id: { type: String, required: true },
    user: { type: Schema.Types.ObjectId,ref:"freelancer", required: true },
    work_id: { type: Schema.Types.ObjectId,ref:"WorkModel", required: true },
    orderId: { type: Schema.Types.ObjectId,ref:"Order" },
    amount: { type: Number,required: true},
    purpose: {type:String,required: true},
    payment_status: {type:String,required: true},
    date: {type: Number, required: true, default: Date.now }
})


export const TransactionModel = model('Transaction', TransactionSchema);
