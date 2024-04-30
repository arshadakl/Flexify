import { useEffect, useState } from "react";
import { IWork } from "../../interfaces/Freelancer";
import { GetRepotedPostAPi, suspendWorkAPI } from "../../common/utils/APIs/AdminApi";
import { ShortenDescription } from "../../common/utils/Services/shortenDescription";
import { toast } from "sonner";

function RepotedPostTable() {
  const [works, setWork] = useState<IWork[]>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await GetRepotedPostAPi();
      if (response.status) {
        setWork(response.post);
        console.log(response.post,"flagged");
        
      }
    };
    fetchData();
    console.log(works);
  }, []);

  const handile = async(id:any)=>{
    console.log(id);
    
    const respose = await suspendWorkAPI(id)
    if(respose.status){
        setWork(respose.data)
        console.log(respose.data);
        
        toast.success("Action Saved Success")
    }
    
  }

  return (
    <>
      <div className="-m-1.5 overflow-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <div className="table border-collapse table-auto w-full divide-y divide-gray-200 dark:divide-gray-700">
              <div className="table-header-group">
                <div className="table-row">
                  <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    image
                  </div>
                  <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Title
                  </div>
                  <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Category & Subcategory
                  </div>
                  <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    work Amount
                  </div>
                  <div className=" table-cell px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Action
                  </div>
                </div>
              </div>
              {/* <div className="table-row-group divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-slate-800">
                {works?.map((work:IWork) => {
                  return (
                    <div className="table-row">
                      <div className="table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        <img className="h-10 rounded" src={work.image1} alt="" />
                      </div>
                      <div className="table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        {ShortenDescription(work.title,20)}
                      </div>
                      <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {work.categoryNames[0]}-{work.categoryNames[1]}
                      </div>
                      <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      ₹ {work.amount} 
                      </div>
                      <div className="table-cell px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <button onClick={()=>handile(work._id)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800  f font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">{work.isActive ? "Suspend" : "Restore Access"} </button>
                      </div>
                    </div>
                  );
                })}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RepotedPostTable;
