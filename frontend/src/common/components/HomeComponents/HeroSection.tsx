// import NavBar from "../Navbar/NavBar";

import { motion, MotionConfig } from "framer-motion";
import { SyntheticEvent, useEffect, useState } from "react";
import { fadeIn } from "../../animations/Frame_Motion/variants";
import { useNavigate } from "react-router-dom";
import { initFlowbite } from "flowbite";
import { CategoryInter } from "../../../interfaces/Admin";
import { getAllCategories } from "../../utils/APIs/FreelancerApi";

function HeroSection() {
  
  

  const [searchKey, setSsearchKey] = useState<string>("");
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryInter[]>();
  const manageSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    navigate(`/works?search=${searchKey}`);
  };

  useEffect(() => {
    initFlowbite();
    const fetch = async () => {
      const categoriesData = await getAllCategories();
      if (categoriesData.data) {
        setCategories(categoriesData.data);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <MotionConfig transition={{ duration: 1 }}>
        <motion.div
          // initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          variants={fadeIn("down", 0.5)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true }}
          className="flex 
           
            bg-flexy-green hero-banner h-50vh lg:h-80vh "
        >
           {/* lg:bg-[url('/images/heroBanner.jpg')] */}
          {/* Left Pane */}
          {/* <img src="/images/FlexifyBlack.png" className="absolute w-28 m-8  lg:block hidden" alt="" /> */}
          {/* <NavBar/> */}
          <div className="w-full  lg:w-1/2 flex items-center justify-end sm:justify-center ">
            <div className="max-w-md  w-full  mx-auto">
              {/* Your form elements go here */}
              <div className="flex flex-col  items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-screen   md:mt-0 sm:max-w-lg  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-1 md:space-y-6 sm:p-8">
                    <motion.h1
                      variants={fadeIn("up", 0.8)}
                      initial="hidden"
                      whileInView={"show"}
                      viewport={{ once: true }}
                      className="text-2xl text-white lg:text-4xl font-poppins m-0 py-5 font-semibold leading-tight tracking-tight   dark:text-white"
                    >
                      Find the right freelance <br />
                      service, right away
                    </motion.h1>
                    <form
                      onSubmit={(e) => manageSearch(e)}
                      className="max-w-lg mx-auto"
                    >
                      <motion.div
                        variants={fadeIn("right", 1)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true }}
                      >
                        <div className="flex">
                          <label
                            htmlFor="search-dropdown"
                            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                          >
                            Your Email
                          </label>
                          <button
                            id="dropdown-button"
                            data-dropdown-toggle="dropdown"
                            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                            type="button"
                          >
                            All categories{" "}
                            <svg
                              className="w-2.5 h-2.5 ms-2.5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 10 6"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m1 1 4 4 4-4"
                              />
                            </svg>
                          </button>
                          <div
                            id="dropdown"
                            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                          >
                            <ul
                              className="py-2 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby="dropdown-button"
                            >
                              {categories?.map((category: CategoryInter) => {
                                return (
                                  <li>
                                    <button
                                      type="button" onClick={()=>setSsearchKey(category.title)}
                                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      {category.title}
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div className="relative w-full">
                            <input
                              type="search"
                              value={searchKey}
                              onChange={(e) => setSsearchKey(e.target.value)}
                              id="search-dropdown"
                              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                              placeholder="Search Logo, Design..."
                            />
                            <button
                              type="submit"
                              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-logo-green rounded-e-lg border border-logo-green hover:bg-logo-green focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                              </svg>
                              <span className="sr-only">Search</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Pane */}
          <div className="hidden signup-banner lg:flex bg-flexy-green  items-center justify-center flex-1  text-black">
          {/* <Lottie options={defaultOptions} height={550} width={550} /> */}
          <video className="bg-flexy-green h-full" autoPlay loop muted playsInline>
      <source src="/images/bg-home.webm" type="video/webm" />
    </video>
        </div>
        </motion.div>
      </MotionConfig>
    </>
  );
}

export default HeroSection;
