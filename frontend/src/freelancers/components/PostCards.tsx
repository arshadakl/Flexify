import { useNavigate } from "react-router-dom";
import { ShortenDescription } from "../../common/utils/Services/shortenDescription";
import { IWork } from "../../interfaces/Freelancer";
import { motion } from "framer-motion";

const PostCards = ({ posts, tab }: { posts: IWork[]; tab: string }) => {
    const navigate = useNavigate()
  return (
    <>
      {posts.map((post) => {
        return (
          <>
            <motion.div className="flex w-full overflow-hidden gap-5">
              <div
                className="w-1/3 shadow bg-cover min-h-44"
                style={{
                  backgroundImage: `url(${post.image1})`,
                }}
              ></div>
              <div className="w-2/3 p-4 bg-white shadow flex flex-col justify-between">
                {" "}
                {/* Updated */}
                <div>
                  <h1 className="text-gray-900 font-bold text-xl">
                    {post.title}
                  </h1>
                  <p className="mt-2 text-gray-600 text-sm">
                    {ShortenDescription(post.description as string, 50)}
                  </p>
                </div>
                <div className="flex flex-col justify-end my-auto">
                  {" "}
                  {/* Updated */}
                  <div className="flex justify-between items-end">
                    <h1 className="text-gray-700 font-bold text-xl">
                      {post.amount}
                    </h1>
                    { tab=="active" && <button onClick={()=>navigate(`/edit-post?id=${post._id}`)} className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                      Edit Work
                    </button>}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        );
      })}
    </>
  );
};

export default PostCards;
