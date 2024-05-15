"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = void 0;
const Freelancer_1 = require("../models/Freelancer");
const Messages_1 = require("../models/Messages"); // Assuming chatModel.ts contains your Mongoose models
const Notification_1 = require("../models/Notification");
class ChatRepository {
    //  async createConversation(conversationData: any): Promise<any> {
    //     const conversation = new Conversation(conversationData);
    //     return await conversation.save();
    //   }
    async createMessage(conversationId, senderId, receiverId, messageText) {
        await Messages_1.Conversation.updateOne({ _id: conversationId }, {
            $set: { lastMessage: messageText, lastMessageAt: Date.now() }
        });
        const newMessage = new Messages_1.Message({
            conversation: conversationId,
            to: receiverId,
            from: senderId,
            body: messageText,
        });
        return await newMessage.save();
    }
    async getConversationsByUser(userId) {
        return await Messages_1.Conversation.find({ recipients: userId }).exec();
    }
    async getMessagesInConversation(conversationId) {
        return await Messages_1.Message.find({ conversation: conversationId }).exec();
    }
    async findConversation(senderId, receiverId) {
        const conversation = await Messages_1.Conversation.findOne({
            recipients: { $all: [senderId, receiverId] }
        }).exec();
        if (conversation) {
            return conversation;
        }
    }
    // Method to create a new conversation
    async createConversation(participants) {
        const newConversation = new Messages_1.Conversation({
            recipients: [participants.senderId, participants.receiverId],
            lastMessage: '',
            date: Date.now()
        });
        return await newConversation.save();
    }
    async ReadMessage(messageId) {
        await Messages_1.Message.findOneAndUpdate({ _id: messageId }, { $set: { status: 'read' } }, { new: true });
        const newData = await Messages_1.Message.findById(messageId);
        return newData;
    }
    async saveNotification(toUser, message) {
        try {
            const newNotification = new Notification_1.NotificationModel({
                toUser,
                message,
                date: new Date()
            });
            const savedNotification = await newNotification.save();
            return savedNotification;
        }
        catch (error) {
            throw new Error(`Error saving notification: ${error.message}`);
        }
    }
    async getLastNNotifications(toUserId) {
        try {
            const notifications = await Notification_1.NotificationModel.find({ toUser: toUserId }).sort({ date: -1 }).limit(5);
            return notifications;
        }
        catch (error) {
            throw new Error(`Error fetching notifications: ${error.message}`);
        }
    }
    async getSenderDetails(id) {
        try {
            const senderDetails = await Freelancer_1.Freelancer.findOne({ _id: id }, { profile: 1, username: 1, email: 1, role: 1 });
            return senderDetails;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.ChatRepository = ChatRepository;
