import { ChatRepository, ChatRepositoryImp } from "../repositories/chatRepository";

import { IConversation, IMessage } from '../interfaces/chatInterface';

export class ChatService {
  

  constructor(public  chatRepository: ChatRepositoryImp) {}
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

  public async createMessage(senderId: string, receiverId: string, messageText: string): Promise<IMessage> {
    try {
      // Check for an existing conversation
      let conversation = await this.chatRepository.findConversation(senderId, receiverId);

      // If no conversation exists, create a new one
      if (!conversation) {
        conversation = await this.chatRepository.createConversation({ senderId, receiverId });
      }

      // Now we have a conversation, either existing or new
      const conversationId = conversation._id;

      // Create a message with the conversation ID
      const savedMessage = await this.chatRepository.createMessage(conversationId, senderId, receiverId, messageText);
      return savedMessage;
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
      // Handle or throw the error as appropriate for your application
      throw error;
    }
  }

   async getMessagesInConversation(conversationId: string): Promise<IMessage[]> {
    try {
      const messages = await this.chatRepository.getMessagesInConversation(conversationId);
      return messages;
    } catch (error) {
      // Handle or throw the error as appropriate for your application
      throw error;
    }
  }
}
