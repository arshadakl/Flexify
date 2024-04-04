import { useState } from "react";
import AddCategory from "../../admin/components/AddCategory";
import AddSubCategory from "../../admin/components/AddSubCategory";

function CategoryManagement() {
  const [isCategory,setCategory] = useState<Boolean>(true)
  const handileTab = (action:Boolean)=>{
    setCategory(action)
  }
  return (
    <>
      <h1 className="text-2xl font-sans font-semibold py-5">Manage Work Categories </h1>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="me-2 cursor-pointer" onClick={()=>handileTab(true)}>
          <p aria-current="page"
            className={`inline-block p-4  ${isCategory ? 'text-blue-600 bg-gray-100' : "hover:bg-gray-50"}  rounded-t-lg active dark:bg-gray-800 dark:text-blue-500`} >
            Category
          </p>
        </li>
        <li className="me-2 cursor-pointer" onClick={()=>handileTab(false)}>
          <p className={`inline-block p-4 ${!isCategory ? 'bg-gray-100 text-blue-600' : "hover:bg-gray-50"} rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300`}>
            Subcategory
          </p>
        </li>
      </ul>
      <div className="w-full mt-5">
    {isCategory ? <AddCategory/> : <AddSubCategory/>}
    </div>
    </>
  );
}

export default CategoryManagement;
