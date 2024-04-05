import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { addSubCategoryValid } from "../../../validations/adminValidations";
import { toast } from "sonner";
import { AddSubcategoryAPI, EditSubcategoryAPI, getAllCategories } from "../../utils/APIs/AdminApi";
import { initFlowbite } from "flowbite";
import { SubategoryInter } from "../../../interfaces/Admin";

function SubCategoryModal({ setSubCategories,isEdit }: { setSubCategories: any,isEdit:any }) {
  const [Category, setCategory] = useState<string>("");
  const [mainCategory, setMainCategory] = useState<string[]>()
  const [description, setDescription] = useState<string>("");
  const [categoryID,setCategoryID]= useState<string>("")
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    initFlowbite();
    const fetchData = async() =>{
        const categoriesData = await getAllCategories()
        setMainCategory(categoriesData.data)
    }
    fetchData()

  }, []);


  useEffect(() => {
    if(isEdit.status){
      setCategory(isEdit.data.name)
      setDescription(isEdit.data.description)
      setCategoryID(isEdit.data.category)
    }
  }, [isEdit])


  const closeModal = () => {
    if (buttonRef.current !== null) {
      buttonRef.current?.click();
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(Category, description, categoryID);
    const data:SubategoryInter = {
      name: Category,
      description,
      category:categoryID
    };
    const isValid = addSubCategoryValid(data);
    if (isValid !== "success") {
      toast.error(isValid);
      return;
    }
    if(isEdit.status){
      data._id = isEdit.data._id
      const response = await EditSubcategoryAPI(data);
      if (response.status) {
        console.log(response.data);
        setSubCategories(response.data);
        toast.success("SubCategory edits saved!");
        closeModal();
      } else {
        toast.error(response.error);
      }
    }else{
      const response = await AddSubcategoryAPI(data);
      if (response.status) {
        console.log(response.data);
        setSubCategories(response.data);
        toast.success("New Subcategory added successfully");
        setCategory("")
        setDescription("")
        setCategoryID("")
        closeModal();
      } else {
        toast.error(response.error);
      }
    }
    
  };
  return (
    <>
      <div
        id={isEdit.status ? isEdit.data._id :`subcategory-model`}
        tabIndex={-1}
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                
                {isEdit?.status ? "Update Subcategory" :"Add new Subcategory"}
              </h3>
              <button
                type="button"
                ref={buttonRef}
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide={isEdit.status ? isEdit.data._id :`subcategory-model`}
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
              <form className="space-y-4" onSubmit={handleSubmit}>
                { !isEdit.status && <div>
                  <>
                    <label
                      htmlFor="countries"
                      className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Main Category
                    </label>
                    <select
                    value={categoryID}
                      id="countries" onChange={(e)=>setCategoryID(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="" disabled selected> Select a category </option>
                      {mainCategory?.map((item:any)=>{
                        return(
                            <option value={item._id}>{item.title}</option>
                        )
                      })}
                      
                    </select>
                  </>
                </div>}
                <div>
                  <label
                    htmlFor="email"
                    className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name of subcategory
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setCategory(e.target.value)}
                    value={Category}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="category name"
                  />
                </div>
                <div>
                  <>
                    <label
                      htmlFor="message"
                      className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="message"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write description here..."
                      defaultValue={""}
                    />
                  </>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubCategoryModal;
