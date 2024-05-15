"use strict";
// config/mongoConfig.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI;
async function connectDB() {
    try {
        await mongoose_1.default.connect(`${MONGODB_URI}?useNewUrlParser=true`, {});
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process if unable to connect to MongoDB
    }
}
exports.connectDB = connectDB;
