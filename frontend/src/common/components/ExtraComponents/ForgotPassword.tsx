import Lottie from 'react-lottie';
import animationData from '../../animations/forgotPassword.json'
import { useNavigate } from 'react-router-dom';
function ForgotPassword(data: any) {
  const navigate = useNavigate()
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };


  return (
    <div>
      <hr />
        {/* component */}
        <main id="content" role="main" className="w-full h-screen flex items-stretch  mx-auto  bg-gray-100 ">
          <div className=" bg-white md:w-3/6 lg:w-1/4 w-5/6 self-center my-auto mx-auto rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <Lottie options={defaultOptions} height={150} width={150} />
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  Forgot password?
                </h1>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Remember your password?
                  <a
                    className="text-blue-600 decoration-2 hover:underline font-medium" onClick={()=>navigate('/login')}
                  >
                    Login here
                  </a>
                </p>
              </div>
              <div className="mt-5">
                <form onSubmit={(e)=>data.api(e)}>
                  <div className="grid gap-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={data.email} onChange={(e)=>data.setEmail(e.target.value)}
                          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                          aria-describedby="email-error"
                        />
                      </div>
                      <p
                        className="hidden text-xs text-red-600 mt-2"
                        id="email-error"
                      >
                        Please include a valid email address so we can get back
                        to you
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                    >
                      Reset password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      
    </div>
  );
}

export default ForgotPassword;
