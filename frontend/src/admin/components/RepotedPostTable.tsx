import { useEffect, useState } from "react";
import { IWork } from "../../interfaces/Freelancer";
import { GetRepotedPostAPi, suspendWorkAPI } from "../../common/utils/APIs/AdminApi";
import { ShortenDescription } from "../../common/utils/Services/shortenDescription";
import { toast } from "sonner";
import { IReport } from "../../interfaces/Client";

function RepotedPostTable() {
  const [posts, setPosts] = useState<IReport[]>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await GetRepotedPostAPi();
      if (response.status) {
        console.log(response.post,"flagged");
        setPosts(response.post);
        
      }
    };
    fetchData();
  }, []);

  const handile = async(id:any)=>{
    console.log(id);
    
    const respose = await suspendWorkAPI(id)
    console.log(id,"post id");
    
    if(respose.status){
        setPosts(respose.flagged)
        console.log(respose.flagged);
        
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
                    Work
                  </div>
                  <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Reson 
                  </div>
                  <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Freelancer
                  </div>
                  <div className=" table-cell px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Reporter
                  </div>
                  <div className=" table-cell px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Reporter
                  </div>
                </div>
              </div>
               <div className="table-row-group divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-slate-800">
                {posts?.map((post:IReport) => {
                  return (
                    <div className="table-row">
                      <div className="table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        <img className="h-10 rounded" src={post.postDetails && post.postDetails.image1} alt="" />
                      </div>
                      <div className="table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      {post.postDetails && post.postDetails.categoryNames[1]}
                      </div>
                      <div className="table-cell px-6 py-4 whitespace-nowrap text-sm  dark:text-gray-200 text-red-700 font-semibold">
                      {post.reason}
                      </div>
                      <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {post.FreelancerDetails && post.FreelancerDetails[0].username}
                      </div>
                      <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {post.reporter && post.reporter[0].username}
                      </div>
                      <div className="table-cell px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <button onClick={()=>handile(post.postDetails?._id)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800  f font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">{post.postDetails && post.postDetails.isActive ? "Suspend" : "Restore Access"} </button>
                      </div>
                    </div>
                  );
                })}
              </div> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RepotedPostTable;
