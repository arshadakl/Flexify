import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/config/context";
import { useNavigate } from "react-router-dom";
import AxiosInterceptor, {
  fetchProfileData,
} from "../../utils/APIs/FreelancerApi";
import { profileCompletionForm } from "../ProfileCompletionParts/CompletionForm";
import ImageUploadComponent from "../ExtraComponents/ImageUploadComponent";
import FreelancerProfileUpdateForm from "../ExtraComponents/FreelancerProfileUpdateForm";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Redux/Slices/freelancerSlice";
import { persistor } from "../../../Redux/store";
// import { IWork } from "../../../interfaces/Freelancer";
import ProfileWorksList from "../ExtraComponents/ProfileWorksList";
import { motion } from "framer-motion";
import { fadeIn } from "../../animations/Frame_Motion/variants";
// import OrdersTable from "../../../admin/components/OrdersTable";
import ProfileOrders from "../../../clients/components/ProfileOrders";
import { ShortenDescription } from "../../utils/Services/shortenDescription";

function FreelancerProfilePage() {
  const { isEdit, setIsEdit } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileData = useSelector((state: any) => state.freelancer);
  const freelancerDetails = profileData.freelancer;
  const [baseData, setBaseData] = useState<profileCompletionForm>();

  const handleLogout = () => {

    dispatch(logout());
    persistor.purge(); 
  };

  useEffect(() => {
    const fetchData = async () => {
      if (freelancerDetails.token) {
        try {
          const response = await fetchProfileData();
          setBaseData(response.userDetails);
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
      <div className="bg-slate-100 :min-h-screen pb-10">
        <div className="flex md:flex-row flex-col text-gray-900 w-screen gap-10 px-0 pt-12">
          <div className="md:w-2/5 w-1/1">
            <div className="md:w-4/5 w-1/1   mx-3 md:mx-auto bg-white border-t-[1px] border-gray-100 rounded shadow dark:bg-gray-800 dark:border-gray-700">
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
                      <div className="flex-shrink-0  font-medium md:text-md text-sm">
                        <i className="fa-light fa-envelope m-2"></i>{" "}
                        {profileData.freelancer.email}
                      </div>

                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="md:w-4/5 w-1/1   mt-5 mx-3 md:mx-auto bg-white border-t-[1px] border-gray-100 rounded shadow dark:bg-gray-800 dark:border-gray-700">
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
                              {ShortenDescription(skill,10)}
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
          <motion.div
            variants={fadeIn("up", 0.01)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className="md:w-3/5  w-1/1 mx-3"
          >
            <div className="min-h-60 transition-all flex flex-col shadow-sm rounded dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
              {!isEdit ? (
                <>
                  <div className="flex  flex-col justify-center  items-center  ">
                    {/* <ProfileWorksList/> */}

                    {freelancerDetails.role == "freelancer" ? (
                      <>
                        <div className=" bg-white py-2 px-5 flex gap-7 w-full ">
                          <div>
                            <p
                              className="font-semibold hover:font-bold cursor-pointer mx-5"
                              onClick={() => navigate("/my-post")}
                            >
                              My Post
                            </p>
                          </div>
                        
                          <div>
                            <p
                              className="font-semibold hover:font-bold cursor-pointer"
                              onClick={() => navigate("/dashboard")}
                            >
                              Dashboard
                            </p>
                          </div>
                        </div>
                        <ProfileWorksList />
                      </>
                    ) : (
                      <>
                        <div className="font-poppins flex flex-col w-full min-h-full">
                          <h1 className="underline py-5">Lastest Orders</h1>
                          <ProfileOrders />
                        </div>
                        {/* <OrdersTable  /> */}
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* //edit page  */}
                  <div className=" bg-white py-2 px-5 flex gap-7 w-full ">
                          <div>
                            <p
                              className="font-semibold hover:font-bold cursor-pointer mx-5"
                              onClick={() => navigate("/my-post")}
                            >
                              My Post
                            </p>
                          </div>
                          <div>
                            <p
                              className="font-semibold hover:font-bold cursor-pointer"
                              onClick={() => navigate("/work-orders")}
                            >
                              My Orders
                            </p>
                          </div>
                          <div>
                            <p
                              className="font-semibold hover:font-bold cursor-pointer"
                              onClick={() => navigate("/dashboard")}
                            >
                              Dashboard
                            </p>
                          </div>
                        </div>
                  <div className="font-poppins w-full flex min-h-full">
                    <h1 className="underline py-3 font-semibold">
                      Edit Profile
                    </h1>
                  </div>
                  <motion.div
                    className="p-10 mt-5 bg-white"
                    variants={fadeIn("up", 0.1)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true }}
                  >
                    <ImageUploadComponent />
                    <FreelancerProfileUpdateForm
                      data={baseData}
                      set={setBaseData}
                    />
                  </motion.div>
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
