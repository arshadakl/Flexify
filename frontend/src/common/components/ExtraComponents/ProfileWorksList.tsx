import { useEffect, useState } from "react";
import { IWork } from "../../../interfaces/Freelancer";
import { deleteWork, getUsrAllWork } from "../../utils/APIs/FreelancerApi";
import { ShortenDescription } from "../../utils/Services/shortenDescription";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { initFlowbite } from "flowbite";

function ProfileWorksList() {
  const [wordData, setWordData] = useState<IWork[]>();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      const response = await getUsrAllWork();
      setWordData(response.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(wordData, "work data");
  }, [wordData]);


  const handdileDelete = async(id:any)=>{
    const response = await deleteWork(id)
    if(response.status){
      setWordData(response.data)
      toast.success("Work deleted successfully")
    }else{
      toast.warning(response.error)
    }
  }
  useEffect(() => {
    initFlowbite()
  }, [])

  return (
    <>
      <div className="w-full flex min-h-full  flex-wrap gap-5 ">
        {/* cards */}

        <div onClick={()=>navigate('/post')} className="w-1/5 pb-2 flex flex-col  m-1 border border-l-stone-300 cursor-pointer rounded   shadow duration-150  hover:shadow">
          <div className="m-auto text-xl text-center">
          <i className="fa-solid text-5xl fa-circle-plus" />
            <p className="text-[11px] font-normal">Create a new Work Post</p>
          </div>
        </div>
        {wordData?.map((work) => {
          return (
            <div className="w-1/5 pb-2 relative   m-1 border border-l-stone-300 cursor-pointer rounded   shadow duration-150  hover:shadow">

              <img
                className="w-full  object-cover object-center"
                src={work.image1}
                alt="product"
              />
              <p className="my-1 pl-4 text-sm font-bold text-gray-500">
                {ShortenDescription(work.title, 20)}
              </p>
              {/* <div className="static   "> */}
              {/* </div> */}
              {/* {work.tags[0]
                .split(",")
                .slice(0, 2)
                .map((tag) => {
                  return (
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-1.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                      {tag}
                    </span>
                  );
                })} */}

              <p className="ml-4 text-xl font-semibold text-gray-800"></p>
              <button data-modal-target={work?._id}
    data-modal-toggle={work?._id}  className="fa-solid fa-trash-can absolute  left-1 top-1 text-white shadow" />
              
                {/* modal */}
                <div
    id={work?._id}
    tabIndex={-1}
    className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div className="relative p-4 w-full max-w-md max-h-full">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide={work?._id}
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
        <div className="p-4 md:p-5 text-center">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this work?
          </h3>
          <button
            data-modal-hide={work?._id}
            type="button" onClick={()=>handdileDelete(work?._id)}
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
          >
            Yes, I'm sure
          </button>
          <button
            data-modal-hide={work?._id}
            type="button"
            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  </div>



            </div>
          );
        })}

        {/* cards */}
      </div>
    </>
  );
}

export default ProfileWorksList;
