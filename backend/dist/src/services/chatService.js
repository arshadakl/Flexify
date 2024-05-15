"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
class ChatService {
    chatRepository;
    constructor(chatRepository) {
        this.chatRepository = chatRepository;
    }
    // constructor() {
    //   this.chatRepository = new ChatRepository();
    // }
    //    async createConversation(conversationData: IConversation): Promise<IConversation> {
    //     try {
    //       // Validate conversationData or transform it as needed before saving
    //       const savedConversation = await this.chatRepository.createConversation(conversationData);
    //       return savedConversation;
    //     } catch (error) {
    //       throw error;
    //     }
    //   }
    async createMessage(senderId, receiverId, messageText) {
        try {
            let conversation = await this.chatRepository.findConversation(senderId, receiverId);
            // console.log(conversation,"conversation return data/....");
            if (!conversation) {
                conversation = await this.chatRepository.createConversation({ senderId, receiverId });
            }
            const conversationId = conversation._id;
            const lastMessageAt = conversation.lastMessageAt;
            const currentTime = Date.now();
            const date1 = new Date(lastMessageAt);
            const date2 = new Date(currentTime);
            const timeDifference = Math.abs(date2.getTime() - date1.getTime());
            const threshold = 10 * 60 * 1000;
            let isDifference = false;
            if (timeDifference < threshold) {
                isDifference = false;
            }
            else {
                isDifference = true;
            }
            const SenderDetails = await this.chatRepository.getSenderDetails(senderId);
            const savedMessage = await this.chatRepository.createMessage(conversationId, senderId, receiverId, messageText);
            return { savedMessage, isDifference, SenderDetails };
        }
        catch (error) {
            throw error;
        }
    }
    async getConversationsByUser(senderId, receiverId) {
        try {
            const conversationId = await this.chatRepository.findConversation(senderId, receiverId);
            const conversations = await this.chatRepository.getMessagesInConversation(conversationId);
            return conversations;
        }
        catch (error) {
            throw error;
        }
    }
    async getMessagesInConversation(conversationId) {
        try {
            const messages = await this.chatRepository.getMessagesInConversation(conversationId);
            return messages;
        }
        catch (error) {
            throw error;
        }
    }
    async manageMessageRead(messageId) {
        try {
            const messages = await this.chatRepository.ReadMessage(messageId);
            return messages;
        }
        catch (error) {
            throw error;
        }
    }
    async saveNotification(toUser, message) {
        try {
            const notif = await this.chatRepository.saveNotification(toUser, message);
            return notif;
        }
        catch (error) {
            throw error;
        }
    }
    async getLastNNotifications(toUser) {
        try {
            const allnotif = await this.chatRepository.getLastNNotifications(toUser);
            return allnotif;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ChatService = ChatService;
