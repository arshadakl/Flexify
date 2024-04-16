import {motion} from "framer-motion"
import  CarouselSingle from "../../common/components/ExtraComponents/CarosuelSingle";
import { fadeIn } from "../../common/animations/Frame_Motion/variants";
import SellerDetails from "../../common/components/ExtraComponents/SellerDetails";

function SingleWorkSection({post}:{post:any}) {
  console.log(post);
  console.log(post[0]?.categoryNames,"category details");
  const selectedWork = post[0]
  // const {selectedWork} = useContext(AuthContext);
//   useEffect(()=>{
//     if(selectedWork){
        
//     }
//   },[])
    const images:any[] = [selectedWork?.image1,selectedWork?.image2,selectedWork?.image3]

  return (
    <>
    <div className="block w-full mx-auto p-6 bg-white font-poppins rounded  dark:border-gray-700 dark:hover:bg-gray-700">
          <div className="flex flex-col gap-5">
          <div className="flex">
              <motion.h1>
              <i className="fa-regular fa-house" />
              <span className="text-gray-300 mx-2 font-bold">/</span>
                {/* <motion.span></motion.span> */}
                <motion.span variants={fadeIn("right",0.2)} initial="hidden" whileInView={"show"} viewport={{once:true}}> {post[0]?.categoryNames[0]}</motion.span>
                <span className="text-gray-300 mx-2 ">/</span>
                <motion.span variants={fadeIn("right",0.4)} initial="hidden" whileInView={"show"} viewport={{once:true}}> {post[0]?.categoryNames[1]} </motion.span>
              </motion.h1>
            </div>
            <div className="flex">
              <p className="cursor-pointer font-semibold pb-0 text-3xl ">
                {selectedWork?.title}
              </p>
            </div>
            <hr />
            <p
              className="cursor-pointer flex items-center no-underline  hover:underline text-black" 
            >
              <div className=" ">
              <motion.img  
                alt="Placeholder"
                className="block object-cover w-16 h-16 rounded-[2px]  "
                src={selectedWork.user.profile}
              />
              </div>
              <motion.span variants={fadeIn("down",0.3)} className="ml-2  m-auto text-md">{selectedWork.user.username}</motion.span>
            </p>
            
            <div className="flex">
              <div className="container mx-auto">
                <CarouselSingle images={images} />
              </div>
            </div>

           
            

            <div className="flex">
              <div className=" w-full break-words">
                <h1 className="text-xl py-3">About this Work</h1>
                  <p className="text-gray-500">{selectedWork?.description} </p>
              </div>
            </div>
            <hr />
            <div className="flex ">
              <div className="w-full">
                
                <div className="relative   ">
                  <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                    <i className="fa-sharp fa-thin fa-calendar-day"></i>
                  </div>
                  <input readOnly
                    name="deliveryPeriod" value={`Efficient Completion Within   ${selectedWork?.deliveryPeriod as number} Business Days`}
                     disabled
                    aria-describedby="helper-text-explanation"
                    className="  bg-transparent  w-full text-gray-900 text-md  font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block  ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="mb-3">
                <label
                  htmlFor="default-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Requirements
                </label>
                <div className="relative w-full">
                {selectedWork?.logo ? <span className="bg-gray-100 text-gray-800 text-md font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Logo</span> : null}
                {selectedWork?.referenceMaterial ? <span className="bg-gray-100 text-gray-800 text-md font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Reference Materials</span> : null}

                </div>
              </div>
            </div>
            


            <div className="flex">
              <div className="">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Total Price
                </label>
                <>
                  <div className="relative w-36">
                    <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                      <i className="fa-regular fa-indian-rupee-sign"></i>
                    </div>
                    <input
                      type="number"
                      name="amount" disabled
                      min={100} value={selectedWork?.amount}
                      aria-describedby="helper-text-explanation"
                      className=" [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-lg font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </>
              </div>
            </div>

            <div className="flex">
              <div className="mb-3">
                <label
                  htmlFor="default-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tags
                </label>
                <div className="relative w-full">
                  {selectedWork?.tags[0]
                    .split(",").map((tag:string)=>{
                    return(
                      <span className="bg-gray-100 text-gray-800 text-md font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">#{tag}</span>
                    )
                  })}
                

                </div>
              </div>
            </div>




          </div>
        </div>
        <SellerDetails seller={selectedWork?.user} details={selectedWork?.freelancerdetails}/>
    </>
  )
}

export default SingleWorkSection