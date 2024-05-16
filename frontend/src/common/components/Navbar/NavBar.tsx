import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
import {
  logout,
  updateFreelancer,
} from "../../../Redux/Slices/freelancerSlice";
import { persistor } from "../../../Redux/store";
import { initFlowbite } from "flowbite";
import { motion } from "framer-motion";

import AxiosInterceptor, {
  switchRoleAPI,
} from "../../utils/APIs/FreelancerApi";
import { toast } from "sonner";
import RoleLoading from "../../animations/RoleLoading";
import CallNotification from "../ExtraComponents/CallNotification";
import NotificationSection from "../ExtraComponents/NotificationSection";

function NavBar({ bg, fixed }: { bg: string; fixed: string }) {
  const [role, setRole] = useState(null);
  const freelancerDetails = useSelector((state: any) => state.freelancer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDropdown, setIsDropDown] = useState<Boolean>(false);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    if (freelancerDetails.freelancer) {
      setRole(freelancerDetails.freelancer.role);
    }
  }, [freelancerDetails]);

  const manageDropdown = () => {
    if (isDropdown == false) {
      setIsDropDown(true);
    } else {
      setIsDropDown(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    navigate("/");
  };

  useEffect(() => {
    initFlowbite();
  }, []);

  const manageRoleChange = async () => {
    const role =
      freelancerDetails.freelancer.role == "client" ? "freelancer" : "client";
    setIsLoad(true);
    const response = await switchRoleAPI(role);
    if (response.status) {
      dispatch(updateFreelancer(response.userData));
      setTimeout(() => {
        setIsLoad(false);
        toast.success(response.message);
        navigate("/");
      }, 4000);
    } else {
      toast.error(response.error);
    }
  };
  return (
    <>
      <nav
        className={`transition duration-300 ease-out  border-gray-200 ${
          bg == "none" ? "text-white bg-transparent" : "text-black bg-gray-50"
        } ${fixed == "top" ? "fixed top-0 left-0 right-0" : ""}`}
      >
        <AxiosInterceptor />
        {isLoad && <RoleLoading />}

        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <p onClick={() => navigate("/")}>
            <img
              src={
                bg == "none"
                  ? `/images/FlexifyWhite.png`
                  : `/images/FlexifyBlack.png`
              }
              className="w-32"
              alt=""
            />
          </p>
          <button
            // data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={manageDropdown}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <CallNotification />
          <div
            className={`${
              isDropdown ? "" : "hidden"
            } w-full  md:block md:w-auto z-10 bg:`}
            id="navbar-default"
          >
            <ul className={`font-medium flex flex-col text-gray-800 ${bg == "none" ?  'md:text-white' : "text-gray-800" } p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  md:bg-transparent bg-slate-200 md:dark:bg-gray-900 dark:border-gray-700`}>
              <li>
                <p
                  onClick={() => navigate("/")}
                  className="block cursor-pointer py-2 px-3  bg-logo-green rounded md:bg-transparent  md:p-0 "
                  aria-current="page"
                >
                  Home
                </p>
              </li>
              <li>
                <p
                  onClick={() => navigate("/works")}
                  className="cursor-pointer block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-logo-green md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Discover works
                </p>
              </li>
              {freelancerDetails.freelancer !== null && role == "freelancer" ? (
                <li>
                  <p
                    onClick={() => navigate("/post")}
                    className="block cursor-pointer py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-logo-green md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Post works
                  </p>
                </li>
              ) : null}

              
              {freelancerDetails.freelancer !== null && (
                <>
                <li>

                  <NotificationSection bg={bg} /> 
                </li>
                </>
              )}

           

              {!freelancerDetails.freelancer ? (
                <li>
                  <p
                    onClick={() => navigate("/login")}
                    className="cursor-pointer block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-logo-green md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Sign In
                  </p>
                </li>
              ) : null}
              <li>
                {freelancerDetails.freelancer !== null ? (
                  <>
                   
                    <img
                      id="dropdownHoverButton"
                      data-dropdown-toggle="dropdownHover"
                      data-dropdown-trigger="hover"
                      className="w-7 h-7  rounded-full border-2 object-cover"
                      src={
                        freelancerDetails.freelancer.profile != ""
                          ? freelancerDetails.freelancer.profile
                          : "https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg"
                      }
                      alt="profile image"
                    /> 

                    <>
                      {/* Dropdown menu */}
                      <motion.div
                        id="dropdownHover"
                        initial={{ opacity: 0.5 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false }}
                        className="px-2 right-0 z-10 hidden bg-white divide-y divide-gray-100 border rounded-lg shadow w-72 dark:bg-gray-700"
                      >
                        <motion.ul
                          className="py-2 mx-auto text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownHoverButton"
                        >
                          <li>
                            {/* <p
                                onClick={() => navigate("/profile")}
                                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Profile
                              </p> */}
                            <p className="flex px-4 py-3  dark:hover:bg-gray-700">
                              <div className="flex-shrink-0">
                                <img
                                  id="dropdownHoverButton"
                                  className="w-11 h-11  rounded-full border-2 object-cover"
                                  src={
                                    freelancerDetails.freelancer.profile != ""
                                      ? freelancerDetails.freelancer.profile
                                      : "https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg"
                                  }
                                  alt="Bonnie image"
                                />
                              </div>
                              <div className="w-full ps-3">
                                <div className="text-gray-800 text-sm mb-1.5 dark:text-gray-400">
                                  {freelancerDetails.freelancer.username}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-600 m-0">
                                  {freelancerDetails.freelancer.email}
                                </div>
                              </div>
                            </p>
                            <p className="flex  py-3  dark:hover:bg-gray-700">
                              <motion.button
                                onClick={manageRoleChange}
                                type="button"
                                className="m-auto text-gray-900 hover:text-white w-full border border-gray-800 hover:bg-gray-900  focus:outline-none font-medium rounded text-sm px-5 py-2.5 text-center  dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                              >
                                Switch to{" "}
                                {freelancerDetails.freelancer.role == "client"
                                  ? "freelancer"
                                  : "client"}
                              </motion.button>
                            </p>
                          </li>
                          {/* <li>
                              <label className="inline-flex items-center cursor-pointer">
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                  Become freelancer
                                </span>
                                <input
                                  type="checkbox"
                                  defaultValue=""
                                  className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                              </label>
                            </li> */}

                          <motion.li>
                            <p
                              onClick={() => navigate("/profile")}
                              className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Profile
                            </p>
                          </motion.li>
                          {role == "client" && (
                            <>
                              <motion.li>
                                <p
                                  onClick={() => navigate("/client/orders")}
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Orders
                                </p>
                              </motion.li>
                              <motion.li>
                                <p
                                  onClick={() => navigate("/client/dashboard")}
                                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Dashboard
                                </p>
                              </motion.li>
                            </>
                          )}
                          {role !== "client" && (
                            <motion.li>
                              <p
                                onClick={() => navigate("/dashboard")}
                                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Dashboard
                              </p>
                            </motion.li>
                          )}
                          {/* {role == "client" && } */}
                          <hr />
                          <motion.li>
                            <p
                              onClick={handleLogout}
                              className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Sign out
                            </p>
                          </motion.li>
                        </motion.ul>
                      </motion.div>
                    </>
                  </>
                ) : (
                  <p
                    onClick={() => navigate("/signup")}
                    className="cursor-pointer outline-none py-2 px-3 rounded hover:bg-gray-100outline md:outline-2 md:outline-offset-8 md:hover:bg-transparent md:border-0 md:hover:text-logo-green md:p-0 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Join
                  </p>
                )}
              </li>
            </ul>
          </div>
        </div>
        {/* <hr /> */}
      </nav>
    </>
  );
}

export default NavBar;
