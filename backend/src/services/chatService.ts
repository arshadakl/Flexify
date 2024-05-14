import { ChatRepository, ChatRepositoryImp } from "../repositories/chatRepository";

import { IConversation, IMessage } from '../interfaces/chatInterface';
import { INotification } from "../interfaces/freelancerInterface";


export class ChatService {


  constructor(public chatRepository: ChatRepositoryImp) { }
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

  public async createMessage(senderId: string, receiverId: string, messageText: string): Promise<any> {
    try {

      let conversation: IConversation = await this.chatRepository.findConversation(senderId, receiverId);
      // console.log(conversation,"conversation return data/....");

      if (!conversation) {
        conversation = await this.chatRepository.createConversation({ senderId, receiverId });
      }

      const conversationId = conversation._id;
      const lastMessageAt = conversation.lastMessageAt
      const currentTime = Date.now();

      const date1 = new Date(lastMessageAt);
      const date2 = new Date(currentTime);

      const timeDifference: number = Math.abs(date2.getTime() - date1.getTime());

      const threshold: number = 10 * 60 * 1000;
      let isDifference = false
      if (timeDifference < threshold) {
        isDifference = false
    } else {
        isDifference=true
    }

      const SenderDetails =  await this.chatRepository.getSenderDetails(senderId)

      const savedMessage = await this.chatRepository.createMessage(conversationId, senderId, receiverId, messageText);
      return {savedMessage,isDifference,SenderDetails};
    } catch (error) {
      throw error;
    }
  }

  async getConversationsByUser(senderId: string, receiverId: string): Promise<IConversation[]> {
    try {
      const conversationId = await this.chatRepository.findConversation(senderId, receiverId)

      const conversations = await this.chatRepository.getMessagesInConversation(conversationId);
      return conversations;
    } catch (error) {
      throw error;
    }
  }

  async getMessagesInConversation(conversationId: string): Promise<IMessage[]> {
    try {
      const messages = await this.chatRepository.getMessagesInConversation(conversationId);
      return messages;
    } catch (error) {
      throw error;
    }
  }

  async manageMessageRead(messageId: string): Promise<IMessage | null> {
    try {
      const messages = await this.chatRepository.ReadMessage(messageId);
      return messages;
    
    } catch (error) {
      throw error;
    }
  }

  async saveNotification(toUser: string, message: string): Promise<INotification> {
    try {
      const notif = await this.chatRepository.saveNotification(toUser, message);
      return notif;
    } catch (error) {
      throw error;
    }
  }

  async getLastNNotifications(toUser: string): Promise<INotification[]> {
    try {
      const allnotif = await this.chatRepository.getLastNNotifications(toUser);
      return allnotif;
    } catch (error) {
      throw error;
    }
  }



}
