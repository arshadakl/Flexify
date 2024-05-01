// chatController.ts
import { Request, Response } from 'express';
import { ChatService } from '../services/chatService';
import { IMessage, IConversation } from '../interfaces/chatInterface';

export class ChatController {
   constructor(private readonly chatService: ChatService) {}
  // constructor() {
  //   this.chatService = new ChatService();
  // }

//    createConversation = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const conversationData: IConversation = req.body;
//       const conversation = await this.chatService.createConversation(conversationData);
//       res.status(201).json(conversation);
//     } catch (error:any) {
//       res.status(500).json({ error: error.message });
//     }
//   };

   createMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { senderId, receiverId, message } = req.body;
      const savedMessage = await this.chatService.createMessage(senderId, receiverId, message);
      res.status(201).json(savedMessage);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  };

   getConversationsByUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const {sender,receiver} = req.query; 
      console.log(sender,receiver ,"this is two id's");
      
      const conversations = await this.chatService.getConversationsByUser(sender as string,receiver as string );
      res.status(200).json({status:true,messages: conversations});
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  };

   getMessagesInConversation = async (req: Request, res: Response): Promise<void> => {
    try {
      const conversationId: string = req.params.conversationId; // Assuming you're getting the conversation ID from the URL parameters
      const messages = await this.chatService.getMessagesInConversation(conversationId);
      res.status(200).json(messages);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  };




  

  
}
