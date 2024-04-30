import { useEffect, useState } from "react";
import { singleOrderDetails } from "../../common/utils/APIs/FreelancerApi";
import { useLocation } from "react-router-dom";
import SubmitionComponet from "./SubmitionComponet";
import ChatBox from "./ChatBox";
// import { FormatDateString } from "../../common/utils/Services/dateFormater";
// import { toast } from "sonner";

function OrderSubmition() {
  // const navigate = useNavigate()
  const [works, setWorks] = useState<any>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const workId = queryParams.get("id");
  // const [file,setFile] = useState<File | string>("")
  // const [description,setDescription] = useState<string>("")
  useEffect(() => {
    const fetchData = async () => {
      const response = await singleOrderDetails(workId as string);
      setWorks(response.data);
      // console.log(response.data[0].client[0], "response");
    };
    fetchData();
  }, [workId]);
  
  return (
    <>
      {works && (
        <div className="bg-slate-100 pt-28 w-full py-5  min-h-screen font-poppins">
          <div className="   mx-auto">
            <h1 className="text-2xl w-5/6 mx-auto font-poppins font-medium">Manage Orders</h1>
            <hr className="my-2" />

            <div className="flex md:flex-row flex-col justify-center gap-3">
            <div className="xl:w-6/12 md:w-6/12 w-11/12 mx-auto md:mx-0">
              <div>
                {works.map((work: any, index: number) => {
                  return <SubmitionComponet key={index} work={work} />;
                })}
              </div>
            </div>
            <div className="xl:w-4/12 md:w-5/12 w-11/12 mx-auto md:mx-0">
                {works && <ChatBox client={works[0].client[0]} />}
              </div>
            </div>


            
          </div>
        </div>
      )}
    </>
  );
}

export default OrderSubmition;
