import { initFlowbite } from "flowbite";
import { useEffect, useState } from "react";
import CategoryModal from "../../common/components/ExtraComponents/categoryModal";
import CategoryTable from "../../common/components/ExtraComponents/CategoryTable";
import { deleteCategoryAPI, getAllCategories } from "../../common/utils/APIs/AdminApi";
import { toast } from "sonner";

function AddCategory() {
    const [Categories, setCategories] = useState();
  useEffect(() => {
    initFlowbite();
    const fetchData = async() =>{
        const categoriesData = await getAllCategories()
        setCategories(categoriesData.data)
    }
    fetchData()

  }, []);

  const deleteCategory = async(id:string)=>{
        console.log(id,"called parent ");
        const response = await deleteCategoryAPI(id)
        if(response.status){
            setCategories(response.data)
            toast.success("Category deleted successfully")
        }else{
            toast.error(response.error)
        }
        
        
  }

  return (
    <>
      <div className=" w-full grid justify-items-start my-5">
        <button
          data-modal-target="authentication-modal"
          data-modal-toggle="authentication-modal"
          className=" justify-center bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 focus:outline-none"
        >
          <i className="fa-sharp fa-regular fa-plus mx-2" />
          Add Category
        </button>
      </div>
      <CategoryModal setCategories={setCategories} />
      <div>
        <CategoryTable Categories={Categories} deleteCategory={deleteCategory} />
      </div>
    </>
  );
}

export default AddCategory;
