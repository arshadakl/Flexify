import { useEffect, useState } from "react";
import NavBar from "../../common/components/Navbar/NavBar";
import SinglePagePayment from "../../freelancers/components/SinglePagePayment";
import SingleWorkSection from "../../freelancers/components/SingleWorkSection";
import { IWork } from "../../interfaces/Freelancer";
import { useParams } from "react-router-dom";
import { getSingleWorkAPI } from "../../common/utils/APIs/FreelancerApi";
import Loading from "../../common/components/ExtraComponents/Loading";

function SinglePage() {
  const [isLoad,setIsLoad] = useState<boolean>(false)
  
  const [post, setPost] = useState<IWork>();
  const { id } = useParams();
  useEffect(() => {
    console.log(id);

    const fetchData = async () => {
      if (id) {
        const response = await getSingleWorkAPI(id);
        if (response.status) {
          setPost(response.data);
        }
      }
    };
    fetchData();
  }, [id]);
  // console.log(post);

  return (
    <>
  {isLoad ? <Loading/> : null}

      <NavBar bg="white" fixed="none" />
      <div className="flex md:flex-row flex-col  md:w-5/6 w-5/6 mx-auto mt-5 gap-3 ">
        <div className="md:w-4/5 mb-5 ">
          {post && <SingleWorkSection post={post} />}
        </div>
        <div className="md:w-2/5 ">
          <div className=" w-full mt-16 border border-gray-300 rounded">
            {post && <SinglePagePayment setIsLoad={setIsLoad} post={post} />}
          </div>
          <div className="w-full  my-2  bg-gray-50 rounded">
            <div className="text-md font-bold px-2 py-5">
              <button
                type="button"
                className="text-gray-950 border border-gray-800 w-full  hover:bg-[#24292F]  font-medium rounded-lg text-sm px-5 py-2 inline-flex hover:text-white items-center dark:focus:ring-gray-500 dark:hover:bg-[#fff]/30 me-2 mb-2"
              >
                <p className="w-3/5 text-end">Contact me</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePage;
