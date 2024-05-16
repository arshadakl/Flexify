import { useParams } from "react-router-dom";
import ChatBox from "../../freelancers/components/ChatBox";
import { useEffect, useState } from "react";
import { getFreelancerDataAPI } from "../../common/utils/APIs/ClientApi";
// import { Freelancer } from "../../interfaces/Freelancer";
// import animationData from "../../common/animations/gradient-animation2.json";
// import Lottie from "react-lottie";

function ChatingComponent() {
  const { id } = useParams();
  const [data, setData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getFreelancerDataAPI(id as string);
      if (response.status) {
        setData(response.details);
      }
    };
    fetchData();
  }, [id]);

  

  return (
    <>
      <div className="flex md:flex-row flex-col  text-gray-900 w-screen md:max-h-screen md:overflow-hidden  gap-1 md:px-5 px-1 py-32 mb-24">
        <div className="md:w-2/5 w-1/1 ">
          <div className="w-full  md:max-h-screen md:overflow-y-scroll md:pb-10 ">
          <div className=" w-11/12 font-poppins md:1/2  items-center  mx-auto bg-slate-50/80 pb-7   rounded  dark:bg-gray-800 dark:border-gray-700 ">
            {/* <div className="relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none"> */}
            <div className="relative  flex h-40 w-full justify-center rounded-xl ">
             
              <div  className="rounded-xl gradient-background-black absolute h-40 bg-cover w-full">
                {/* <Lottie
                  options={defaultOptions}
                  style={{ borderRadius: "1rem" }}
                  height={"100%"}
                  width={"100%"}
                /> */}
              </div>

              <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                {data?.profile == "" ? (
                  <img
                    className="h-full w-full rounded-full "
                    src="https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg"
                    alt=""
                  />
                ) : (
                  <img
                    className="h-full w-full rounded-full "
                    src={data?.profile}
                    alt=""
                  />
                )}
              </div>
            </div>
            <div className="mt-16 flex flex-col items-center">
              <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                {data?.username}
              </h4>
              <p className="text-base font-normal text-gray-600">
                <i className="fa-solid fa-badge-check text-blue-500" />{" "}
                Freelancer
              </p>
              <p className="text-base font-medium text-blue-900 ">
                <i className="fa-solid fa-at " /> {data?.email}
              </p>
            </div>
          </div>

          <div className="w-11/12 md:1/2  mb-32  mx-auto bg-slate-50/80 border-t-[1px] border-gray-100 rounded  dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center">
              <ul className="w-full px-5 py-5 divide-y divide-gray-200 dark:divide-gray-700">
                <li className="pb-3 sm:pb-4">
                  <div className="flex justify-between space-x-4 rtl:space-x-reverse">
                    <div className="font-medium">Description</div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"></div>
                  </div>
                  <p className="" style={{ overflowWrap: "break-word" }}>
                    {data?.userDetails && data?.userDetails[0].bio}
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
                    {data?.userDetails && data?.userDetails[0].language}
                  </p>
                </li>

                <li className="pb-3 py-4 sm:pb-4">
                  <div className="flex justify-between space-x-4 rtl:space-x-reverse">
                    <div className="font-medium mb-3"> Skills</div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"></div>
                  </div>
                  <div>
                    <>
                      {data?.userDetails &&
                        data?.userDetails[0].skillsList.map((skill:any) => {
                          return (
                            <span
                              id="badge-dismiss-dark"
                              className="inline-flex mb-2 items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-slate-200 rounded dark:bg-gray-700 dark:text-gray-300"
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
        </div>

        <div className="md:w-3/5 w-1/1">
          {data && <ChatBox client={data} />}
        </div>
      </div>
    </>
  );
}

export default ChatingComponent;
