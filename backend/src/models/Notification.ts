import { Schema, model, Document } from 'mongoose';
import { INotification } from '../interfaces/freelancerInterface';



const NotificationSchema: Schema = new Schema({
    toUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

export const NotificationModel = model<INotification>('Notification', NotificationSchema);
