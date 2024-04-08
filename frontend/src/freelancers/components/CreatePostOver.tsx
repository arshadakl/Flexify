import { initFlowbite } from "flowbite";
import {  useEffect, useState } from "react";
import { getAllCategories } from "../../common/utils/APIs/AdminApi";
import { getAllSubCategories } from "../../common/utils/APIs/FreelancerApi";
import { CategoryInter, SubategoryInter } from "../../interfaces/Admin";
import { TagsInput } from "react-tag-input-component";
import { postOverviewValidation } from "../../validations/freelancerValidations";
import { toast } from "sonner";
function CreatePostOver(data:any) {
  const [categories, setCategories] = useState<CategoryInter[]>();
  const [subcategories, setSubCategories] = useState<SubategoryInter[]>();
  const [selectedCategorie, setSelectedCategorie] = useState<CategoryInter>();
  const [selectedSubcategories, setSelectedSubcategories] = useState<any>();
  const [isSelected, setIsSelected] = useState<Boolean>(false);
  const [tags, setTags] = useState<string[]>([]);

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags.slice(0, 5));
    data.setFormData({
        ...data.formData,
        tags: newTags.slice(0, 5),
      });
      
  };
  initFlowbite();



  const handleChange: any = (event: any) => {
    if (data.formData.title.length <= 79 || event.nativeEvent.inputType === 'deleteContentBackward') {
      data.setFormData({
        ...data.formData,
        [event.target.name]: event.target.value,
      });
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await getAllCategories();
      if (categoriesData.data) {
        setCategories(categoriesData.data);
      }
      const subcategoriesData = await getAllSubCategories();
      if (subcategoriesData.data) {
        setSubCategories(subcategoriesData.data);
      }
    };
    fetchData();
  }, []);

  const handleCategory = (e: any) => {
    setSelectedCategorie(e.target.value);
    handleChange(e)
    setIsSelected(true);
    const filteredData = subcategories?.filter(
      (item) => item.category === e.target.value
    );
    setSelectedSubcategories(filteredData);
    console.log(selectedCategorie);
    
  };

  const handleSubmit = async()=>{
    const isValid =  postOverviewValidation(data.formData)
    if(isValid=="success"){
        data.setStep(2)
    }else{
        toast.error(isValid)
    }
  }

  return (
    <>

      <div className="w-full  bg-slate-50 min-h-[80vh] py-5">
        <div className="block md:w-3/5 w-5/6 mx-auto p-6 bg-white border border-gray-200 rounded   dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div className="flex flex-col gap-5">
            <div className="flex">
              <div className="w-2/6">
                <label
                  htmlFor="message"
                  className="text-start text-xl   block mb-2 font-bold text-gray-900 dark:text-white"
                >
                  Work title
                </label>
                <p className="text-sm w-5/6 text-gray-500">
                  As your Work storefront, your title is the most important
                  place to include keywords that buyers would likely use to
                  search for a service like yours.
                </p>
              </div>
              <div className="w-4/6">
                <textarea
                  id="message"
                  rows={3} value={data.formData.title} name="title" onChange={(e)=>{  handleChange(e) }}
                  className="block p-2.5 w-full font-semibold text-2xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="I Will do something I'm really good at.."
                />
                <p className="text-end text-gray-400 text-[12px] italic">
                  {data.formData.title.length} / 80 max
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="w-2/6">
                <label
                  htmlFor="message"
                  className="text-start text-xl   block mb-2 font-bold text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <p className="text-sm w-5/6 text-gray-500">
                  Choose the category and Subcategory most suitable for your
                  work.
                </p>
              </div>
              <div className="w-4/6 gap-2 flex justify-evenly my-auto">
                <div className="w-1/2">
                  <select
                    id="countries" name="category" value={data.formData.category}
                    onChange={(e) => handleCategory(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" disabled selected>
                      {" "}
                      Select a category{" "}
                    </option>
                    {categories?.map((item: any) => {
                      return <option value={item._id}>{item.title}</option>;
                    })}
                  </select>
                </div>
                <div className="w-1/2">
                  {
                    <select
                      id="countries" name="subcategory" value={data.formData.subcategory}
                      disabled={isSelected ? false : true} onChange={(e)=>handleChange(e)}
                      className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="" disabled selected>
                        {" "}
                        Select a Subcategory{" "}
                      </option>
                      {selectedSubcategories?.map((item: any) => {
                        return <option value={item._id}>{item.name}</option>;
                      })}
                    </select>
                  }
                </div>
              </div>
            </div>

            <div className="flex mt-2">
              <div className="w-2/6">
                <label
                  htmlFor="message"
                  className="text-start text-xl  mb-2 block  font-bold text-gray-900 dark:text-white"
                >
                  Search tags
                </label>
                <p className="text-sm w-5/6 text-gray-500">
                  Tag your work with buzz words that are relevant to the
                  services you offer. Use all 5 tags to get found.
                </p>
              </div>
              <div className="w-4/6">
                <label className="block mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  keywords
                </label>
                <p className="w-3/5 mb-5 text-sm  text-gray-500 italic">
                  Enter search terms you feel your buyers will use when looking
                  for your service.
                </p>
                {/* <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  
                /> */}
                <div className="font-semibold">
                  <TagsInput
                    value={data.formData.tags}
                    onChange={handleTagsChange}
                    //   name="fruits"
                    placeHolder="enter tags"
                  />
                </div>
                <p className="text-gray-400 text-[12px] italic">
                  press enter to add new tag | {tags.length}/5 tags maximum.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-3/5 w-5/6 mx-auto flex justify-end my-5">
          <button
            type="button" onClick={handleSubmit}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </>
  );
}

export default CreatePostOver;
