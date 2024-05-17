import { SyntheticEvent, useEffect, useState } from "react";
import {
  getAllCategories,
  getAllWorks,
} from "../../common/utils/APIs/FreelancerApi";
import { IWork } from "../../interfaces/Freelancer";
import { ShortenDescription } from "../../common/utils/Services/shortenDescription";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../common/utils/config/context";
import { motion, MotionConfig } from "framer-motion";
import { fadeIn } from "../../common/animations/Frame_Motion/variants";
import { CategoryInter } from "../../interfaces/Admin";

function WorkList() {
  const queryParams = new URLSearchParams(location.search);
  const searchKey = queryParams.get("search");
  const [wordData, setWordData] = useState<any>();
  const [categories, setCategories] = useState<CategoryInter[]>();
  const [page, setPage] = useState<number>(1);
  const [skey, setSkey] = useState<string>("");
  // const [fkey, setFkey] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();

  const fetchData = async (
    skeynew: string,
    fkeynew: string,
    pagenew: number
  ) => {
    const response = await getAllWorks(skeynew, fkeynew, pagenew);
    setTotalPages(response.data.totalPages);
    setWordData(response.data.works);
  };

  // fetchData();
  useEffect(() => {
    const fetch = async () => {
      const categoriesData = await getAllCategories();
      if (categoriesData.data) {
        setCategories(categoriesData.data);
      }
    };
    fetch();
    if(searchKey){
      fetchData(searchKey as string, "", page);
    }else{
      fetchData("", "", page);
    }
  }, []);


  // const {setSelectedWork} = useContext(AuthContext);

  const handileSinglePage = (work: IWork) => {
    // setSelectedWork(work)
    navigate(`/works/single/${work._id}`);
  };

  const handilePagenation = (pageNm: number) => {
    if (pageNm == 0 || pageNm == totalPages + 1) return;
    setPage(pageNm);
    fetchData("", "", pageNm);
  };

  const handileSearch = (e:SyntheticEvent) => {
    e.preventDefault();
    fetchData(skey, "", 1)
    setSkey('')

  };

  const handileFilter = (fkey:string) => {
    fetchData(fkey, "", 1)

  };
  return (
    <>
      <MotionConfig transition={{ duration: 1.2 }}>
        <main className="w-full grid ">
          <div className="w-9/12  mt-5 grid md:grid-flow-col grid-flow-row place-self-end center ">
            <h1 className="font-semibold text-xl mx-5 my-auto ">Most popular Services </h1>
            <h1 className="font-semibold text-2xl place-self-end center  mx-10  w-full gap-5">
              <form onSubmit={(e)=>handileSearch(e)} className="w-full mx-auto my-3" >
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm  font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                  </div>
                  <input
                    type="search"
                    id="default-search" value={skey} onChange={(e)=>setSkey(e.target.value)}
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for creatives..."

                  />
                  <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-flexy-green/80 hover:bg-flexy-green focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            </h1>
            {/* <hr className="my-3" /> */}
          </div>
          <div className="flex md:flex-row flex-col">
            <div className="md:w-3/12 w-1/1 border h-full py-10">
              <>
                <h3 className="mb-4 px-5 font-semibold text-gray-900 dark:text-white">
                  Popular Categories
                </h3>
                <ul className="w-11/12 mx-auto px-5  text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {categories?.map((category: CategoryInter) => {
                    return (
                      <li key={category._id} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                          <input
                            id={category._id}
                            type="radio"
                            value={category.title}
                            onChange={(e)=>handileFilter(e.target.value)}
                            name="list-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor={category._id}
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {category.title}
                          </label>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </>
            </div>
            <div
              className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 md:w-9/12 w-1/1 gap-6"
              //  className="flex flex-wrap justify-center"
            >
              {wordData &&
                wordData?.map((work: any, index: number) => {
                  return (
                    <>
                      <motion.div key={work._id}
                        variants={fadeIn("down", ((index - 1) / 9) * 0.5 + 0.1)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true }}
                        className="w-11/12 mx-auto"
                        // className="lg:w-1/5 sm:w-2/5 w-1/1 m-3 "
                      >
                        <div className=" m-auto ">
                          <div className=" grid grid-cols-3 grid-rows-1 grid-flow-row overflow-hidden rounded border shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            <div className="col-span-3 row-span-4 p-1 m-1">
                              <p>
                                <img
                                  onClick={() => handileSinglePage(work)}
                                  src={work.image1}
                                  alt="Placeholder"
                                  className="rounded-t-lg object-cover cursor-pointer  w-full"
                                />
                              </p>
                            </div>
                            <div className="col-span-3 row-span-1">
                              <div className="flex align-bottom flex-col leading-none p-2 md:px-4">
                                <div className="flex flex-row justify-between items-center">
                                  <p
                                    onClick={() =>
                                      navigate(`/freelancer/${work.user._id}`)
                                    }
                                    className="cursor-pointer flex items-center no-underline  hover:underline text-black"
                                  >
                                    <div className=" w-17 h-7 ">
                                      <motion.img
                                        variants={fadeIn(
                                          "down",
                                          ((index - 1) / 18) * 0.5 + 0.1
                                        )}
                                        initial="hidden"
                                        whileInView={"show"}
                                        viewport={{ once: true }}
                                        alt="Placeholder"
                                        className="block object-cover w-7 h-7 rounded-[50px]  "
                                        src={
                                          work.user.profile
                                            ? work.user.profile
                                            : "https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg"
                                        }
                                      />
                                    </div>
                                    <motion.span
                                      variants={fadeIn(
                                        "down",
                                        ((index - 1) / 4) * 0.5 + 0.1
                                      )}
                                      className="ml-2 font-bold text-sm"
                                    >
                                      {work.user.username}
                                    </motion.span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-3 row-span-1">
                              <header className="flex items-center justify-between leading-tight px-4 ">
                                <h1 className="text-lg">
                                  <motion.p
                                    variants={fadeIn(
                                      "down",
                                      ((index - 1) / 20) * 0.5 + 0.1
                                    )}
                                    className="no-underline  font-poppins text-sm text-black"
                                  >
                                    {ShortenDescription(work.title, 28)}
                                  </motion.p>
                                </h1>
                                {/* <p className="text-grey-darker text-sm">9 min ago</p> */}
                              </header>
                            </div>
                            <div className="col-span-3 row-span-1">
                              <header className="flex items-center justify-between leading-tight px-4 ">
                                <h1 className="text-lg">
                                  <motion.p
                                    variants={fadeIn(
                                      "up",
                                      ((index - 1) / 20) * 0.5 + 0.1
                                    )}
                                    className="no-underline  font-poppins text-md font-bold text-black"
                                  >
                                    <i className="fa-sharp fa-regular fa-indian-rupee-sign" />{" "}
                                    {work.amount}
                                  </motion.p>
                                </h1>
                                {/* <p className="text-grey-darker text-sm">9 min ago</p> */}
                              </header>
                            </div>
                            <div className="col-span-3 row-span-1">
                              <ul className="flex flex-row pl-2 text-gray-600  hide-scroll-bar">
                                <li className="py-1">
                                  <div className="transition pb-3 duration-300 ease-in-out rounded-2xl mr-1 px-2 py-1 text-gray-500 hover:text-gray-800">
                                    {work.tags[0]
                                      .split(",")
                                      .slice(0, 2)
                                      .map((tag: any) => {
                                        return (
                                          <motion.span key={tag}
                                            variants={fadeIn("left", 1)}
                                            initial="hidden"
                                            whileInView={"show"}
                                            viewport={{ once: true }}
                                            className=" bg-gray-100 text-gray-800 text-sm font-medium me-2 px-1.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                                          >
                                            {tag}
                                          </motion.span>
                                        );
                                      })}
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  );
                })}
                
            </div>
            
          </div>
          <div className=" w-full flex justify-center my-5">
            {/* <nav aria-label="Page navigation example "> */}
            <ul className="inline-flex -space-x-px text-base h-10 ">
              <li className="cursor-pointer">
                <a
                  onClick={() => {
                    handilePagenation(page - 1);
                  }}
                  className=" flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </a>
              </li>

              <li>
                <a
                  aria-current="page"
                  className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  {page}
                </a>
              </li>

              <li className="cursor-pointer">
                <a
                  onClick={() => handilePagenation(page + 1)}
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </a>
              </li>
            </ul>
            {/* </nav> */}
          </div>
        </main>
      </MotionConfig>
      {/* pagenation */}

      <hr className="my-3" />
    </>
  );
}

export default WorkList;
