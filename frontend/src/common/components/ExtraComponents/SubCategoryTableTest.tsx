import { initFlowbite } from "flowbite";
import { FormatDateString } from "../../utils/Services/dateFormater";
import { ShortenDescription } from "../../utils/Services/shortenDescription";
import SubCategoryModal from "./subcategoryModal";
import { getAllCategories } from "../../utils/APIs/AdminApi";
import { useEffect, useState } from "react";
import { SubategoryInter } from "../../../interfaces/Admin";

interface SubCategoryTableTestProps {
  SubCategories: any;
  deleteSubCategory: any;
  setSubCategories: any;
}

const SubCategoryTableTest: React.FC<SubCategoryTableTestProps> = ({
  SubCategories,
  deleteSubCategory,
  setSubCategories,
}) => {
  const [mainCategory, setMainCategory] = useState<any[]>([]);
  const [item,setItem]= useState(false)
  const [page,setPage] = useState<number>(0)
  useEffect(() => {
    const fetchData = async () => {
      console.log("called category call");
      
      const mainCategories = await getAllCategories();
      console.log(mainCategories);
      
      setMainCategory(mainCategories.data);
      setItem(true)
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(mainCategory.length,page);
    
  }, [page])
  
  return (
    <>
      {item && [0].map(() => {
        const main = mainCategory[page]
        const subItems = SubCategories?.filter(
          (item: SubategoryInter) => item.category === main._id
        );
        initFlowbite();
        if (subItems?.length === 0)
          return (
            <div
              key={main._id}
              className="block w-full my-2 p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {main.title}
              </h5>
              <hr />
              <div className="text-center text-gray-300 py-5">
              <i className="fa-regular fa-ban"></i>
                <p className="text-center ">No Subcategory available</p>
              </div>
            </div>
          );

        return (
          <div
            key={main._id}
            className="block w-full my-2 p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {main.title}
            </h5>
            <hr />
            <div className="-m-1.5 overflow-auto w-full">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <div className="table border-collapse table-auto w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <div className="table-header-group">
                      <div className="table-row ">
                        <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                          Name of Subcategory
                        </div>
                        <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                          Description
                        </div>
                        <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                          Added on
                        </div>
                        <div className="table-cell px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                          Edit
                        </div>
                        <div className="table-cell px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                          Action
                        </div>
                      </div>
                    </div>
                    {subItems?.map((item: any) => (
                      <div
                        key={item._id}
                        className="table-row-group divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-slate-800"
                      >
                        <div className="table-row">
                          <div className="table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                            {item.name}
                          </div>
                          <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            {ShortenDescription(item.description, 20)}
                          </div>
                          <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            {FormatDateString(item.createdAt)}
                          </div>
                          <div className="table-cell px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <button
                              type="button"
                              data-modal-target={item._id}
                              data-modal-toggle={item._id}
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"
                            >
                              Edit
                            </button>
                            <SubCategoryModal
                              isEdit={{ status: true, data: item }}
                              setSubCategories={setSubCategories}
                            />
                          </div>
                          <div className="table-cell px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <button
                              type="button"
                              data-modal-target={`Delete${item._id}`}
                              data-modal-toggle={`Delete${item._id}`}
                              className="inline-flex items-center bg-black text-white gap-x-2 px-5 py-2 text-sm font-semibold rounded-lg border border-transparent  hover:text-white disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"
                            >
                              Delete
                            </button>
                            <DeleteModal
                              id={`Delete${item._id}`}
                              name={item.name}
                              onDelete={() => deleteSubCategory(item._id)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                 
                </div>
                
              </div>
              
            </div>
          </div>
        );
      }
      
      )}
       <>
                <div className="w-full flex px-5 py-2 justify-end ">
                  <nav aria-label="Page navigation example">
                    <ul className="inline-flex -space-x-px text-sm">
                      <li>
                        <button
                         disabled={page==0 ? true : false} onClick={()=>setPage(page-1)}
                          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          Previous
                        </button >
                      </li>
                      <li>
                        <p aria-current="page"
                          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          {page+1}
                        </p>
                      </li>
                    
                     
                      <li>
                        <button disabled={page==mainCategory.length-1 ? true : false}
                         onClick={()=>setPage(page+1)} 
                          className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </>
    </>
  );
};

export default SubCategoryTableTest;

interface DeleteModalProps {
  id: string;
  name: string;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ id, name, onDelete }) => {
  return (
    <div
      id={id}
      tabIndex={-1}
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide={id}
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
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {name}
            </h3>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Category?
            </h3>
            <button
              data-modal-hide={id}
              onClick={onDelete}
              type="button"
              className="text-white bg-gray-900 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Yes, I'm sure
            </button>
            <button
              data-modal-hide={id}
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
