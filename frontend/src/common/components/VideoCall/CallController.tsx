import React, { useState, useEffect } from "react";
import {
  CallControls,
  CallingState,
  ParticipantView,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCall,
  useCallStateHooks,
  User,
  StreamVideoParticipant,
  // SearchResults
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import store from "../../../Redux/store";
import { videocallAuthAPI } from "../../utils/APIs/FreelancerApi";
import VideoLoading from "../ExtraComponents/VideoLoading";
const URL = new URLSearchParams(window.location.search);

type ExtendedUser = User & {
  id: string;
  name: string;
  image: string;
};

const VideoCallComponent: React.FC = () => {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<any | null>(null);
  const state = store.getState();
  const freelancer = state.freelancer.freelancer;
  const apiKey = import.meta.env.VITE_VIDEO_CALL_API as string;
  const userId = freelancer?._id as string;
  const callId = URL.get("id");

  useEffect(() => {
    const authCall = async () => {
      try {
        const response = await videocallAuthAPI(userId);
        if (response.status) {
          const user: ExtendedUser = {
            id: userId,
            name: freelancer?.username as string,
            image: freelancer?.profile as string,
          };
          const token = response.token as string;

          const newClient = new StreamVideoClient({ apiKey, user, token });
          const newCall = newClient.call("default", callId as string);
          await newCall.join({ create: true });
          setClient(newClient);
          setCall(newCall);
        } else {
          throw new Error("Authentication failed");
        }
      } catch (error) {
        console.error("Error during authentication:", error);
      }
    };

    authCall();
  }, [userId]);

  // useEffect(() => {

  //   return () => {
  //     if (call) {
  //       const tracks = call.localStream.getTracks();
  //       tracks.forEach((track: MediaStreamTrack) => {
  //         track.stop();
  //       });
  //     }
  //   };
  // }, [call]);

  console.log(call, client, "this is the client and caller");

  if (!call || !client) {
    return (
      <div>
        <VideoLoading type="start" />
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
};

const MyUILayout: React.FC = () => {
  const call = useCall();
  // const { callingState, participantCount } = useCallStateHooks();
  // // Hooks should be used directly, not destructured from the returned object of another hook.
  // const localParticipant = useLocalParticipant();
  // const remoteParticipants = useRemoteParticipants();

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  // const participantCount = useParticipantCount();

  // const localParticipant = useLocalParticipant();
  // const remoteParticipants = useRemoteParticipants();
 

  if (callingState !== CallingState.JOINED) {
    call?.endCall()
    return (
      <div>
        <VideoLoading type="end" />
      </div>
    );
  }

  return (
    <StreamTheme>
      <div className="p-5 w-36">
        <img
          src={`/images/FlexifyWhite.png`}
          className="w-36 "
          alt="Flexify Logo"
        />
        <p className="text-md text-center font-light font-Outfit">Conference</p>
      </div>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls />
    </StreamTheme>
  );
};

export const MyFloatingLocalParticipant: React.FC<{
  participant?: StreamVideoParticipant;
}> = ({ participant }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "15px",
        left: "15px",
        width: "240px",
        height: "135px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 3px",
        borderRadius: "12px",
      }}
    >
      {participant && <ParticipantView muteAudio participant={participant} />}
    </div>
  );
};

export default VideoCallComponent;
