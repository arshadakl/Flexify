// import { useState } from "react";

import { toast } from "sonner";
import { roleSpecify } from "../../utils/APIs/FreelancerApi";


const UserSelection = ({ pageManage, setUserType, userType }: {
    pageManage: React.Dispatch<React.SetStateAction<number>>;
    setUserType: React.Dispatch<React.SetStateAction<string>>; // Lowercase string
    userType: string;
  }) => {
    
    // const [userType,setUserType] = useState<String>("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserType(e.target.value);
    };

    const handleRole = async()=>{
      const userId = localStorage.getItem("id");
      if(userId){
      const response = await roleSpecify(userId,userType) 
      if(response.status){
        pageManage(2)
      }else{
        toast.error(response.error)
      }
      }
    
    }
    return (
      <>
        <section className=" min-h-80  ">
          <div className="  text-center grid place-items-center min-h-40">
            <h1 className="mx-auto  text-center text-3xl font-poppins font-bold">
              Join as a client or freelancer
            </h1>
          </div>
          <div className="md:w-2/6 mx-auto lx:w-full">
            <ul className="grid w-full gap-6 md:grid-cols-2">
              <li>
                <input
                  type="radio"
                  id="hosting-small"
                  name="hosting"
                  value="client"
                  checked={userType==="client"}
                  className="hidden peer"
                  onChange={(e)=>handleChange(e)}
                />
                <label
                  htmlFor="hosting-small"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-logo-green peer-checked:border-logo-green peer-checked:text-logo-green hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="block min-h-32 p-1">
                    <i className="fa-duotone fa-briefcase text-2xl my-2"></i>
                    <div className="w-full text-2xl font-semibold">
                      I'm a client,
                    </div>
                    <div className="w-full text-lg"> hiring for a project</div>
                  </div>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="hosting-big"
                  value="freelancer"
                  checked={userType==="freelancer"}
                  className="hidden peer"
                  onChange={(e)=>handleChange(e)}
                />
                <label
                  htmlFor="hosting-big"
                  className=" inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-logo-green peer-checked:border-logo-green peer-checked:text-logo-green hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="block min-h-32 p-1 ">
                    <i className="fa-duotone fa-chart-user text-2xl my-2"></i>
                    <div className="w-full text-2xl font-semibold">
                      I'm a freelancer,
                    </div>
                    <div className="w-full text-lg"> looking for Work</div>
                  </div>
                </label>
              </li>
            </ul>
            <div className="flex justify-end">
              {userType !== "" ? 
            <button  type="button" onClick={handleRole} className="my-5 item-position-end focus:outline-none text-white bg-logo-green hover:bg-green-600  focus:ring-logo-green font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-logo-green dark:hover:bg-logo-green">Next</button>
            : null }
            </div>
          </div>
          
        </section>
      </>
    );
}

export default UserSelection