import mongoose, { Document, Types } from 'mongoose';

export interface IConversation extends Document {
    recipients: mongoose.Types.ObjectId[];
    lastMessage?: string;
    date: number;
}


export interface IMessage extends Document {
    _id: string | Types.ObjectId
    conversation: mongoose.Types.ObjectId | string;
    to: mongoose.Types.ObjectId;
    from: mongoose.Types.ObjectId;
    body: string;
    date: number;
}
