import { useEffect, useState } from "react";
import {  singleOrderDetails, submitOrderWork } from "../../common/utils/APIs/FreelancerApi";
import { useLocation, useNavigate } from "react-router-dom";
import { FormatDateString } from "../../common/utils/Services/dateFormater";
import { toast } from "sonner";

function OrderSubmition() {
    const navigate = useNavigate()
    const [work,setWork] = useState<any>()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const workId = queryParams.get("id");
    const [file,setFile] = useState<File | string>("")
    const [description,setDescription] = useState<string>("")
    useEffect(() => {
      const fetchData = async ()=>{
        const response = await singleOrderDetails(workId as string)
        console.log(response,"response");
        setWork(response.data)
        
      }
      fetchData()
    }, [workId])  
    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
      };

      const validation = (file:File | string,description:string)=>{
        if(!file){
            return "please upload file"
        }
        if(!description.trim()){
            return "Enter the description"
        }
        return "success"
      }

      const handleSubmit = async ()=>{
        const isValid = validation(file,description)
        if(isValid!=="success"){
            toast.warning(isValid)
            return
        }
        const formData = new FormData();
        formData.append("file",file as File)
        formData.append("description",description as string)
        formData.append("clientId",work.clientId)
        formData.append("orderId",work._id)
        formData.append("freelancerId",work.freelancerId)
        formData.append("workId",work.workId)
        const response =  await submitOrderWork(formData)
        if(response.status){
            navigate('/dashboard')
        }else{
            toast.warning(response.error)
        }
      }
  return (
    <>
      {work && <div className="bg-slate-100 pt-28 w-full py-5  min-h-screen font-poppins">
        <div className=" md:w-4/6 w-11/12  mx-auto">
          <h1 className="text-2xl font-poppins font-medium">Manage Orders</h1>
          <hr className="my-2" />
          <div className="bg-white border px-5 py-5 ">
            <h1 className="text-md text-2xl mx-5">
              ID :{" "}
              <span className="font-medium text-gray-500">#W123151455212</span>
            </h1>
            <p className="mx-5 ">
              <i className="fa-duotone fa-briefcase " /> Client Name
            </p>
            <hr className="my-3" />
            <div className="relative overflow-x-auto mx-5 my-3">
              <table className="w-full text-sm border  border-gray-400 text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs border  border-gray-400 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      work 
                    </th>
                    <th scope="col" className="px-6 py-4">
                    Deadline
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                     {work?.category[1]}
                    </th>
                    <td className="px-6 py-4 ">{FormatDateString(work.deadline)}</td>
                    <td className={`px-6 py-4 capitalize ${work.status ? "text-yellow-600" : "text-green-600"}`}>{work.status}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[13px] py-2 mx-5 text-gray-500 font-light">
              * Upload Work File here
            </p>
            <div className="mx-5 flex">
              <div>
                <label
                  htmlFor="material"
                  className="text-gray-900 border cursor-pointer border-gray-500 border-dashed bg-gray-200 hover:bg-gray-200  font-medium rounded text-sm px-8 py-4 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
                >
                  <i className="fa-sharp fa-solid fa-link mx-2" /> Upload Work
                </label>
                <p className="text-[12px]">
                {file !== "" ? (
                      <span className="text-green-600">
                        <i className="fa-light fa-circle-check mx-1"></i>File
                        Selected
                      </span>
                    ) : (
                      <span className="text-red-600">
                        <i className="fa-light fa-circle-xmark mx-1" />
                        File Not Selected
                      </span>
                    )}
                </p>
                <input onChange={handleFileChange} id="material" type="file" className="hidden" />
              </div>
            </div>
            <div className="mx-5 flex flex-col mt-5">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
                value={description} onChange={(e)=>setDescription(e.target.value)}
              />
            </div>

            <hr className="my-5" />

            <div className="mx-5 flex justify-end" onClick={handleSubmit}>
              <button className="text-white hover:text-gray-200  my-4 bg-logo-green   font-medium rounded text-sm px-8 py-2.5 text-center inline-flex items-center  me-2 mb-2">
              Deliver Order
              </button>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}

export default OrderSubmition;
