import Lottie from "react-lottie";
import animationData from "../../animations/payment-success2.json";
import { useNavigate } from "react-router-dom";

function PaymentSuccces() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const navigate = useNavigate()
  return (
    <>
      <div className="w-screen h-screen bg-slate-50 grid justify-items-center content-center">
        <div className="bg-white  md:w-2/6 w-5/6 h-full shadow rounded  py-16">
          <div className="  w-full ">
            <h1 className="text-xl font-semibold font-poppins text-center">
              Payment Successful
            </h1>
          </div>
          <Lottie options={defaultOptions} height={200} width={200} />
          <div className=" text-center w-full py-2">
            <p className="py-2">Your payment has been received </p>
            <button onClick={()=>navigate('/client/orders')} className=" py-2 px-16 me-2 mb-2 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400">
              {/* Your payment has been received */}
              Go to Orders
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccces;
