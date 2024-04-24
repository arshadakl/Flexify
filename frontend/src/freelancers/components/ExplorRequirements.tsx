import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { downloadFileAPI, getrequirementsAPI } from "../../common/utils/APIs/FreelancerApi";
// import { FormatDateString } from "../../common/utils/Services/dateFormater";

function ExplorRequirements() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("id");
  const [data,setData] = useState<any>()
  useEffect(() => {
    const fetchOrders = async () => {
      if (!orderId) return;
      const response = await getrequirementsAPI(orderId as string);
      console.log(response);
      
      if (response.status) {
        setData(response.details[0]);
      }
    };
    fetchOrders();
  }, [orderId]);

  const handileDownload = async (URLData:string)=>{
    const response = await downloadFileAPI(URLData)
    console.log(response);
    
  }
  return (
    <>
      <div className="bg-slate-100 pt-28 w-full py-5  min-h-screen font-poppins">
        <div className=" md:w-4/6 w-11/12  mx-auto">
          <h1 className="text-xl font-poppins">Work Requirements</h1>
          <hr className="my-2" />
          <div className="bg-white border px-5 py-5 ">
            <h1 className="text-md text-2xl mx-5">
              ID :{" "}
              <span className="font-medium text-gray-500">#W123151455212</span>
            </h1>
            <hr className="my-3" />
            <div className="relative overflow-x-auto mx-5 my-3">
              <table className="w-full text-sm border  border-gray-400 text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs border  border-gray-400 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Work
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Work Duration
                    </th>
                    {/* <th scope="col" className="px-6 py-4">
                      order date
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {data?.workData[0].categoryNames[1]}
                    </th>
                    <td className="px-6 py-4">
                      {data?.workData.deliveryPeriod} Days
                    </td>
                    {/* <td className="px-6 py-4">
                      {FormatDateString(data?.workData.date as any)}
                    </td> */}
                  </tr>
                </tbody>
              </table>
            </div>
           
            <p className="text-[13px] py-2 mx-5 text-gray-500 font-light">
              * Download requirements
            </p>
            <div className="mx-5 flex">
              {(data?.referenceMaterial!=="") && (
                <div>
                  <label onClick={()=>handileDownload(data?.referenceMaterial)}
                    className="text-gray-900 border cursor-pointer border-gray-500 border-dashed bg-gray-200 hover:bg-gray-200  font-medium rounded text-sm px-8 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
                  >
                    <i className="fa-light fa-file-arrow-down mx-2" /> Reference
                    material {}
                  </label>
                  
                 
                </div>
              )}
              {(data?.logo!=="") && (
                <div onClick={()=>handileDownload(data?.logo)}>
                  <label
                    className="text-gray-900 border cursor-pointer border-gray-500 border-dashed bg-gray-200 hover:bg-gray-200  font-medium rounded text-sm px-8 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
                  >
                    <i className="fa-light fa-file-arrow-down mx-2" /> Logo
                  </label>
                  

                </div>
              )}
            </div>
            <hr className="my-5" />
            {/* {data?.workData.questionnaire[0] && (
              <div className="mx-5">
                <h1 className="text-md  my-3">
                  <i className="fa-solid fa-clipboard-question"></i>{" "}
                  Questionnaires
                </h1>
                {data?.workData.questionnaire.map((que:any, index:any) => {
                  return (
                    <>
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900 mt-2 dark:text-white"
                      >
                        {index + 1} . {que}
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                        value={questionnaireResponses[index]?.answer || ""}
                        onChange={(e) =>
                          handleQuestionnaireChange(index, e.target.value)
                        }
                      />
                    </>
                  );
                })}
              </div>
            )} */}
            <div className="mx-5">
              <>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {data?.workData.description}
                </label>
                {/* <textarea
                  id="description"
                  rows={3}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your about work "
                  value={description}
                  onChange={handleDescriptionChange} */}
                {/* /> */}
              </>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default ExplorRequirements;
