import { useLocation, useNavigate } from "react-router-dom";
import { getSingleWork, updateWorkAPI } from "../../common/utils/APIs/FreelancerApi";
import { useEffect, useState } from "react";
import { IWork } from "../../interfaces/Freelancer";

function PostEditComponent() {

    
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const workID = queryParams.get("id");
    const navigate = useNavigate()
  // const [post,setPost] = useState<IWork>()
  // useEffect(() => {
  //     const fetchOrders = async () => {
  //       if (!workID) return;
  //       const response = await getSingleWork(workID as string);
  //       console.log(response);

  //       if (response.status) {
  //         setPost(response.post);
  //       }
  //     };
  //     fetchOrders();
  //   }, [workID]);

  //   const [formData,setFormData] = useState({
  // title: post?.title,
  // tags: post?.tags,
  // deliveryPeriod: post?.deliveryPeriod,
  // referenceMaterial: post?.referenceMaterial,
  // logo: post?.logo,
  // description: post?.description,
  // questionnaire: post?.questionnaire,
  // amount: post?.amount,
  //   })

  const [post, setPost] = useState<IWork>();
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const fetchOrders = async () => {
      if (!workID) return;
      const response = await getSingleWork(workID as string);
      console.log(response);
      if (response.status) {
        setPost(response.post);
        setFormData({
          title: response.post?.title,
          tags: response.post?.tags,
          deliveryPeriod: response.post?.deliveryPeriod,
          referenceMaterial: response.post?.referenceMaterial,
          logo: response.post?.logo,
          description: response.post?.description,
          questionnaire: response.post?.questionnaire,
          amount: response.post?.amount,
        });
      }
    };
    fetchOrders();
  }, [workID]);

//   const [newQuestion, setNewQuestion] = useState("");

//   const handleAddQuestion = () => {
//     if (newQuestion.trim() !== "" && !questions.includes(newQuestion.trim())) {
//       setFormData([...questions, newQuestion.trim()]);
//       setNewQuestion("");
//       // handleUpdateDetails();
//     }
//   };
//   const handleDeleteQuestion = (index: number) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions.splice(index, 1);
//     setQuestions(updatedQuestions);
//     // handleUpdateDetails();
//   };

