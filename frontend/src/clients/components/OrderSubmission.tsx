import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { addRatingAPI, deliverdworkAPI, downloadsubmissionFileAPI, manageApprovalAPI } from "../../common/utils/APIs/ClientApi";
import { toast } from "sonner";
import Loading from "../../common/components/ExtraComponents/Loading";

function OrderSubmission() {
    const [isLoad,setIsLoad] = useState<Boolean>(false)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("id");
  const [work, setWork] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await deliverdworkAPI(orderId as string);
      console.log(response, "response");
      setWork(response.details);
    };
    fetchData();
  }, [orderId]);

  const handileDownload = async()=>{
    try {
        const response = await downloadsubmissionFileAPI(work._id)
        if(response=="downloaded"){
            console.log("streem data get");
        }    
      } catch (error) {
        console.error('Error downloading file:', error);
      }
  }

  const HandileApproval = async(status:string) => {
    try {
        setIsLoad(true)
        const response = await manageApprovalAPI(work._id, status,work.orderId);
        if(response.status){        
            setIsLoad(false)
            console.log(response.details);
            
            setWork(response.details);
            toast.success(`work ${response.details.status}`)
        }
    } catch (error) {
        
    }
  }

  const manageRating = async()=>{
    const response = await addRatingAPI()
  }

  
  return (
    <>
        {isLoad ? <Loading/> : null}

      {work && (
        <div className="bg-slate-100 pt-28 w-full py-5  min-h-screen font-poppins">
          <div className=" md:w-4/6 w-11/12  mx-auto">
            <h1 className="text-2xl font-poppins font-medium">
              Delivered Work
            </h1>
            <hr className="my-2" />
            <div className="bg-white border px-5 py-10 ">
              <div className="flex">
                <div className="w-2/4">
                  <h1 className="text-md text-2xl mx-5">
                    ID :{" "}
                    <span className="font-medium text-gray-500">
                      #W123151455212
                    </span>
                  </h1>
                  <p className="mx-5 ">
                    <i className="fa-duotone fa-briefcase " /> Freelancer :{" "}
                    {work.freelancer[0].username}
                  </p>
                </div>
                <div className="w-2/4 flex justify-end px-5 ">
                  <div className="border border-gray-400 rounded-full min-w-2/4 h-8 flex items-center px-2">
                    {work.status=="approved" ? <>
                    <span className="w-5 h-5 rounded-full bg-green-600 p-1 mr-3"></span>
                    <p className="text-sm">
                      Approved{" "}
                    </p>
                    </>:
                    <>
                    <span className="w-5 h-5 rounded-full bg-[#FFB62A] p-1 mr-3"></span>
                    <p className="text-sm">
                      freelancer waiting for your approval{" "}
                    </p>
                    </>}
                  </div>
                </div>
              </div>
              <hr className="my-3" />
              <div className="relative overflow-x-auto mx-5 my-3">
                <table className="w-full text-sm border  border-gray-400 text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs border  border-gray-400 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Work
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Duration
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {work?.orderDetails[0].category[1]}
                      </th>
                      <td className="px-6 py-4">
                        {work?.orderDetails[0].WorkDetails.deliveryPeriod} Days
                      </td>
                      <td className="px-6 py-4">
                        {work?.orderDetails[0].amount}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-[13px] py-2 mx-5 text-gray-500 font-medium">
                * Download your Work File
              </p>
              <div className="mx-5 flex">
                <div>
                 
                    <label onClick={handileDownload} className="text-gray-900 border cursor-pointer border-gray-500 border-dashed bg-gray-200 hover:bg-gray-200 font-medium rounded text-sm px-8 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                      <i className="fa-light fa-file-arrow-down mx-2" />{" "}
                      Download here
                    </label>
                </div>
              </div>
              <div className="mx-5 flex justify-end">
            {/* i want to manage buttons based on the aproval status */}
               { work.status!=="approved" && <button onClick={()=>HandileApproval("approved")} className="text-white hover:text-gray-200  my-4 bg-logo-green   font-medium rounded text-sm px-8 py-2.5 text-center inline-flex items-center  me-2 mb-2">
                  Approve this work
                </button>}
              </div>
              {/* <hr className=" m-5" /> */}
              {/* <div className="mx-5">
              <>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your about work "
                  onChange={(e) => console.log(e.target.value)} // Add onChange event handler
                />
              </>
            </div>
            <div className="mx-5">
              <button className="text-white hover:text-gray-200  my-4 bg-logo-green   font-medium rounded text-sm px-8 py-2.5 text-center inline-flex items-center  me-2 mb-2">
                Submit
              </button>
            </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderSubmission;
