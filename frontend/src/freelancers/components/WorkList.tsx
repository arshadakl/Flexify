import {  useEffect, useState } from "react";
import { getAllWorks } from "../../common/utils/APIs/FreelancerApi";
import { IWork } from "../../interfaces/Freelancer";
import { ShortenDescription } from "../../common/utils/Services/shortenDescription";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../common/utils/config/context";
import {motion ,MotionConfig} from 'framer-motion'
import { fadeIn } from "../../common/animations/Frame_Motion/variants";

function WorkList() {
  const [wordData, setWordData] = useState<any>();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllWorks();
      setWordData(response.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(wordData, "work data");
  }, [wordData]);
  // const {setSelectedWork} = useContext(AuthContext);
  
  const handileSinglePage = (work:IWork)=>{
    // setSelectedWork(work)
    navigate(`/works/single/${work._id}`)
  } 
  return (
    <>
    <MotionConfig transition={{ duration: 1.2 }}>
      <main className="w-full">
        <div className="w-4/5 mt-5 flex flex-col mx-auto">
          <h1 className="font-semibold text-2xl">Most popular Services </h1>
          <hr className="my-3" />
        </div>
        <div className="flex flex-wrap justify-center">
          {wordData?.map((work:any,index:number) => {
            return (
              // <motion.div  variants={fadeIn("up",0.01)} initial="hidden" whileInView={"show"} viewport={{once:false}} onClick={() => handileSinglePage(work)}
              // className="w-1/5 pb-2  m-1 border border-l-stone-300 cursor-pointer rounded   shadow duration-150  hover:shadow">
              
              //   <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              //     className="w-full  object-cover object-center"
              //     src={work.image1}
              //     alt="product"
              //   />
              //   <motion.p variants={fadeIn("left",0.01)} initial="hidden" whileInView={"show"} viewport={{once:true}} className="my-4 pl-4 text-md font-bold text-gray-500">
              //     {ShortenDescription(work.title, 30)}
              //   </motion.p>
              //   <motion.p variants={fadeIn("left",0.01)} initial="hidden" whileInView={"show"} viewport={{once:true}} className="my-4 pl-4 text-md font-bold text-gray-900">
              //     <i className="fa-sharp fa-regular fa-indian-rupee-sign" />{" "}
              //     {work.amount}
              //   </motion.p>

              //   <span className="gap-1 mx-2 flex flex-wrap">
              //     {work.tags[0]
              //       .split(",")
              //       .slice(0, 2)
              //       .map((tag) => {
              //         return (
              //           <motion.span variants={fadeIn("up",0.01)} initial="hidden" whileInView={"show"} viewport={{once:true}} className=" bg-gray-100 text-gray-800 text-sm font-medium me-2 px-1.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
              //             {tag}
              //           </motion.span>
              //         );
              //       })}
              //   </span>
              //   <p className="ml-4 text-xl font-semibold text-gray-800"></p>
              // </motion.div>
              <>
              <motion.div   variants={fadeIn("down",(index - 1) / 9 * 0.5 + 0.1)} initial="hidden" whileInView={"show"} viewport={{once:true}} className="lg:w-1/5 sm:w-2/5 w-1/1 m-3 " onClick={() => handileSinglePage(work)}>
  <div className=" m-auto ">
    <div className=" grid grid-cols-3 grid-rows-1 grid-flow-row overflow-hidden rounded border shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="col-span-3 row-span-4 p-1 m-1">
        <p >
          <img
            src={work.image1}
            alt="Placeholder"
            className="rounded-t-lg object-cover  w-full"
          />
        </p>
      </div>
      <div className="col-span-3 row-span-1">
        <div className="flex align-bottom flex-col leading-none p-2 md:px-4">
          <div className="flex flex-row justify-between items-center">
            <p
              className="cursor-pointer flex items-center no-underline  hover:underline text-black" 
            >
              <div className=" w-17 h-7 ">
              <motion.img variants={fadeIn("down",(index - 1) / 18 * 0.5 + 0.1)} initial="hidden" whileInView={"show"} viewport={{once:true}}
                alt="Placeholder"
                className="block object-cover w-7 h-7 rounded-[50px]  "
                src={work.user.profile ? work.user.profile :"https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg"}
              />
              </div>
              <motion.span variants={fadeIn("down",(index - 1) / 4 * 0.5 + 0.1)} className="ml-2 font-bold text-sm">{work.user.username}</motion.span>
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-3 row-span-1">
        <header className="flex items-center justify-between leading-tight px-4 ">
          <h1 className="text-lg">
            <motion.p variants={fadeIn("down",(index - 1) / 20 * 0.5 + 0.1)} className="no-underline  font-poppins text-sm text-black">
            {ShortenDescription(work.title, 28)}
            </motion.p>
          </h1>
          {/* <p className="text-grey-darker text-sm">9 min ago</p> */}
        </header>
      </div>
      <div className="col-span-3 row-span-1">
        <header className="flex items-center justify-between leading-tight px-4 ">
          <h1 className="text-lg">
            <motion.p variants={fadeIn("up",(index - 1) / 20 * 0.5 + 0.1)} className="no-underline  font-poppins text-md font-bold text-black">
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
                    .map((tag:any) => {
                      return (
                        <motion.span variants={fadeIn("left",1)} initial="hidden" whileInView={"show"} viewport={{once:true}} className=" bg-gray-100 text-gray-800 text-sm font-medium me-2 px-1.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
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
</motion.div >

              </>
            );
          })}
        </div>
      </main>
      </MotionConfig>
    </>
  );
}

export default WorkList;
