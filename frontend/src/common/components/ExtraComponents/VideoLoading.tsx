import { useNavigate } from "react-router-dom";
import animationData from "../../animations/connecting.json";
import animationData2 from "../../animations/call-ending.json";
import Lottie from "react-lottie";
import { useEffect } from "react";

function VideoLoading({ type }: { type: string }) {
  const defaultOptions = {
    loop: type=="start" ? true : false,
    autoplay: true,
    animationData: type=="start" ? animationData : animationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const navigate = useNavigate();


  useEffect(() => {
    if(type=="end"){
     setTimeout(() => {
        navigate('/')
     }, 5000);
    }
  }, [])
  

  return (
    <>
      <div className="fixed flex items-center justify-center w-full z-40 top-0 h-full opacity-80  border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div role="status">
          <div className="w-screen flex bg-slate-50 h-screen">
            {type !== "start" ? (
              <>
              <div className="felx flex-col my-auto mx-auto ">
                <div className="flex flex-col h-96 w-full  my-auto">
                  <Lottie options={defaultOptions} height={450} width={450} />
                  <p className="text-center font-medium text-xl fa-fade">
                    Meeting End
                  </p>
                </div>
                <div className="fixed w-full left-0 mx-auto bottom-0 h-auto flex 0">
                  <img
                    src={`/images/FlexifyBlack.png`}
                    className="w-36 mx-auto"
                    alt="Flexify Logo"
                  />
                </div>
              </div>
            </>
            ) : (
              <>
                <div className="felx flex-col my-auto mx-auto ">
                  <div className="flex flex-col h-96 w-full  my-auto">
                    <Lottie options={defaultOptions} height={250} width={250} />
                    <p className="text-center font-medium text-xl fa-fade">
                      Connnecting...
                    </p>
                  </div>
                  <div className="fixed w-full left-0 mx-auto bottom-0 h-auto flex 0">
                    <img
                      src={`/images/FlexifyBlack.png`}
                      className="w-36 mx-auto"
                      alt="Flexify Logo"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoLoading;
