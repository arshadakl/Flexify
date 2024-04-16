
import { Schema, Document, model } from 'mongoose';
import { ITransaction } from '../interfaces/clientInterface';

const  TransactionSchema= new Schema<ITransaction>({
    session_id: { type: String, required: true },
    user: { type: String, required: true },
    work_id: { type: Schema.Types.ObjectId,ref:"WorkModel", required: true },
    amount: { type: Number,required: true},
    purpose: {type:String,required: true},
    payment_status: {type:String,required: true},
})


export const TransactionModel = model('Transaction', TransactionSchema);
