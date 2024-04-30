// import React, { createContext, useContext } from 'react';
// import io from 'socket.io-client';

// const SocketContext = createContext<any | null>(null);

// export const SocketProvider: any = ({ children }: { children: React.ReactNode }) => {
//   const socket = io('http://localhost:3000'); 

//   return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
// };

// export const useSocket = (): any | null => useContext(SocketContext);
