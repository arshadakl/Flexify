import { useEffect, useState } from "react";
import { deleteWork, getAllPost } from "../../common/utils/APIs/FreelancerApi";
import { IWork } from "../../interfaces/Freelancer";
import PostCards from "./PostCards";
import { motion } from "framer-motion";
import { fadeIn } from "../../common/animations/Frame_Motion/variants";
import { toast } from "sonner";

function MyPostList() {
  const [activePost, setActivePost] = useState<IWork[]>();
  const [suspendedPost, setSuspendedPost] = useState<IWork[]>();
  const [tab, setTab] = useState<string>("active");
  const [page,setPage]=useState(1)
  const [totalPages,setTotalPages] = useState(0)
  const fetchActivePost = async (page:number) => {
    const response = await getAllPost(page);
    console.log(response);
    
    if (response.status) {
      setTotalPages(response.active.totalPages)
      setActivePost(response.active.works);
      setSuspendedPost(response.suspended);
    }
  };

  useEffect(() => {
    // const fetchActivePost = async () => {
    //   const response = await getAllPost();
    //   if (response.status) {
    //     setActivePost(response.active);
    //     setSuspendedPost(response.suspended);
    //   }
    // };
    fetchActivePost(page);
  }, []);

  const handdileDelete = async (id: any) => {
    const response = await deleteWork(id);
    if (response.status) {
      const response = await getAllPost(page);
      if (response.status) {
        setActivePost(response.active);
        setSuspendedPost(response.suspended);
      }
      toast.success("Work deleted successfully");
    } else {
      toast.warning(response.error);
    }
  };

  useEffect(() => {
    console.log(activePost);
  }, [activePost]);

  const handile=(pageNew:number)=>{
    if(pageNew === totalPages+1 || pageNew===0) return
    fetchActivePost(pageNew);
    setPage(pageNew)

  }
  return (
    <>
      <div className="bg-slate-100 pt-32 w-full py-5 min-h-screen font-poppins">
        <div className="w-11/12 flex md:flex-row flex-col mx-auto md:gap-5">
          <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false }}
          className=" md:w-3/12 w-2/2  ">
            <div className="   ">
              <div className="px-3 border py-4 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2">
                  <li>
                    <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ">
                      <span className="ml-3 font-semibold">Work Posts</span>
                    </div>
                  </li>
                  <hr />
                  <li>
                    <div
                      onClick={() => setTab("active")}
                      className="cursor-pointer flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <i className="fa-solid fa-subtitles text-gray-500" />

                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Active
                      </span>
                      <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                        {activePost?.length}
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => setTab("suspend")}
                      className="flex items-center cursor-pointer p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <i className="fa-solid fa-subtitles-slash text-gray-500" />

                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Suspended
                      </span>
                      <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
                        {suspendedPost?.length}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
          <div className=" md:w-8/12 w-2/2 ">
            <h1 className="text-xl font-poppins capitalize">{tab} Works</h1>
            <hr className="my-2" />
            { <motion.div
              variants={fadeIn("down", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false }}
              className=" border flex flex-col gap-5  "
            >
              {activePost && suspendedPost && (
                <PostCards handdileDelete={handdileDelete} tab={tab}
                  posts={tab == "active" ? activePost : suspendedPost}
                />
              )}
              {activePost?.length==0 && tab == "active" && <div className="text-center py-5 font-semibold text-slate-300">
                No Work Found
              </div> }
              {suspendedPost?.length==0 && tab !== "active" && <div className="text-center py-5 font-semibold text-slate-300">
                No Suspended Work Found
              </div> }
            </motion.div>}

            <div className="flex justify-end my-2">
            <nav aria-label="Page navigation example">
  <ul className="flex items-center -space-x-px h-8 text-sm">
    <li onClick={()=>handile(page-1)}>
      <a
       
        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <span className="sr-only">Previous</span>
        <svg
          className="w-2.5 h-2.5 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 1 1 5l4 4"
          />
        </svg>
      </a>
    </li>
    
    <li>
      <a
        aria-current="page"
        className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
      >
       {page}
      </a>
    </li>
    
    
    <li onClick={()=>handile(page+1)}>
      <a
        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <span className="sr-only">Next</span>
        <svg
          className="w-2.5 h-2.5 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 9 4-4-4-4"
          />
        </svg>
      </a>
    </li>
  </ul>
</nav>

            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPostList;
