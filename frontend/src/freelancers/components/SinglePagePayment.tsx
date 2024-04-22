
import {loadStripe} from '@stripe/stripe-js';
import { checkoutAPI } from '../../common/utils/APIs/ClientApi';
import store from '../../Redux/store';
import { toast } from 'sonner';


function SinglePagePayment({post,setIsLoad}:{post:any,setIsLoad:any}) {
  // const { selectedWork } = useContext(AuthContext);
  const state = store.getState();
  const freelancer = state.freelancer.freelancer;
  const rol = freelancer?.role;
  console.log(rol," : USer Role");

  const selectedWork = post[0]
  

  const MakePayment = async () => {
    if(rol!=="client"){
      toast.warning("only can purchase for clients")
      return
    }
    const publicKey = import.meta.env.VITE_STRIPE_PUBLISHED_KEY;
    console.log(publicKey);
    setIsLoad(true)

    const stripe = await loadStripe(publicKey);
    console.log(stripe);
    const sessionResponse = await checkoutAPI(selectedWork._id);
    const sessionId = sessionResponse.id;
    setIsLoad(false)
    const result = stripe?.redirectToCheckout({
       sessionId: sessionId,
    });
   
    console.log(result);
   };
   
  return (
    <>

      <div className="flex flex-col font-poppins">
        <div className="text-md font-bold  py-5">
          <p className="mx-5">Price</p>
        </div>
        <hr className="border-[1px] border-gray-950 " />
        {/* <div className="   flex py-5 mx-5">
          <p>Work Amount</p>
          
        </div> */}
        <div className=" font-bold  flex py-5 justify-around">
          <p>Work Amount</p>
          <p className="mx-5">
            <i className="fa-sharp fa-regular fa-indian-rupee-sign mx-1" />
            {selectedWork?.amount}
          </p>
        </div>
        <div className="text-md font-bold px-2 py-5">
          {rol === "client" ? <button onClick={MakePayment}
            type="button"
            className="text-white bg-[#24292F] w-full  hover:bg-[#24292F]/90  font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2" >
            <p className="w-3/5 text-end">Continue</p>
            <i className="w-2/5 text-end mx-2 fa-duotone fa-arrow-right" />
          </button>:
          <button 
            type="button" disabled={true}
            className="text-white  w-full  bg-[#24292F]/60  font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2" >
            <p className="w-3/5 text-end">Continue</p>
            <i className="w-2/5 text-end mx-2 fa-duotone fa-arrow-right" />
          </button>}
        </div>
      </div>
    </>
  );
}

export default SinglePagePayment;
