import { SyntheticEvent, useEffect, useRef, useState } from "react";
import socket from "../../common/utils/config/socket";
import store from "../../Redux/store";
import { IChatMessage } from "../../interfaces/Chat";
import { getMessagesAPI } from "../../common/utils/APIs/ClientApi";
import {  FormatDateTimeString } from "../../common/utils/Services/dateFormater";
import {motion} from "framer-motion"
import { fadeIn } from "../../common/animations/Frame_Motion/variants";


function ChatBox({ client }: { client: any }) {
  const state = store.getState();
  const freelancer = state.freelancer.freelancer;
  const userId = freelancer?._id;
  const userProfile = freelancer?.profile
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
console.log(client , "client data");

  useEffect(() => {
    const fetchData = async()=>{
      const oldMessages = await getMessagesAPI(userId as string,client._id as string);
      setMessages(oldMessages.messages)
    }
    fetchData()
    console.log(userId);
    
    
    socket.emit("join", { userId });
    // socket.emit("joinRoom", { clientId });

  //  socket.on('message', (newMessage:IChatMessage) => {
  //   console.log(newMessage,"new message");
  //   setMessages((prevMessages:IChatMessage[]) => [...prevMessages, newMessage]);
    
  // });
  socket.on('message', (newMessage: IChatMessage) => {
  
    setMessages((prevMessages: IChatMessage[]) => {
      const messageIds = prevMessages.map(message => message._id);
      if (!messageIds.includes(newMessage._id)) {
        return [...prevMessages, newMessage];
      }
      return prevMessages;
    });
  });
    // Clean up on component unmount
    return () => {
      socket.off("newMessage");
    };
  }, []);

  // const handileMessage = ()=>{
  //   socket.emit('sendMessage', input);
  //   setInput("")

  // }

  useEffect(() => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: 'smooth' 
    });
  }, [messages]);
  
  

  const sendMessage = (e:SyntheticEvent) => {
    e.preventDefault()
    const toUserId = client._id;
    socket.emit("sendMessage", {
      senderId: userId,
      receiverId: toUserId,
      message: input,
    });
    setInput("")
  };
  return (
    <div className="">
      <div className=" border border-gray-400/50  rounded-t-lg ">
        <div className="flex bg-gray-50 px-5 rounded-t-lg py-5">
          <img className="h-10 w-10 rounded-full" src={client.profile} alt="" />{" "}
          <p className="mx-4 font-semibold my-auto">{client.username}</p>
        </div>
        <hr />

        <div ref={chatBoxRef} className="bg-white py-1 chatBox min-h-96 max-h-96 mt-auto overflow-scroll">
         
          {messages.map((message) => {
            return (
              <>
                {message.from==userId ? <motion.div variants={fadeIn("left",0.2)} initial="hidden" whileInView={"show"} viewport={{once:true}} className="flex items-start justify-end gap-2.5 my-1">
                  <div className="flex flex-col getMessagesInConversation ml-12 min-w-32 max-w-full leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl rounded-tr-none  dark:bg-gray-700">
                    <p className="text-sm break-words font-medium  text-gray-900 dark:text-white">
                      {message.body}
                    </p>
                  <p className="text-[10px] text-end text-slate-400">{FormatDateTimeString(message.date as any)}</p>

                  </div>
                  <img
                    className="w-8 h-8 mx-1 rounded-full"
                    src={userProfile}
                  />
                </motion.div> : 
                <motion.div variants={fadeIn("right",0.2)} initial="hidden" whileInView={"show"} viewport={{once:true}} className="flex items-start gap-2.5 my-1">
                <img className="w-8 h-8 mx-1 rounded-full" src={client.profile} />
                <div className="flex flex-col min-w-32 max-w-full leading-1.5 mr-12 py-2 px-3 border-gray-200 bg-gray-100 rounded-xl rounded-tl-none dark:bg-gray-700">
                  <p className="text-sm break-words font-medium text-gray-900 dark:text-white">
                  {message.body}
                  </p>
                  <p className="text-[10px] text-slate-400">{FormatDateTimeString(message.date as any)}</p>
                </div>
              </motion.div>
                }
              </>
            );
          })}
        </div>
      </div>
      <div className="border mt-[2px] border-gray-300">
        <form onSubmit={sendMessage}>
        <label htmlFor="chat" className="sr-only">
          Your message
        </label>
        <div className="flex items-center py-2 px-3 bg-gray-50  dark:bg-gray-700">
          <button
            type="button"
            className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <i className="fa-regular fa-circle-plus text-2xl" />
          </button>

          <textarea
            id="chat"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your message..."
          />
          <button
            // onClick={sendMessage} typ
            type="submit"
            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          >
            <i className="fa-light fa-paper-plane-top text-2xl text-gray-500" />
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
