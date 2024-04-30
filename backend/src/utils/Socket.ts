// socket.ts
import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import { ChatService } from "../services/chatService";
import { ChatRepository } from "../repositories/chatRepository";

const chatRepository = new ChatRepository()
const chatService = new ChatService(chatRepository);


export const initializeSocket = (server: HTTPServer) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    const users = new Map();

    // When a user connects to Socket.IO
    io.on('connection', (socket) => {
        // When a user joins, have them join a room with their userID
        socket.on('join', ({ userId }) => {
            console.log(userId);
            users.set(userId, socket.id);
            
            socket.join(userId);
        });

        // When a user sends a message
        socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
            // Save the message to the database
            console.log(message);

            const savedMessage = await chatService.createMessage(senderId, receiverId, message);

            // Emit the message to the receiver's room
            // io.to(receiverId).emit('receiveMessage', savedMessage);
            // io.emit('message', savedMessage);
            io.to(receiverId).emit('message', savedMessage);
            // io.to(receiverId).emit("test");
            // socket.broadcast.emit("this is the rest meesage for all users")
            // console.log("Ended successfully");
            
            io.to(senderId).emit('message', savedMessage);
        });
    });


    return io;
};