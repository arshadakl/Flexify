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
            console.log(userId, "");
            // users.set(userId, socket.id);


            // users.set(userId, new SimplePeer({ initiator: false, trickle: false }));

            // Send back the signal to establish the connection


            socket.join(userId);
            // socket.emit('signal', { userId, signal: users.get(userId).initiator ? users.get(userId).initiator : null });
        });

        // socket.on('signal', ({ userId, signal }) => {
        //     console.log('Signal received from:', userId);
        //     users.get(userId).signal(signal);
        // });

        socket.on('disconnect', () => {
            console.log('User disconnected: ', socket.id);
            // Clean up user's peer connection on disconnect
            users.delete(socket.id); // Use socket.id as user identifier
        });


        //manage messages 
        socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
            // Save the message to the database
            console.log(message);

            const { savedMessage, isDifference, SenderDetails } = await chatService.createMessage(senderId, receiverId, message);
            if (isDifference) {
                await chatService.saveNotification(receiverId, `You have new Message from ${SenderDetails.username}`);
                io.to(receiverId).emit("newNotify", { SenderDetails, text: "You have new Message" })
            }
            io.to(receiverId).emit('message', savedMessage);
            io.to(senderId).emit('message', savedMessage);
        });

        //manage messages 
        socket.on('notify', async ({ toUser, message }) => {
            console.log(message);
            await chatService.saveNotification(toUser, message);

            io.to(toUser).emit('newNotify', { message, Date: Date.now() });
        });

        //manage Videocall 
        socket.on('callReq', async ({ senderId, receiverId, name }) => {
            io.to(receiverId).emit('call-offer', { name, senderId });
        });

        socket.on('AcceptReq', async ({ senderId, receiverId, callId }) => {
            io.to(receiverId).emit('call-Accept', { senderId, callId });
        });

        socket.on('rejectReq', async ({ senderId, receiverId }) => {
            io.to(receiverId).emit('call-reject');
        });

        socket.on('notRespond', async ({ senderId, receiverId, name }) => {
            io.to(receiverId).emit('call-noResponse');
        });


        // // manage messages 
        // socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
        //     // Save the message to the database
        //     console.log(message);

        //     const savedMessage = await chatService.createMessage(senderId, receiverId, message);

        //     io.to(receiverId).emit('message', savedMessage);

        //     io.to(senderId).emit('message', savedMessage);
        // });



        // // manage video call
        // socket.on('call-start', ({ userId, signalData }) => {
        //     // Emit an event to the other user with the signal data
        //     console.log("start");

        //     socket.to(userId).emit('call-offer', { signalData });
        // });

        // // When the other user answers the call and sends their signaling data back
        // socket.on('call-answer', ({ userId, signalData }) => {
        //     // Emit an event back to the original caller with the answer signal data
        //     socket.to(userId).emit('call-accepted', { signalData });
        // });

        // // Handle ICE candidate exchange
        // socket.on('ice-candidate', ({ userId, candidate }) => {
        //     // Send the ICE candidate to the other user
        //     socket.to(userId).emit('ice-candidate', { candidate });
        // });





    });


    return io;
};