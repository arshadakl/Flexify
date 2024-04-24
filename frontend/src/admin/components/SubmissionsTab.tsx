import { useEffect, useState } from "react";
import { getallSubmissionsAPI } from "../../common/utils/APIs/AdminApi";
// import { ITransaction } from "../../interfaces/Admin";
import { FormatDateString } from "../../common/utils/Services/dateFormater";

function SubmissionsTab() {
    const [submissions,setSubmissions] = useState<any>()
    useEffect(() => {
      const fetchData = async()=>{
        const response = await getallSubmissionsAPI()
        console.log(response.data);
        
        if(response.status){
            setSubmissions(response.data)
        }
      }
      fetchData()
    }, [])
  return (
    <>
      <div className="-m-1.5 overflow-auto w-full">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden">
            <div className="table border-collapse table-auto w-full divide-y divide-gray-200 dark:divide-gray-700">
              <div className="table-header-group">
                <div className="table-row">
                  <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                  Freelancer
                  </div>
                  <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Client
                  </div>
                  <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Date
                  </div>
                  <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Work
                  </div>
                  <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Status
                  </div>
                  
                </div>
              </div>
              <div className="table-row-group divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-slate-800">
                {submissions?.map((submission:any) => {
                  return (
                    <div className="table-row ">
                      <div className=" flex  capitalize px-6 py-4 whitespace-nowrap text-sm font-medium  text-gray-800 content-center dark:text-gray-200">
                        <img className="h-6 w-6 rounded-full my-auto" src={submission.freelancer[0].profile} alt="" /> <p className="my-auto mx-2">{submission.freelancer[0].username}</p>
                      </div>
                      <div className="table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        {submission.client[0].username}
                      </div>
                      <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                       {FormatDateString(submission.date )} 
                      </div>
                      <div className="table-cell font-bold px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                       {submission.workDetails[0].categoryNames[1]} 
                      </div>
                      <div className={`table-cell px-6 py-4 ${submission.status!=="approved" ? "text-yellow-500" : "text-green-500"}  whitespace-nowrap capitalize text-sm  dark:text-gray-200`}>
                      <i className="fa-regular fa-circle-dot fa-beat-fade" /> {" "} <span className="capitalize">{submission.status}
                        </span>
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
  )
}

export default SubmissionsTab