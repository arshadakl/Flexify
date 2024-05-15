"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
class ChatController {
    chatService;
    constructor(chatService) {
        this.chatService = chatService;
    }
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
    createMessage = async (req, res) => {
        try {
            const { senderId, receiverId, message } = req.body;
            const savedMessage = await this.chatService.createMessage(senderId, receiverId, message);
            res.status(201).json(savedMessage);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    getConversationsByUser = async (req, res) => {
        try {
            const { sender, receiver } = req.query;
            console.log(sender, receiver, "this is two id's");
            const conversations = await this.chatService.getConversationsByUser(sender, receiver);
            res.status(200).json({ status: true, messages: conversations });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    getMessagesInConversation = async (req, res) => {
        try {
            const conversationId = req.params.conversationId; // Assuming you're getting the conversation ID from the URL parameters
            const messages = await this.chatService.getMessagesInConversation(conversationId);
            res.status(200).json(messages);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}
exports.ChatController = ChatController;
