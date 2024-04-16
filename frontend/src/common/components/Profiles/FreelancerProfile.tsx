import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/config/context";
import { useNavigate } from "react-router-dom";
import AxiosInterceptor, { fetchProfileData} from "../../utils/APIs/FreelancerApi";
import { profileCompletionForm } from "../ProfileCompletionParts/CompletionForm";
import ImageUploadComponent from "../ExtraComponents/ImageUploadComponent";
import FreelancerProfileUpdateForm from "../ExtraComponents/FreelancerProfileUpdateForm";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Redux/Slices/freelancerSlice";
import { persistor } from "../../../Redux/store";
// import { IWork } from "../../../interfaces/Freelancer";
import ProfileWorksList from "../ExtraComponents/ProfileWorksList";
import {motion} from 'framer-motion'
import { fadeIn } from "../../animations/Frame_Motion/variants";


function FreelancerProfilePage() {
  const { isEdit, setIsEdit } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileData = useSelector((state: any) => state.freelancer);
  const freelancerDetails = profileData.freelancer;
  const [baseData, setBaseData] = useState<profileCompletionForm>();
  // const [wordData, setWordData] = useState<IWork[]>();
  //    const [isEdit, setIsEdit] = useState(false)
  //   const [imageSrc, setImageSrc] = useState<string>("https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg");

  const handleLogout = () => {
    console.log("called to logout");

    dispatch(logout()); // Dispatch the logout action
    persistor.purge(); // Then purge the persisted data
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(freelancerDetails, "redux profile data");
      if (freelancerDetails.token) {
        try {
          const response = await fetchProfileData();
          console.log(response, "das das dsad");
          setBaseData(response.userDetails);
          console.log(baseData, "base data here..");
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      } else {
        navigate("/");
      }
    };

    fetchData();
  }, [freelancerDetails, navigate]);



  return (
    <>
      <AxiosInterceptor />
      <div className="bg-gray-50 :min-h-screen pb-10">
        <div className="flex md:flex-row flex-col text-gray-900 w-screen gap-10 px-10 pt-12">
          <div className="md:w-2/5 w-1/1">
            <div className="w-4/5 md:1/2  mx-auto bg-white border-t-[1px] border-gray-100 rounded shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-end px-4 pt-4">
                <p
                  onClick={() => {
                    isEdit ? setIsEdit(false) : setIsEdit(true);
                  }}
                  className="text-blue-800 cursor-pointer"
                >
                  {" "}
                  {isEdit ? "back" : "Edit "}
                </p>
                <div
                  id="dropdown"
                  className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul className="py-2" aria-labelledby="dropdownButton">
                    <li>
                      <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        {isEdit ? "back" : "Edit Profile"}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col   items-center ">
                {freelancerDetails?.profile == "" ? (
                  <img
                    className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
                    src="https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg"
                    alt="Bonnie image"
                  />
                ) : (
                  <img
                    className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
                    src={freelancerDetails?.profile}
                    alt="Bonnie image"
                  />
                )}

                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  {freelancerDetails?.username}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  <i
                    className="fa-solid fa-badge-check "
                    style={{ color: "#1a62d5" }}
                  />{" "}
                  {freelancerDetails.role}
                </span>
                <button
                  onClick={handleLogout}
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
                        {profileData.freelancer.email}
                      </div>

                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-4/5 md:1/2  mt-5  mx-auto  border-t-[1px] border-gray-100 rounded shadow dark:bg-gray-800 dark:border-gray-700">
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

          {/* <div > */}
            <motion.div variants={fadeIn("up",0.01)} initial="hidden" whileInView={"show"} viewport={{once:true}} className="md:w-3/5  w-1/1 "> 
            <div className="min-h-60  flex flex-col bg-white border shadow-sm rounded dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
              {!isEdit ? (
                <>
                  <div className="flex flex-auto flex-col justify-center  items-center p-4 md:p-5">
                    <ProfileWorksList/>
                  </div>
                </>
              ) : (
                <>
                  {/* //edit page  */}
                  <div className="p-10">
                    <ImageUploadComponent />
                    <FreelancerProfileUpdateForm
                      data={baseData}
                      set={setBaseData}
                    />
                  </div>
                </>
              )}
            </div>
            </motion.div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default FreelancerProfilePage;
