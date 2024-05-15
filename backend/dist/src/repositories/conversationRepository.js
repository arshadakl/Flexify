"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationRepository = void 0;
const Messages_1 = require("../models/Messages");
class ConversationRepository {
    async updateLastMessage(conversationId, message) {
        const conversation = await Messages_1.Conversation.findById(conversationId);
        if (conversation) {
            conversation.lastMessage = message;
            await conversation.save();
        }
    }
}
exports.ConversationRepository = ConversationRepository;
