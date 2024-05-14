import mongoose, { Document, Types } from 'mongoose';
import { Schema} from 'mongoose';
export interface IConversation extends Document {
    recipients: mongoose.Types.ObjectId[];
    lastMessage?: string;
    date: number;
    lastMessageAt:number
}


export interface IMessage extends Document {
    _id: string | Types.ObjectId
    conversation: mongoose.Types.ObjectId | string;
    to: mongoose.Types.ObjectId;
    from: mongoose.Types.ObjectId;
    body: string;
    date: number;
    status: "unread" | "read" 
}

export interface IReport extends Document {
    reported_post_id: Schema.Types.ObjectId | string;
    reporter_id: Schema.Types.ObjectId | string;
    reason: string;
    admin_review: boolean;
    admin_action?: string | null;
    report_date?: Date;
  }