const handileSubmite = async() =>{
    const response = await updateWorkAPI(formData,post?._id as string)
    if(response.status){
        navigate('/my-post')
    }

} 
  return (
    <>
      <div className="w-full pt-32 bg-slate-100 min-h-[80vh] py-5">
        <h1 className="  md:w-3/5 w-5/6 mx-auto text-xl py-3 font-bold">
          Edit Post{" "}
        </h1>
        <div className="block md:w-3/5 w-5/6 mx-auto p-6 bg-white border border-gray-200 rounded   dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              {/* <p className="cursor-pointer font-semibold pb-0 text-3xl ">
                {post?.title}
              </p> */}
              <label
                htmlFor="message"
                className="text-start text-md   block mb-2 font-bold text-gray-900 dark:text-white"
              >
                Work title
              </label>
              <textarea
                id="message"
                rows={2}
                value={formData.title}
                name="title"
                onChange={(e) =>
                  setFormData((prevDetails: any) => ({
                    ...prevDetails,
                    title: e.target.value,
                  }))
                }
                className="block p-2.5 w-full font-semibold text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="I Will do something I'm really good at.."
              />
            </div>

            <div className="flex">
              <div className=" w-full break-words">
                <label
                  htmlFor="message"
                  className="text-start text-md   block mb-2 font-bold text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="message"
                  onChange={(e) =>
                    setFormData((prevDetails: any) => ({
                      ...prevDetails,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  value={formData.description}
                  name="title"
                  className="block p-2.5 w-full font-semibold text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="I Will do something I'm really good at.."
                />
              </div>
            </div>
            <div className="flex">
              <div className="mb-3">
                <label
                  htmlFor="default-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Work Delivery time period (Day)
                </label>
                <div className="relative w-32">
                  <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                    <i className="fa-sharp fa-thin fa-calendar-day"></i>
                  </div>
                  <input
                    name="deliveryPeriod"
                    onChange={(e) =>
                      setFormData((prevDetails: any) => ({
                        ...prevDetails,
                        deliveryPeriod: e.target.value,
                      }))
                    }
                    value={formData.deliveryPeriod}
                    aria-describedby="helper-text-explanation"
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-lg font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <>
              <h3 className=" font-semibold text-gray-900 dark:text-white">
                Requirements
              </h3>
              <ul className="w-96 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-300 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center ps-3 px-5">
                    <label
                      htmlFor="react-checkbox"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Reference Materials
                    </label>
                    <input
                      id="react-checkbox"
                      type="checkbox"
                      defaultValue=""
                      checked={formData.referenceMaterial}
                      onChange={(e) =>
                        setFormData((prevDetails: any) => ({
                          ...prevDetails,
                          referenceMaterial: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 text-logo-green bg-gray-100 border-gray-300 rounded focus:ring-logo-green dark:focus:ring-logo-green dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                  </div>
                </li>
                <li className="w-full border-b border-gray-300 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center ps-3 px-5">
                    <label
                      htmlFor="angular-checkbox"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Logo
                    </label>
                    <input
                      id="angular-checkbox"
                      type="checkbox"
                      defaultValue=""
                      checked={formData.logo}
                      onChange={(e) =>
                        setFormData((prevDetails: any) => ({
                          ...prevDetails,
                          logo: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 text-logo-green bg-gray-100 border-gray-300 rounded focus:ring-logo-green dark:focus:ring-logo-green dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                  </div>
                </li>
              </ul>
            </>
           


            {/* <div className="flex">
              <div className="mb-6 w-full">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Add Questionnaire
                </label>
                <>
                  <p className="ms-auto text-xs text-gray-500 dark:text-gray-400 my-2">
                    Your questions contribute to gaining a better understanding
                    of work. .
                  </p>
                  {formData.questionnaire.map((question:any, index:any) => {
                    const rowValue = Math.max(
                      2,
                      Math.ceil(question.length / 60)
                    );
                    return (
                      <>
                        

                        <div
                          key={index}
                          className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                        >
                          <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                            <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                              <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                                <i className="fa-solid fa-message-question mx-3 text-logo-green"></i>{" "}
                                Questions
                              </div>
                              <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4"></div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteQuestion(index)}
                              data-tooltip-target="tooltip-fullscreen"
                              className="p-2 text-red-600  rounded cursor-pointer sm:ms-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                            >
                              <i className="fa-solid fa-trash-can"></i> Remove
                            </button>
                          </div>
                          <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                            <textarea
                              id="editor"
                              rows={rowValue}
                              readOnly
                              value={question}
                              className="block w-full px-0 text-sm text-gray-800 bg-white border-0  dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                            />
                          </div>
                        </div>
                      </>
                    );
                  })}
                  <div className="w-full  mb-4 border border-gray-400 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                      <label htmlFor="comment" className="sr-only">
                        Your comment
                      </label>
                      <textarea
                        id="comment"
                        rows={4}
                        className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                        placeholder="write your work-related question…"
                        defaultValue={""}
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                      <button
                        type="submit"
                        onClick={handleAddQuestion}
                        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                      >
                        <i className="fa-light fa-plus mx-2" /> Add New Question
                      </button>
                    </div>
                  </div>
                </>
              </div>
            </div> */}





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
                      name="amount"
                      min={100}
                      value={formData.amount}

                      onChange={(e) =>
                        setFormData((prevDetails: any) => ({
                          ...prevDetails,
                          amount: e.target.value,
                        }))
                      }
                      aria-describedby="helper-text-explanation"
                      className=" [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-lg font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </>
              </div>
            </div>

            
          </div>
        </div>
        <div className="md:w-3/5 w-5/6 mx-auto my-5 flex ">
          
          <button
            type="button" onClick={handileSubmite}
            // onClick={data.handileSubmite}
            className="text-white mx-auto bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Update Now
          </button>
        </div>
      </div>
    </>
  );
}

export default PostEditComponent;
