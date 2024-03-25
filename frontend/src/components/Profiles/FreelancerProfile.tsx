import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../config/context";
import { useNavigate } from "react-router-dom";
import { fetchProfileData } from "../../API/FreelancerApi";
import { profileCompletionForm } from "../ProfileCompletionParts/CompletionForm";
import ImageUploadComponent from "../ExtraComponents/ImageUploadComponent";
import FreelancerProfileUpdateForm from "../ExtraComponents/FreelancerProfileUpdateForm";

function FreelancerProfilePage() {
  const { freelancerDetails, setFreelancerDetails,isEdit,setIsEdit,setImageSrc,imageSrc } = useContext(AuthContext);
  const navigate = useNavigate();
  const [baseData, setBaseData] = useState<profileCompletionForm>();
//    const [isEdit, setIsEdit] = useState(false)
//   const [imageSrc, setImageSrc] = useState<string>("https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg");


  useEffect(() => {
    const fetchData = async () => {
      console.log(freelancerDetails);
      if (freelancerDetails && freelancerDetails._id) {
        try {
          const response = await fetchProfileData();
          console.log(response.userDetails);
          setBaseData(response.userDetails);
          console.log(baseData,"base data here..");
          
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      } else {
        navigate("/");
      }
    };

    fetchData();
  }, [freelancerDetails, navigate]);


  useEffect(() => {
    const storedDataString = localStorage.getItem('user_data');
    if(storedDataString){
      let obj = JSON.parse(storedDataString)
      setFreelancerDetails(obj)
    }
  }, [isEdit]);


  useEffect(() => {
    if(freelancerDetails){
        if(freelancerDetails?.profile!=""){
            setImageSrc(freelancerDetails?.profile)
        }else{
            setImageSrc("https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg")
        }
    }
  }, [freelancerDetails])
  
  const logoutHandler = () => {
    localStorage.removeItem("user_data");
    setFreelancerDetails(null);
  };
  return (
    <>
      <div className="bg-gray-50 :min-h-screen pb-10">
        <div className="flex text-gray-900 w-full px-32 pt-12">
          <div className="w-2/5 ">
            <div className="w-full max-w-sm bg-white border-t-[1px] border-gray-100 rounded shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-end px-4 pt-4">
                {/* <button
                  id="dropdownButton"
                  data-dropdown-toggle="dropdown"
                  className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                  type="button"
                >
                  <span className="sr-only">Open dropdown</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </button> */}
                <p onClick={()=>{ isEdit ? setIsEdit(false) : setIsEdit(true) }} className="text-blue-800 cursor-pointer">  {isEdit ? "back" : "Edit Profile" }</p>
                <div
                  id="dropdown"
                  className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul className="py-2" aria-labelledby="dropdownButton">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        {isEdit ? "back" : "Edit Profile" }
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col items-center ">
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
                  src={imageSrc}
                  alt="Bonnie image"
                />

                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  {freelancerDetails?.username}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  <i
                    className="fa-solid fa-badge-check"
                    style={{ color: "#1a62d5" }}
                  />{" "}
                  Freelancer
                </span>
                <button
                  onClick={logoutHandler}
                  type="button"
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-20 py-2.5 me-2 my-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Logout
                </button>

                <a className="block w-full  mt-4 bg-white border border-gray-200 rounded-lg  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"></a>

                <ul className="  w-full px-5 py-3 divide-y divide-gray-200  dark:divide-gray-700">
                  <li className="pb-3 sm:pb-4">
                    <div className="flex justify-between space-x-4 rtl:space-x-reverse">
                      <div className="font-medium">
                        <i className="fa-sharp fa-thin fa-location-dot m-2"></i>{" "}
                        {baseData?.Country}
                      </div>

                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"></div>
                    </div>

                    <div className="flex justify-between space-x-4 rtl:space-x-reverse">
                      <div className="flex-shrink-0 font-medium">
                        <i className="fa-light fa-envelope m-2"></i>{" "}
                        arshad@gmal.com
                      </div>

                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full mt-5 max-w-sm bg-white border-t-[1px] border-gray-100 rounded shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col items-center">
                <ul className="w-full px-5 py-3 divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="pb-3 sm:pb-4">
                    <div className="flex justify-between space-x-4 rtl:space-x-reverse">
                      <div className="font-medium">Description</div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"></div>
                    </div>
                    <p style={{ overflowWrap: "break-word" }}>
                      {baseData?.bio}
                    </p>
                  </li>

                  <li className="pb-3 py-4 sm:pb-4">
                    <div className="flex justify-between space-x-4 rtl:space-x-reverse">
                      <div className="font-medium">
                        <i className="fa-regular fa-language" /> Language
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"></div>
                    </div>
                    <p style={{ overflowWrap: "break-word" }}>
                      {baseData?.language}
                    </p>
                  </li>

                  <li className="pb-3 py-4 sm:pb-4">
                    <div className="flex justify-between space-x-4 rtl:space-x-reverse">
                      <div className="font-medium mb-3"> Skills</div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"></div>
                    </div>
                    <div>
                      <>
                        {baseData?.skillsList.map((skill) => {
                          return (
                            <span
                              id="badge-dismiss-dark"
                              className="inline-flex mb-2 items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
                            >
                              {skill}
                            </span>
                          );
                        })}
                      </>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-3/5 ... ">
            
            
            
              
              <div className="min-h-60 flex flex-col bg-white border shadow-sm rounded dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
              { !isEdit ?
               <>
                <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
                  <svg
                    className="size-10 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1={22} x2={2} y1={12} y2={12} />
                    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                    <line x1={6} x2="6.01" y1={16} y2={16} />
                    <line x1={10} x2="10.01" y1={16} y2={16} />
                  </svg>
                  <p className="mt-5 text-sm text-gray-800 dark:text-gray-300">
                    No Post to show
                  </p>
                </div>
                
                </>
            : 
            <>

            {/* //edit page  */}
            <div className="p-10">
                {/* <div>
                <img className="mx-auto w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
                  src="https://media.altphotos.com/cache/images/2017/07/04/07/x800/portrait-man-dark.jpg"
                  alt="Bonnie image"
                />
                </div> */}
                <ImageUploadComponent/>
                <FreelancerProfileUpdateForm data={baseData}  />
                  </div>
            </>
            }

              </div>
            
           

          </div>


        </div>



      </div>
    </>
  );
}

export default FreelancerProfilePage;
