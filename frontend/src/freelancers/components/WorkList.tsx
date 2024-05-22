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
import Lottie from "react-lottie";
import animationData from "../../common/animations/not-found.json";
import { PostPuls } from "../../common/components/ExtraComponents/SkeletonComponent";
function WorkList() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const queryParams = new URLSearchParams(location.search);
  const [load, setLoad] = useState(false);
  const searchKey = queryParams.get("search");
  const [wordData, setWordData] = useState<any[]>([]);
  const [categories, setCategories] = useState<CategoryInter[]>();
  const [page, setPage] = useState<number>(1);
  const [skey, setSkey] = useState<string>("");

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleCategoryChange = (value: string) => {
    handileFilter(value);
  };
  // const [fkey, setFkey] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();

  const fetchData = async (
    skeynew: string,
    fkeynew: string,
    pagenew: number
  ) => {
    setLoad(true);
    const response = await getAllWorks(skeynew, fkeynew, pagenew);
    setTotalPages(response.data.totalPages);
    setWordData(response.data.works);
    setLoad(false);
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
    if (searchKey) {
      fetchData(searchKey as string, "", page);
    } else {
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

  const handileSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    fetchData(skey, "", 1);
    setSkey("");
  };

  const handileFilter = (fkey: string) => {
    fetchData(fkey, "", 1);
  };
  return (
    <>
      <MotionConfig transition={{ duration: 1.2 }}>
        <main className="w-full grid ">
          <div className="w-9/12  mt-0 grid md:grid-flow-col grid-flow-row place-self-end center ">
            
          </div>
          <div className="flex md:flex-row flex-col">
            <div className="md:w-3/12 w-1/1 border rounded-sm h-full py-8">
              <>
                <div className="mb-4 px-5">
                  <div className="mb-4 px-2">
                    <form className="" onSubmit={(e) => handileSearch(e)}>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <svg
                            className="w-5 h-5 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.9 14.32a8 8 0 111.41-1.41l4.25 4.24a1 1 0 01-1.42 1.42l-4.24-4.25zM8 14a6 6 0 100-12 6 6 0 000 12z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <input
                          type="text"
                          value={skey}
                          onChange={(e) => setSkey(e.target.value)}
                          placeholder="Search for creatives..."
                          className="w-full p-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="submit"
                          className="absolute inset-y-0 right-0 flex items-center px-4 py-1 m-1 text-white bg-blue-800 hover:bg-blue-700 rounded-full"
                        >
                          Search
                        </button>
                      </div>
                    </form>
                  </div>
                  <hr className="my-3" />
                  <h3 className="mb-4 px-5 font-semibold text-gray-900 dark:text-white">
                    <i className="fa-light fa-layer-group mr-1" /> Popular
                    Categories
                  </h3>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Search Category..."
                    className="w-full outline-none p-2 border border-gray-300 text-sm rounded-md"
                  />
                </div>

                <ul className="w-11/12 mx-auto px-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {categories
                    ?.filter((category) =>
                      category.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((category) => (
                      <li
                        key={category._id}
                        className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                      >
                        <div className="flex items-center ps-3">
                          <input
                            id={category._id}
                            type="radio"
                            value={category.title}
                            onChange={() =>
                              handleCategoryChange(category.title)
                            }
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
                    ))}
                </ul>
              </>
            </div>
            <div className="md:w-9/12 w-1/1 ">
              <h1 className="font-semibold text-xl py-4  mx-5 my-auto ">
                Most popular Services
              </h1>
            

            {wordData.length !== 0 ? (
              <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 w-1/1 gap-6">
                {wordData.length !== 0 &&
                  wordData?.map((work: any, index: number) => {
                    return (
                      <>
                        <motion.div
                          key={work._id}
                          variants={fadeIn(
                            "down",
                            ((index - 1) / 9) * 0.5 + 0.1
                          )}
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
                                            <motion.span
                                              key={tag}
                                              variants={fadeIn("left", 1)}
                                              initial="hidden"
                                              whileInView={"show"}
                                              viewport={{ once: true }}
                                              className=" bg-gray-100 text-gray-800 text-sm font-medium me-2 px-1.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                                            >
                                              {ShortenDescription(tag, 10)}
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
            ) : (
              <>
                {load ? (
                  <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 md:w-9/12 w-1/1 gap-6">
                    <PostPuls />
                    <PostPuls />
                    <PostPuls />
                  </div>
                ) : (
                  <div className="grid gird-cols-1  md:w-9/12 w-1/1  h-64  ">
                    <div className="opacity-30">
                      <Lottie
                        options={defaultOptions}
                        height={250}
                        width={250}
                      />
                      <h1 className="text-center text-2xl font-medium">
                        Work Not Found
                      </h1>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          </div>

          <div className="flex justify-center md:justify-end  my-5 w-full  ">
            {/* <nav aria-label="Page navigation example "> */}
            <div className=" flex justify-center md:w-9/12 w-1/1 ">
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
            </div>
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
