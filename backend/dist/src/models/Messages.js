"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.Conversation = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Conversation Schema definition
const ConversationSchema = new mongoose_1.Schema({
    recipients: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Freelancer' }],
    lastMessage: {
        type: String,
    },
    date: {
        type: Number,
        default: Date.now,
    },
    lastMessageAt: {
        type: Number,
        default: Date.now,
    }
});
const MessageSchema = new mongoose_1.Schema({
    conversation: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'conversations',
    },
    to: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Freelancer',
    },
    from: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Freelancer',
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['unread', 'read'],
        default: 'unread',
    },
});
// Define models
const Conversation = mongoose_1.default.model('conversations', ConversationSchema);
exports.Conversation = Conversation;
const Message = mongoose_1.default.model('messages', MessageSchema);
exports.Message = Message;
