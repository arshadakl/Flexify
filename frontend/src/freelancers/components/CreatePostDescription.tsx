import ImageDroper from "../../common/components/ExtraComponents/ImageDroper";

function CreatePostDescription(data: any) {
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
                
                <div className="block w-1/3  bg-white border border-gray-200 rounded dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <ImageDroper/>
                </div>
                
                <div className="block w-1/3  bg-white border border-gray-200 rounded dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <ImageDroper/>
                 
                </div>
                
                <div className="block w-1/3  bg-white border border-gray-200 rounded dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <ImageDroper/>
                 
                </div>
                


              </div>
            </div>
          </div>
        </div>
        <div className="md:w-3/5 w-5/6 mx-auto my-5 ">
          <p
            className="cursor-pointer text-logo-green w-10"
            onClick={() => data.setStep(1)}
          >
            Back
          </p>
        </div>
      </div>
    </>
  );
}

export default CreatePostDescription;
