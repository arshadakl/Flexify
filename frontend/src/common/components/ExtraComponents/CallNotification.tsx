import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../animations/Frame_Motion/variants";
import socket from "../../utils/config/socket";
import store from "../../../Redux/store";
import ringSound from "../../Audio/videoCallRing.mp3";
import { uid } from 'uid';
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function CallNotification() {
  const navigate = useNavigate()
  const [ring, setRing] = useState<boolean>(false);
  const [calling, setCalling] = useState<boolean>(false);
  const state = store.getState();
  const freelancer = state.freelancer.freelancer;
  const userId = freelancer?._id;
  const [client, setClient] = useState({ name: "", senderId: "" });
  const audioPlayer = useRef<HTMLAudioElement>(null);
  const playAudio= ()=> {
    if (audioPlayer.current) {
      audioPlayer.current.play();
    }
  }
  function puseAudio() {
    if (audioPlayer.current) {
      audioPlayer.current.pause();
    }
  }
  useEffect(() => {
   if(ring){
    playAudio()
   }else{
    puseAudio()
   }
  }, [ring])
  

  useEffect(() => {
    playAudio()
    socket.on("call-offer", (data) => {
      setClient({ name: data.name, senderId: data.senderId });
      setRing(true);
      
    });

    // socket.on("call-Accept", (data) => {
    //   setClient({ name: data.name, senderId: data.senderId });
    //   setRing(true);
    // });

    socket.on("call-reject", () => {
      setRing(false);
    });
  }, []);

  //   useEffect(() => {
  //     socket.on("call-offer", ({name,clientId}) => {
  //         setClient({name,clientId})
  //       setRing(true);
  //     });
  //   }, []);

  //for reject calllll
  const rejectCall = () => {
    setRing(false);
    socket.emit("rejectReq", {
      senderId: userId,
      receiverId: client.senderId,
    });
  };
  //for Accept calllll
  const AcceptCall = () => {
    setRing(false);
    const callId = uid()
    socket.emit("AcceptReq", {
      senderId: userId,
      receiverId: client.senderId,
      callId: callId,
    });
    navigate(`/videocall?id=${callId}`)
  };

  return (
    <>
      {ring && (
        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true }}
          id="toast-notification"
          style={{ zIndex: 100 }}
          className="  bg-green-100 backdrop-filter backdrop-blur-xl bg-opacity-30 border  fixed top-10 left-10 right-0 w-96 p-4 text-gray-900  rounded-lg shadow dark:bg-gray-800 dark:text-gray-300"
          role="alert"
        >
          <audio ref={audioPlayer} src={ringSound} loop  />
          <div className="flex items-center mb-3">
            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
              <i className="fa-thin fa-circle-video fa-shake font-medium" />{" "}
              Video Conference Request
            </span>
          </div>
          <div className="flex items-center">
            <div className="relative inline-block shrink-0 fa-shake">
              <img
                className="w-12 h-12 rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKOvkjAOTboz-CFuaaD75o0DGnuDoQHV9mzENNm_uxbg&s"
                alt="Jese Leos image"
              />
              <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 text-blue-600 rounded-full">
                <i className="fa-solid fa-circle-video" />

                <span className="sr-only">Message icon</span>
              </span>
            </div>
            <div className="ms-3 text-sm font-normal">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {client.name}
              </div>
              <div className="text-sm font-normal">Incoming call</div>
              <span className="text-xs font-medium text-blue-600 dark:text-blue-500">
                Answer if available.
              </span>
            </div>
          </div>
          <>
            <div className="grid grid-cols-2 gap-2 my-3">
              <div>
                <p onClick={AcceptCall} className="cursor-pointer inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                  Accept
                </p>
              </div>
              <div>
                <p
                  onClick={rejectCall}
                  className="cursor-pointer inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                >
                  Reject
                </p>
              </div>
            </div>
          </>
        </motion.div>
      )}
    </>
  );
}

export default CallNotification;
