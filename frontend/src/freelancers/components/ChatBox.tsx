import { SyntheticEvent, useEffect, useRef, useState } from "react";
import socket from "../../common/utils/config/socket";
import store from "../../Redux/store";
import { IChatMessage } from "../../interfaces/Chat";
import { getMessagesAPI } from "../../common/utils/APIs/ClientApi";
import { FormatDateTimeString } from "../../common/utils/Services/dateFormater";
import { motion } from "framer-motion";
import { fadeIn } from "../../common/animations/Frame_Motion/variants";
import { initFlowbite } from "flowbite";
import Lottie from "react-lottie";
import animationData from "./../../common/animations/calling.json";
import animationData2 from "./../../common/animations/redCall.json";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function ChatBox({ client }: { client: any }) {
  const navigate = useNavigate()
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const buttonRef = useRef<HTMLButtonElement>(null);

  const state = store.getState();
  const freelancer = state.freelancer.freelancer;
  const userId = freelancer?._id;
  const userProfile = freelancer?.profile;
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [showText, setShowText] = useState(false);
  const [ring, setRing] = useState<boolean>(false);
  const [calling, setCalling] = useState<boolean>(false);
  const [noResponse, setNoResponse] = useState<boolean>(false);

  const resetAllState = () => {
    setRing(false);
    setCalling(false);
    setNoResponse(false);
  };

  const CloseModal = () => {
    resetAllState();
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };
  useEffect(() => {
    initFlowbite();

    const fetchData = async () => {
      const oldMessages = await getMessagesAPI(
        userId as string,
        client._id as string
      );
      setMessages(oldMessages.messages);
    };

    fetchData();
    console.log(userId);

    // socket.emit("join", { userId });

    socket.on("message", (newMessage: IChatMessage) => {
      setMessages((prevMessages: IChatMessage[]) => {
        const messageIds = prevMessages.map((message) => message._id);
        if (!messageIds.includes(newMessage._id)) {
          return [...prevMessages, newMessage];
        }
        return prevMessages;
      });
    });


    socket.on("call-reject", () => {
      setCalling(true);
      setNoResponse(true);
      setTimeout(() => {
        setCalling(false);
        setNoResponse(false);
        resetAllState();
        CloseModal();
      }, 4000);
    });



    //rreject reposse
    socket.on("call-Accept", ({senderId,callId}:{senderId:string,callId:string}) => {
      CloseModal()
      navigate(`/videocall?id=${callId}`)
      resetAllState();
    });

    // next i want to manage this one

    //noresponse reposse
    socket.on("call-noResponse", () => {
      setCalling(false);
      setNoResponse(true);
      setTimeout(() => {
        setNoResponse(false);
        // CloseModal()
        setNoResponse(false);
      }, 4000);
    });


    // Clean up on component unmount
    return () => {
      socket.off("newMessage");
    };
  }, []);

  useEffect(() => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    // socket.on("call-offer", (name: string) => {
    //   setRing(true);
    //   setTimeout(() => {
    //     socket.emit("call-noResponse", {
    //       senderId: userId,
    //       receiverId: client._id,
    //     });
    //     setRing(false);
    //   }, 10000);
    // });

    //rreject reposse
    // socket.on("call-reject", () => {
    //   toast.warning("call rejected")
    //   setCalling(true);
    //   setNoResponse(true);
    //   setTimeout(() => {
    //     setCalling(false);
    //     setNoResponse(false);
    //     resetAllState();
    //     CloseModal();
    //   }, 4000);
    // });

    
  }, []);

  const sendMessage = (e: SyntheticEvent) => {
    e.preventDefault();
    const toUserId = client._id;
    socket.emit("sendMessage", {
      senderId: userId,
      receiverId: toUserId,
      message: input,
    });
    setInput("");
  };
  //for start calling
  const videoCallHandile = () => {
    setCalling(true);
    socket.emit("callReq", {
      senderId: userId,
      receiverId: client._id,
      name: freelancer?.username,
    });
  };

  //for reject calllll
  const rejectCall = () => {
    setRing(false);
    setCalling(false);
        setNoResponse(false);
        resetAllState();
    socket.emit("rejectReq", {
      senderId: userId,
      receiverId:client._id  ,
    });
  };
  return (
    <div className="">
      <div className=" border border-gray-400/50  rounded-t-lg  ">
        <div className="flex bg-gray-0 justify-between px-5 rounded-t-lg py-5 shadow-xl">
          <div className="flex  w-2/4 ">
            <div className="border-2  rounded-full border-blue-600 ">
              <img
                className="h-10 w-10 rounded-full border-2 border-white"
                src={client.profile}
                alt=""
              />{" "}
            </div>
            <p className="mx-4 font-semibold my-auto">{client.username}</p>
          </div>
          <div
            data-modal-target="default-modal"
            data-modal-toggle="default-modal"
            className="w-2/4 flex justify-center mx-auto "
            onMouseEnter={() => setShowText(true)}
            onMouseLeave={() => setShowText(false)}
          >
            <motion.p
              className={`cursor-pointer my-auto text-md font-bold underline font-Outfit transition-opacity duration-300 ${
                showText ? "opacity-100" : "opacity-0"
              }`}
            >
              {" "}
              Start Conference
            </motion.p>
            <i
              data-modal-target="default-modal"
              data-modal-toggle="default-modal"
              onClick={resetAllState}
              className={`fa-duotone ease-in-out duration-300 ${
                showText && " rotate-180"
              } cursor-pointer mx-2 my-auto fa-video text-2xl`}
            />
          </div>
        </div>
        <hr />

        <div
          ref={chatBoxRef}
          className="bg-[#f5f7fb] py-1 chatBox min-h-96 max-h-96 mt-auto overflow-scroll overflow-x-hidden"
        >
          {messages.map((message) => {
            return (
              <>
                {message.from == userId ? (
                  <motion.div
                    variants={fadeIn("left", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true }}
                    className="flex  items-start justify-end gap-2.5 my-1"
                  >
                    <div>
                      <div className="flex bg-[#0087fd] flex-col ml-12 min-w-32 max-w-96 leading-1.5 p-4 border-gray-200  rounded-xl rounded-tr-none  dark:bg-gray-700">
                        <p className="text-sm break-words font-medium  text-white dark:text-white">
                          {message.body}
                        </p>
                      </div>
                      <p className="text-[10px] text-end text-slate-400">
                        {FormatDateTimeString(message.date as any)}
                      </p>
                    </div>
                    <img
                      className="w-8 h-8 mx-1 rounded-full"
                      src={userProfile}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    variants={fadeIn("right", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true }}
                    className="flex items-start gap-2.5 my-1 "
                  >
                    <img
                      className="w-8 h-8 mx-1 rounded-full"
                      src={client.profile}
                    />
                    <div>
                      <div className="flex flex-col break-words min-w-32  max-w-96 leading-1.5 mr-12  p-4 border-gray-300 bg-[#e1e5ec] rounded-xl rounded-tl-none dark:bg-gray-700">
                        <p className="text-sm break-words font-medium text-gray-900 dark:text-white">
                          {message.body}
                        </p>
                      </div>
                      <p className="text-[10px] text-slate-400">
                        {FormatDateTimeString(message.date as any)}
                      </p>
                    </div>
                  </motion.div>
                )}
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

            <input
              id="chat"
              // rows={1}
              type="text"
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

      
      <>
        <div
          id="default-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  <i className="fa-duotone fa-video fa-bounce text-2xl" /> Start
                  Video Conference.
                </h3>
                <button
                  type="button" ref={buttonRef}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}

              <div className="p-4 md:p-5 space-y-4 bg-gray-800">
                {calling && (
                  <>
                    <Lottie
                      options={noResponse ? defaultOptions2 : defaultOptions}
                      height={150}
                      width={150}
                    />
                    <p className="text-center text-red-400 font-semibold">
                      {noResponse ? "Call declined" : "Calling..."}
                    </p>
                    <div className="flex ">
                      <button onClick={rejectCall} className=" text-white mx-auto bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                        End Call
                      </button>
                    </div>{" "}
                  </>
                )}
                <div
                  className={`flex ${
                    !calling && "flex-col "
                  } justify-center w-full `}
                >
                  <div
                    className={`border-2 ${
                      !calling && "mx-auto"
                    } my-auto  rounded-full border-blue-600 `}
                  >
                    <img
                      className={`${
                        calling ? "h-8 w-8" : "h-28 w-28"
                      } rounded-full border-2 border-white`}
                      src={client.profile}
                      alt=""
                    />{" "}
                  </div>
                  <div className="my-auto  ">
                    <p
                      className={`mx-4 ${
                        calling ? "text-start" : "text-center"
                      } font-semibold text-slate-100 my-auto`}
                    >
                      <i className="fa-solid fa-badge-check text-blue-500" />{" "}
                      {client.username}
                    </p>
                    {/* <p className="mx-4 text-center text-sm text-slate-50 font-medium my-auto">
                    <i className="fa-solid fa-at " /> {client.email}
                  </p> */}
                  </div>
                </div>
                {!calling && (
                  <div className="flex items-center justify-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      type="button"
                      onClick={videoCallHandile}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Start Now
                    </button>
                    <button
                      
                      data-modal-hide="default-modal"
                      onClick={CloseModal}
                      type="button"
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Not now
                    </button>
                  </div>
                )}
              </div>
              {/* Modal footer */}
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default ChatBox;
