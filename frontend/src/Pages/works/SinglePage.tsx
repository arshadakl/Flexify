import { useEffect, useRef, useState } from "react";
import NavBar from "../../common/components/Navbar/NavBar";
import SinglePagePayment from "../../freelancers/components/SinglePagePayment";
import SingleWorkSection from "../../freelancers/components/SingleWorkSection";
import { IWork } from "../../interfaces/Freelancer";
import { useParams } from "react-router-dom";
import { getSingleWorkAPI } from "../../common/utils/APIs/FreelancerApi";
import Loading from "../../common/components/ExtraComponents/Loading";
import { initFlowbite } from "flowbite";
import { reportPost } from "../../common/utils/APIs/ClientApi";
import { IReport } from "../../interfaces/Client";
import { toast } from "sonner";
import Footer from "../../common/components/HomeComponents/Footer";

function SinglePage() {
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [selectedReson, setSelecterReson] = useState<string>("");
  const [post, setPost] = useState<IWork>();
  const { id } = useParams();
  const closeBTN = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const response = await getSingleWorkAPI(id);
        if (response.status) {
          setPost(response.data);
        }
      }
    };
    initFlowbite();
    fetchData();
  }, [id]);
  const handilRepot = async () => {
    if (selectedReson == "") {
      toast.warning("Please select a reson");
      return;
    }
    const formData = {
      reported_post_id: id as string,
      reason: selectedReson as string,
    };

    const response = await reportPost(formData as IReport);
    if (response.status) {
      toast.success("Post was successfully reported");
    } else {
      toast.error(response.error);
    }
    if (closeBTN.current) {
      closeBTN.current.click();
    }
  };
  // const handileReson = (e:SyntheticEvent)=>{

  // }
  const resons = [
    "Misrepresenting Skills or Experience",
    "Unrealistic Scope or Budget",
    "Inappropriate Content",
    "Copyright Infringement",
    "Suspicious Activity",
  ];
  return (
    <>
      {isLoad ? <Loading /> : null}

      <NavBar bg="white" fixed="none" />
      <div className="flex md:flex-row flex-col  md:w-5/6 w-6/6 mx-auto mt-5 gap-3 ">
        <div className="md:w-4/5 mb-5 ">
          {post && <SingleWorkSection post={post} />}
        </div>
        <div className="md:w-2/5 ">
          <div className=" w-full mt-16 px-1 border border-gray-300 rounded">
            {post && <SinglePagePayment setIsLoad={setIsLoad} post={post} />}
          </div>
          <div className="w-full  my-2  bg-gray-50 rounded">
            <div className="text-md font-bold px-2 py-5">
              <button
                type="button"
                data-modal-target="select-modal"
                data-modal-toggle="select-modal"
                className="text-gray-950 border border-gray-800 w-full  hover:bg-[#24292F]  font-medium rounded-md text-sm px-5 py-3 inline-flex hover:text-white items-center dark:focus:ring-gray-500 dark:hover:bg-[#fff]/30 me-2 mb-2"
              >
                <p className="w-3/5 text-end">
                  <i className="fa-light fa-bug mx-1" /> Report Work
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-6" />
      <Footer/>

      {/* Main modal */}
      <div
        id="select-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-md font-semibold text-red-700  dark:text-white">
                <i className="fa-regular fa-message-exclamation mx-1" /> Reasons
                for Reporting
              </h3>
              <button
                type="button"
                ref={closeBTN}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="select-modal"
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
            <div className="p-4 md:p-5">
              <ul className="space-y-4 mb-4">
                {resons.map((reson: string, index: number) => {
                  return (
                    <li key={index}>
                      <input
                        type="radio"
                        id={reson}
                        name="job"
                        onChange={() => setSelecterReson(reson)}
                        defaultValue="job-1"
                        className="hidden peer"
                      />
                      <label
                        htmlFor={reson}
                        className="inline-flex items-center justify-between w-full px-5 py-3 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                      >
                        <div className="block">
                          <div className="w-full text-md font-semibold">
                            {reson}
                          </div>
                        </div>
                      </label>
                    </li>
                  );
                })}
              </ul>
              <button
                disabled={selectedReson == "" ? true : false}
                onClick={handilRepot}
                className={`text-white inline-flex w-full justify-center ${
                  selectedReson == ""
                    ? "bg-slate-200"
                    : "bg-gray-900 hover:bg-gray-700"
                } focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center  `}
              >
                {selectedReson == "" ? "Select your Reasons" : "Report"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePage;
