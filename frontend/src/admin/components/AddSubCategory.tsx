import { useEffect, useState } from "react"
import SubCategoryModal from "../../common/components/ExtraComponents/subcategoryModal"
import { initFlowbite } from "flowbite";
import { deleteSubCategoryAPI, getAllSubCategories } from "../../common/utils/APIs/AdminApi";
import SubCategoryTable from "../../common/components/ExtraComponents/SubCategoryTable";
import { toast } from "sonner";

function AddSubCategory() {
  const [SubCategories, setSubCategories] = useState();

  useEffect(() => {
    initFlowbite();
    const fetchData = async() =>{
        const categoriesData = await getAllSubCategories()
        setSubCategories(categoriesData.data)
    }
    fetchData()

  }, []);

  
  const deleteSubCategory = async(id:string)=>{
    console.log(id,"called parent ");
    const response = await deleteSubCategoryAPI(id)
    if(response.status){
        setSubCategories(response.data)
        toast.success("Sub Category deleted successfully")
    }else{
        toast.error(response.error)
    }
    
    
}
  return (
    <>
    <div className=" w-full grid justify-items-start my-5">
        <button
          data-modal-target="subcategory-model"
          data-modal-toggle="subcategory-model"
          className=" justify-center bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 focus:outline-none"
        >
          <i className="fa-sharp fa-regular fa-plus mx-2" />
          Add Subcategory
        </button>
        <SubCategoryModal setSubCategories={setSubCategories}/>
        <SubCategoryTable deleteSubCategory={deleteSubCategory} SubCategories={SubCategories} />
      </div>
    </>
  )
}

export default AddSubCategory