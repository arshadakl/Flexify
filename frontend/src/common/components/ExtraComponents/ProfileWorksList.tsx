import { useEffect, useState } from "react";
import { IWork } from "../../../interfaces/Freelancer";
import { getUsrAllWork } from "../../utils/APIs/FreelancerApi";
import { ShortenDescription } from "../../utils/Services/shortenDescription";
import { useNavigate } from "react-router-dom";

function ProfileWorksList() {
  const [wordData, setWordData] = useState<IWork[]>();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      const response = await getUsrAllWork();
      setWordData(response.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(wordData, "work data");
  }, [wordData]);

  return (
    <>
      <div className="w-full flex min-h-full  flex-wrap gap-5 ">
        {/* cards */}

        <div onClick={()=>navigate('/post')} className="w-1/5 pb-2 flex flex-col  m-1 border border-l-stone-300 cursor-pointer rounded   shadow duration-150  hover:shadow">
          <div className="m-auto text-xl text-center">
          <i className="fa-solid text-5xl fa-circle-plus" />
            <p className="text-[11px] font-normal">Create a new Work Post</p>
          </div>
        </div>
        {wordData?.map((work) => {
          return (
            <div className="w-1/5 pb-2  m-1 border border-l-stone-300 cursor-pointer rounded   shadow duration-150  hover:shadow">
              <img
                className="w-full  object-cover object-center"
                src={work.image1}
                alt="product"
              />
              <p className="my-4 pl-4 text-sm font-bold text-gray-500">
                {ShortenDescription(work.title, 20)}
                <i className="fa-sharp fa-regular fa-grip-dots" />
              </p>

              {/* {work.tags[0]
                .split(",")
                .slice(0, 2)
                .map((tag) => {
                  return (
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-1.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                      {tag}
                    </span>
                  );
                })} */}

              <p className="ml-4 text-xl font-semibold text-gray-800"></p>
            </div>
          );
        })}

        {/* cards */}
      </div>
    </>
  );
}

export default ProfileWorksList;
