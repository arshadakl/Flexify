import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  requirementsSubmitAPI,
  singleorderDetailsAPI,
} from "../../common/utils/APIs/ClientApi";
import { IOrder } from "../../interfaces/Client";
import { FormatDateString } from "../../common/utils/Services/dateFormater";
import { toast } from "sonner";

function UploadRequirements() {

  const navigate = useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("order");
  const [order, setOrder] = useState<IOrder>();
  const [referenceMaterialFile, setReferenceMaterialFile] = useState<
    File | string
  >("");
  const [logoFile, setLogoFile] = useState<File | string>("");
  const [questionnaireResponses, setQuestionnaireResponses] = useState<
    { question: string; answer: string }[]
  >([]);
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (order) return;
      const response = await singleorderDetailsAPI(orderId as string);
      if (response.status) {
        setOrder(response.order);
      }
    };
    fetchOrders();
  }, [orderId]);

  const handleReferenceMaterialChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setReferenceMaterialFile(event.target.files[0]);
    }
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setLogoFile(event.target.files[0]);
    }
  };

  // const handleQuestionnaireChange = (index: number, response: string) => {
  //   const updatedResponses = [...questionnaireResponses];
  //   updatedResponses[index] = { ...updatedResponses[index], answer: response };
  //   setQuestionnaireResponses(updatedResponses);
  // };

  const handleQuestionnaireChange = (index: number, response: string) => {
    const question = order?.WorkDetails.questionnaire[index] || ''; 
    const updatedResponses = [...questionnaireResponses];
    updatedResponses[index] = { question, answer: response };
    setQuestionnaireResponses(updatedResponses);
};



  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const validateRequirement = (order: IOrder, data: any) => {
    
    if (order.WorkDetails.logo && !data.logoFile) {
      return "Please Upload Logo file";
    }

    if (order.WorkDetails.referenceMaterial && !data.referenceMaterialFile) {
      return "Please Upload Reference Material file";
    }
    if (!data.description.trim() || data.description.length < 5) {
      return "Description must be at least 5 characters";
    }

    const allQuestionsAnswered = order?.WorkDetails.questionnaire.every((question, index) => {
       console.log(question[0],"thisi i s question");
       
      const response = data.questionnaireResponses[index];
      return response && response.answer.trim() !== '';
  });

  if (!allQuestionsAnswered) {
      return "Please provide an answer for all questions in the questionnaire"
  }
    return "success";
  };

  const handleSubmit = async () => {
    const data = {
      description,
      logoFile,
      referenceMaterialFile,
      questionnaireResponses,
    };
    const isValid = validateRequirement(order as IOrder, data);
    console.log(isValid);
    
    if (isValid !== "success") {
      toast.warning(isValid);
    } else {
      const formData = new FormData();
      formData.append("description", description);
      if(order?.freelancerId) formData.append("freelancerId", order?.freelancerId);
      if(order?._id ) formData.append("orderId", order?._id);
      if(order?.workId) formData.append("workId", order?.workId);
      if(order?.clientId) formData.append("clientId", order?.clientId);
      if (logoFile) formData.append("logo", logoFile);
      if (referenceMaterialFile) formData.append("referenceMaterial", referenceMaterialFile);
      formData.append("answers", JSON.stringify(questionnaireResponses));
      const response = await requirementsSubmitAPI(formData);
      

      if(response.status){
        navigate('/client/orders')
        toast.success("Work Requirements Added Successfully")
      }else{
        toast.error(response.error)
      }
    }
  };

  return (
    <>
      <div className="bg-slate-100 pt-28 w-full py-5  min-h-screen font-poppins">
        <div className=" md:w-4/6 w-11/12  mx-auto">
          <h1 className="text-xl font-poppins">Submit Work Requirement</h1>
          <hr className="my-2" />
          <div className="bg-white border px-5 py-5 ">
            <h1 className="text-md text-2xl mx-5">
              ID :{" "}
              <span className="font-medium text-gray-500">#W123151455212</span>
            </h1>
            <p className="mx-5 ">
              <i className="fa-duotone fa-briefcase " /> Freelancer NAme
            </p>
            <hr className="my-3" />
            <div className="relative overflow-x-auto mx-5 my-3">
              <table className="w-full text-sm border  border-gray-400 text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs border  border-gray-400 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Work
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Work Duration
                    </th>
                    <th scope="col" className="px-6 py-4">
                      order date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {order?.category[1]}
                    </th>
                    <td className="px-6 py-4">
                      {order?.WorkDetails.deliveryPeriod} Days
                    </td>
                    <td className="px-6 py-4">
                      {FormatDateString(order?.date as any)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {order?.WorkDetails.logo ||
              (order?.WorkDetails.referenceMaterial && (
                <div className="py-5 mx-5 w-full">
                  <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    <i className="fa-regular fa-circle-exclamation mr-2 text-yellow-500" />
                    Requrements
                  </h2>
                  <ul className="w-full space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                    {order?.WorkDetails.logo && <li>Reference materials</li>}
                    {order?.WorkDetails.referenceMaterial && (
                      <li>Logo required, upload reference for best design</li>
                    )}
                  </ul>
                </div>
              ))}
            <p className="text-[13px] py-2 mx-5 text-gray-500 font-light">
              * Upload requirements
            </p>
            <div className="mx-5 flex">
              {order?.WorkDetails.referenceMaterial && (
                <div>
                  <label
                    htmlFor="material"
                    className="text-gray-900 border cursor-pointer border-gray-500 border-dashed bg-gray-200 hover:bg-gray-200  font-medium rounded text-sm px-8 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
                  >
                    <i className="fa-light fa-file-arrow-up mx-2" /> Reference
                    material
                  </label>
                  <p className="text-[12px]">
                    {referenceMaterialFile != "" ? (
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
                  <input
                    onChange={handleReferenceMaterialChange}
                    id="material"
                    type="file"
                    className="hidden"
                  />
                </div>
              )}
              {order?.WorkDetails.logo && (
                <div>
                  <label
                    htmlFor="logo"
                    className="text-gray-900 border cursor-pointer border-gray-500 border-dashed bg-gray-200 hover:bg-gray-200  font-medium rounded text-sm px-8 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
                  >
                    <i className="fa-light fa-file-arrow-up mx-2" /> Logo
                  </label>
                  <p className="text-[12px]">
                    {logoFile != "" ? (
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

                  <input
                    id="logo"
                    accept="image/*"
                    onChange={handleLogoChange}
                    type="file"
                    className="hidden"
                  />
                </div>
              )}
            </div>
            <hr className="my-5" />
            {order?.WorkDetails.questionnaire[0] && (
              <div className="mx-5">
                <h1 className="text-md  my-3">
                  <i className="fa-solid fa-clipboard-question"></i>{" "}
                  Questionnaires
                </h1>
                {order?.WorkDetails.questionnaire.map((que, index) => {
                  return (
                    <>
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900 mt-2 dark:text-white"
                      >
                        {index + 1} . {que}
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                        value={questionnaireResponses[index]?.answer || ""}
                        onChange={(e) =>
                          handleQuestionnaireChange(index, e.target.value)
                        }
                      />
                    </>
                  );
                })}
              </div>
            )}
            <hr className=" m-5" />
            <div className="mx-5">
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
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </>
            </div>
            <div className="mx-5">
              <button
                onClick={handleSubmit}
                className="text-white hover:text-gray-200  my-4 bg-logo-green   font-medium rounded text-sm px-8 py-2.5 text-center inline-flex items-center  me-2 mb-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadRequirements;
