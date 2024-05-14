import mongoose, { Schema } from 'mongoose';
import { IConversation, IMessage } from '../interfaces/chatInterface';


// Conversation Schema definition
const ConversationSchema: Schema<IConversation> = new Schema<IConversation>({
    recipients: [{ type: Schema.Types.ObjectId, ref: 'Freelancer' }],
    lastMessage: {
        type: String,
    },
    date: {
        type: Number,
        default: Date.now,
    },
    lastMessageAt:{
        type: Number,
        default: Date.now,
    }
});


const MessageSchema: Schema<IMessage> = new Schema<IMessage>({
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'conversations',
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'Freelancer',
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'Freelancer',
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['unread', 'read'],
        default: 'unread',
    },
});

// Define models
const Conversation = mongoose.model<IConversation>('conversations', ConversationSchema);
const Message = mongoose.model<IMessage>('messages', MessageSchema);

export { Conversation, Message };
