import { useNavigate } from "react-router-dom";

function SellerDetails({ seller,details }: { seller: any,details:any }) {
  const navigate = useNavigate()
  return (
    <>
      <div className="md:px-6 px-3 ">
        <h1 className="text-xl">About the seller</h1>
        <div>
          <p onClick={()=>navigate(`/freelancer/${seller._id}`)} className="cursor-pointer flex items-center no-underline  hover:underline text-black">
            <div className="py-5">
              <img
                alt="Placeholder"
                className="block object-cover w-16 h-16 rounded-[50px]  "
                src={seller.profile}
              />
            </div>
            <span className="ml-2  m-auto text-xl">{seller.username}</span>
          </p>
        </div>
        <div className="text-md font-bold  ">
          {/* <button
            type="button"
            className="text-gray-950 border border-gray-800  hover:bg-[#24292F]  font-medium rounded text-sm px-10 py-2 inline-flex hover:text-white items-center dark:focus:ring-gray-500 dark:hover:bg-[#fff]/30 me-2 mb-2" >
            <p className="text-end">Contact me</p>
          </button> */}
        </div>
        <div className="border p-5 rounded font-poppins">
            <h1 className="text-gray-500">From</h1>
            <h1 className="">{details.Country}</h1>
            <h1 className="text-gray-500 mt-2">Languages</h1>
            <h1 className="break-words">{details.language}</h1>
            <hr className="my-2" />
            <h1 className="break-words">{details.bio}</h1>
        </div>
      </div>
    </>
  );
}

export default SellerDetails;
