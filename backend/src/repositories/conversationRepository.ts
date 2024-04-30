import { Conversation } from '../models/Messages';

export class ConversationRepository {
    public async updateLastMessage(conversationId: string, message: string) {
        const conversation = await Conversation.findById(conversationId);
        if (conversation) {
            conversation.lastMessage = message;
            await conversation.save();
        }
    }

    // Implement other conversation-related database operations...
}
