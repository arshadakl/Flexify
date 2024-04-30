// chatRepository.ts
import { Conversation, Message } from '../models/Messages'; // Assuming chatModel.ts contains your Mongoose models

export interface ChatRepositoryImp {
  createConversation(conversationData: any): Promise<any>;
  createMessage(conversationId:string,senderId: string, receiverId: string, messageText: string): Promise<any>
  getConversationsByUser(userId: string): Promise<any[]>;
  getMessagesInConversation(conversationId: string): Promise<any[]>;
  findConversation(senderId: string, receiverId: string): Promise<any> 
}

export class ChatRepository implements ChatRepositoryImp {
    //  async createConversation(conversationData: any): Promise<any> {
    //     const conversation = new Conversation(conversationData);
    //     return await conversation.save();
    //   }
    
       async createMessage(conversationId:string,senderId: string, receiverId: string, messageText: string): Promise<any> {
        const newMessage = new Message({
          conversation: conversationId, // Replace with the actual conversation ID
          to: receiverId,
          from: senderId,
          body: messageText,
        });
        return await newMessage.save();
      }

   async getConversationsByUser(userId: string): Promise<any[]> {
    return await Conversation.find({ recipients: userId }).exec();
  }

   async getMessagesInConversation(conversationId: string): Promise<any[]> {
    return await Message.find({ conversation: conversationId }).exec();
  }

   async findConversation(senderId: string, receiverId: string): Promise<string | undefined> {
    const conversation =  await Conversation.findOne({
      recipients: { $all: [senderId, receiverId] }
    }).exec();
    if(conversation){
      return conversation._id
    }
  }

  // Method to create a new conversation
   async createConversation(participants: { senderId: string, receiverId: string }): Promise<any> {
    const newConversation = new Conversation({
      recipients: [participants.senderId, participants.receiverId],
      lastMessage: '',
      date: Date.now()
    });
    return await newConversation.save();
  }
}
