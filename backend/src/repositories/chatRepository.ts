// chatRepository.ts
import { IConversation } from '../interfaces/chatInterface';
import { INotification } from '../interfaces/freelancerInterface';
import { Freelancer } from '../models/Freelancer';
import { Conversation, Message } from '../models/Messages'; // Assuming chatModel.ts contains your Mongoose models
import { NotificationModel } from '../models/Notification';


export interface ChatRepositoryImp {
  createConversation(conversationData: any): Promise<any>;
  createMessage(conversationId: string, senderId: string, receiverId: string, messageText: string): Promise<any>
  getConversationsByUser(userId: string): Promise<any[]>;
  getMessagesInConversation(conversationId: string): Promise<any[]>;
  findConversation(senderId: string, receiverId: string): Promise<any>
  saveNotification(toUser: string, message: string): Promise<INotification>
  getLastNNotifications(toUserId: string): Promise<INotification[]>
  getSenderDetails(id:string):Promise<any>
}

export class ChatRepository implements ChatRepositoryImp {
  //  async createConversation(conversationData: any): Promise<any> {
  //     const conversation = new Conversation(conversationData);
  //     return await conversation.save();
  //   }

  async createMessage(conversationId: string, senderId: string, receiverId: string, messageText: string): Promise<any> {

    await Conversation.updateOne({ _id: conversationId }, {
      $set: { lastMessage: messageText, lastMessageAt: Date.now() }
    })
    const newMessage = new Message({
      conversation: conversationId,
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

  async findConversation(senderId: string, receiverId: string): Promise<IConversation | undefined> {
    const conversation = await Conversation.findOne({
      recipients: { $all: [senderId, receiverId] }
    }).exec();
    if (conversation) {
      return conversation
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

  async saveNotification(toUser: string, message: string): Promise<INotification> {
    try {
      const newNotification = new NotificationModel({
        toUser,
        message,
        date: new Date()
      });


      const savedNotification = await newNotification.save();

      return savedNotification;
    } catch (error: any) {
      throw new Error(`Error saving notification: ${error.message}`);
    }
  }


  async getLastNNotifications(toUserId: string): Promise<INotification[]> {
    try {

      const notifications = await NotificationModel.find({ toUser: toUserId }).sort({ date: -1 }).limit(5);

      return notifications;
    } catch (error: any) {
      throw new Error(`Error fetching notifications: ${error.message}`);
    }
  }


  async getSenderDetails(id:string):Promise<any>{
    try {
      const senderDetails = await Freelancer.findOne({_id:id},{profile:1,username:1,email:1,role:1})
      return senderDetails
    } catch (error:any) {
      throw new Error(error.message)
    }
  }



}
