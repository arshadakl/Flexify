import { useEffect, useState } from "react";
import ImageDroper from "../../common/components/ExtraComponents/ImageDroper";
import { postDiscriptionValidation } from "../../validations/freelancerValidations";
import { toast } from "sonner";

function CreatePostDescription(data: any) {
  const [previewImage1, setPreviewImage1] = useState<string | null>(null);
  const [croppedImage1, setCroppedImage1] = useState<string | null>(null);

  const [previewImage2, setPreviewImage2] = useState<string | null>(null);
  const [croppedImage2, setCroppedImage2] = useState<string | null>(null);

  const [previewImage3, setPreviewImage3] = useState<string | null>(null);
  const [croppedImage3, setCroppedImage3] = useState<string | null>(null);

  const [questions, setQuestions] = useState<string[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const handleAddQuestion = () => {
    if (newQuestion.trim() !== "" && !questions.includes(newQuestion.trim())) {
      setQuestions([...questions, newQuestion.trim()]);
      setNewQuestion("");
      // handleUpdateDetails();
    }
  };

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
    // handleUpdateDetails();
  };

  const handleUpdateDetails = () => {
    data.setDetails((prevDetails: any) => ({
      ...prevDetails,
      questionnaire: [...questions],
    }));
  };

  useEffect(() => {
    handleUpdateDetails();
  }, [questions]);

  useEffect(() => {
    console.log(croppedImage1);

    data.setDetails((prevDetails: any) => ({
      ...prevDetails,
      images: {
        ...prevDetails.images,
        first: croppedImage1,
      },
    }));
  }, [croppedImage1]);

  useEffect(() => {
    data.setDetails((prevDetails: any) => ({
      ...prevDetails,
      images: {
        ...prevDetails.images,
        second: croppedImage2,
      },
    }));
  }, [croppedImage2]);

  useEffect(() => {
    data.setDetails((prevDetails: any) => ({
      ...prevDetails,
      images: {
        ...prevDetails.images,
        third: croppedImage3,
      },
    }));
  }, [croppedImage3]);

  const handileChecks = (e: any) => {
    data.setDetails((prevDetails: any) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handileSubmite = async () => {
    const isValid = await postDiscriptionValidation(data.details);
    if (isValid == "success") {
      data.setStep(3);
    } else {
      toast.error(isValid);
    }
  };

  

  return (
    <>
      <div className="w-full  bg-slate-50 min-h-[80vh] py-5">
        <div className="md:w-3/5 w-5/6 mx-auto m-3 ">
          <p className="cursor-pointer pb-2 text-xl ">Description & Pricing</p>
          <hr />
        </div>
        <div className="block md:w-3/5 w-5/6 mx-auto p-6 bg-white border border-gray-200 rounded   dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div className="flex flex-col gap-5">
            <div className="flex">
              <p className="cursor-pointer pb-2 text-xl ">
                Showcase Your Services In A Work Gallery
              </p>
            </div>
            <div className="flex">
              <div className="flex w-full gap-3 p-6 bg-white border border-gray-200 rounded   dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="block w-1/3  bg-white border border-gray-200 rounded dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  {/* <ImageDroper
                    previewImage={previewImage1}
                    setPreviewImage={setPreviewImage1}
                    croppedImage={croppedImage1}
                    setCroppedImage={setCroppedImage1}
                    name="image1"
                    isOpen={true}
                    // imageRef={imageRef1}
                  /> */}

<ImageDroper
                    previewImage={previewImage1}
                    setPreviewImage={setPreviewImage1}
                    croppedImage={croppedImage1 as File | null}
                    setCroppedImage={
                      setCroppedImage1 as React.Dispatch<
                        React.SetStateAction<File | null>
                      >
                    }
                    isOpen={true}
                    name="image1"
                  />
                </div>
                <div className="block w-1/3 disabled  bg-white border border-gray-200 rounded dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <ImageDroper
                    previewImage={previewImage2}
                    setPreviewImage={setPreviewImage2}
                    croppedImage={croppedImage2 as File | null}
                    setCroppedImage={
                      setCroppedImage2 as React.Dispatch<
                        React.SetStateAction<File | null>
                      >
                    }
                    isOpen={croppedImage1 == null ? false : true}
                    name="image2"
                  />
                </div>
                <div className="block w-1/3  bg-white border border-gray-200 rounded dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  {/* <ImageDroper
                    previewImage={previewImage3}
                    setPreviewImage={setPreviewImage3}
                    croppedImage={croppedImage3}
                    setCroppedImage={setCroppedImage3}
                    name="image3"
                    isOpen={croppedImage2 == null ? false : true}
                  /> */}
                  <ImageDroper
                    previewImage={previewImage3}
                    setPreviewImage={setPreviewImage3}
                    croppedImage={croppedImage3 as File | null}
                    setCroppedImage={
                      setCroppedImage3 as React.Dispatch<
                        React.SetStateAction<File | null>
                      >
                    }
                    isOpen={croppedImage1 == null ? false : true}
                    name="image3"
                  />
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="mb-6">
                <label
                  htmlFor="default-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Work Delivery time period (Day)
                </label>
                <div className="relative w-28">
                  <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                    <i className="fa-sharp fa-thin fa-calendar-day"></i>
                  </div>
                  <input
                    type="number"
                    min={1}
                    name="deliveryPeriod"
                    max={30}
                    value={data.details.deliveryPeriod}
                    onChange={handileChecks}
                    aria-describedby="helper-text-explanation"
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-lg font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="mb-6">
                <>
                  <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
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
                          checked={data.details.ReferenceMaterial}
                          onChange={(e) =>
                            data.setDetails((prevDetails: any) => ({
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
                          checked={data.details.logo}
                          onChange={(e) =>
                            data.setDetails((prevDetails: any) => ({
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
              </div>
            </div>
            <div className="flex">
              <div className="m w-full">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="message"
                  value={data.details.description}
                  rows={4}
                  name="description"
                  onChange={handileChecks}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="write about your work exposure..."
                  defaultValue={""}
                />
              </div>
            </div>

            {/* questions  modal area */}
            <hr />
            <div className="flex">
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
                  {questions.map((question, index) => {
                    const rowValue = Math.max(
                      2,
                      Math.ceil(question.length / 60)
                    );
                    return (
                      <>
                        {/* <div
                        key={index}
                        className="block my-2 w-full p-6 bg-white border border-gray-200 rounded hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                      >
                        <span><i className="fa-solid fa-message-question"></i> {question}</span>
                        <br />
                        <p
                          className="text-red-500 cursor-pointer hover:text-red-700 focus:outline-none text-end"
                          onClick={() => handleDeleteQuestion(index)}
                        >
                           Remove
                        </p>
                      </div> */}

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
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                      <i className="fa-regular fa-indian-rupee-sign"></i>
                    </div>
                    <input
                      type="number"
                      name="amount"
                      min={100}
                      value={data.details.amount}
                      max={9999999}
                      onChange={handileChecks}
                      aria-describedby="helper-text-explanation"
                      className=" [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-lg font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <p
                    id="helper-text-explanation"
                    className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                  >
                    Specify the amount you expect for this work.
                  </p>
                </>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-3/5 w-5/6 mx-auto my-5 flex ">
          <p
            className="cursor-pointer text-logo-green w-10"
            onClick={() => data.setStep(1)}
          >
            Back
          </p>
          <button
            type="button"
            onClick={handileSubmite}
            className="text-white mx-auto bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </>
  );
}

export default CreatePostDescription;
