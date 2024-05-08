// socket.ts
import { io } from "socket.io-client";


const SOCKET_URL = 'http://localhost:3000'; 
// const SOCKET_URL = 'https://244d-202-164-149-48.ngrok-free.app'; 
const socket = io(SOCKET_URL);



export const initSocket = (userId:string) => {
    socket.emit("join", { userId });
    
  };

export default socket;
