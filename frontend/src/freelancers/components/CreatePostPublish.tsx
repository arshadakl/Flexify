import { initFlowbite } from "flowbite";
import Carousel from "../../common/components/ExtraComponents/Carousel";
import { useEffect, useState } from "react";
import { DetailsINter } from "../../interfaces/Freelancer";
import { getAllCategories, getAllSubCategories } from "../../common/utils/APIs/FreelancerApi";
import { CategoryInter, SubategoryInter } from "../../interfaces/Admin";
import Loading from "../../common/components/ExtraComponents/Loading";



const CreatePostPublish = (data: { details: DetailsINter,formData:any,setStep:any,handileSubmite:any,isLoad:Boolean }) => {
  initFlowbite();
  const [images, setImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<CategoryInter[]>([]);
  const [subcategories, setSubcategories] = useState<SubategoryInter[]>([]);
  const [categoryData, setCategoryData] = useState<{ category: string | null, subcategory: string | null }>({ category: null, subcategory: null });

  useEffect(() => {
    const fetchData = async () => {
      const responseCategory = await getAllCategories();
      setCategories(responseCategory.data);

      const responseSubcategory = await getAllSubCategories();
      setSubcategories(responseSubcategory.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && subcategories.length > 0) {
      const temp1 = categories.find(item => item._id === data.formData.category);
      const temp2 = subcategories.find(item => item._id === data.formData.subcategory);

      if (temp1 && temp2) {
        // console.log(temp1, temp2);
        
        setCategoryData({ category: temp1.title, subcategory: temp2.name });
      console.log("valled",categoryData,"sdsd");

      }
    }
    
  }, [categories, subcategories, data.formData.category]);
  


  
  useEffect(() => {
    const temp = Object.values(data.details.images).filter((image: string) => image !== null) as string[];
    setImages(temp);
  }, [data.details.images]);  
  
  return (
    <>
        {data.isLoad ? <Loading/> : null}

      <div className="w-full  bg-slate-50 min-h-[80vh] py-5">
        <div className="block md:w-3/5 w-5/6 mx-auto p-6 bg-white border border-gray-200 rounded   dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div className="flex flex-col gap-5">
            <div className="flex">
              <p className="cursor-pointer font-semibold pb-0 text-3xl ">
                {data.formData.title}
              </p>
            </div>
            <hr />

            <div className="flex">
              <h1>
                {categoryData.category}
                 <i className="fa-thin fa-chevrons-right text-sm mx-2" />{" "}
                {categoryData.subcategory} 
              </h1>
            </div>
            <div className="flex">
              <div className="container mx-auto">
                <Carousel images={images } />
              </div>
            </div>

            <hr />
            

            <div className="flex">
              <div className=" w-full break-words">
                  <p className="">{data.details.description} </p>
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
                <div className="relative w-24">
                  <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                    <i className="fa-sharp fa-thin fa-calendar-day"></i>
                  </div>
                  <input readOnly
                    name="deliveryPeriod" value={data.details.deliveryPeriod as number}
                     disabled
                    aria-describedby="helper-text-explanation"
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-lg font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                {data.details.logo ? <span className="bg-gray-100 text-gray-800 text-md font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Logo</span> : null}
                {data.details.referenceMaterial ? <span className="bg-gray-100 text-gray-800 text-md font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Reference Materials</span> : null}

                </div>
              </div>
            </div>
            <div className="flex">
              <div className="mb-3 w-full">
                <label
                  htmlFor="default-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Questionnaires
                </label>
                <hr />
                {data.details.questionnaire.map((que)=>{
                  return(
                    <div className="break-words ">
                  <p className="text-md font-semibold"><i className="fa-light fa-messages-question" /> {que}</p>
                </div>
                  )
                })}
                {/* { <div className="break-words ">
                  <p className="text-md font-semibold"><i className="fa-light fa-messages-question" /> Asdsasdsdssaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                </div>} */}
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
                      min={100} value={data.details.amount}
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
                  {data.formData.tags.map((tag:string)=>{
                    return(
                      <span className="bg-gray-100 text-gray-800 text-md font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">#{tag}</span>
                    )
                  })}
                

                </div>
              </div>
            </div>




          </div>
        </div>
        <div className="md:w-3/5 w-5/6 mx-auto my-5 flex ">
          <p
            className="cursor-pointer text-logo-green w-10"
            onClick={() => data.setStep(2)}
          >
            Back
          </p>
          <button
            type="button" onClick={data.handileSubmite}
            className="text-white mx-auto bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Publish Now
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePostPublish;
