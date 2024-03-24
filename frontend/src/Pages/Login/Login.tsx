import { useContext, useState } from "react";
import { LoginApi, googleAuthLogin } from "../../API/FreelancerApi";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../../config/context";

// interface EmailVerificationProps {
//   email: string;
// }
function Login() {
  const { setFreelancerDetails } = useContext(AuthContext);
  
  interface FormData {
    username: string;
    password: string;
  }

  const navigate = useNavigate();

//   const [isOTP, setIsOTP] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!formData.username.trim()) {
      toast.error("Please enter a username.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }


    // All validations passed, proceed with signup
    try {
      const signupResponse: any = await LoginApi(formData);
      console.log(signupResponse.status,"reposenseses");
      if (signupResponse.status) {
        // setIsOTP(true);
        toast.success("Successfully Logined")
        setFreelancerDetails(signupResponse.freelancer)

        const userDataString = JSON.stringify(signupResponse.freelancer);
        localStorage.setItem('user_data', userDataString);

        navigate('/')
      } else {
        toast.error(signupResponse.error);
      }
    } catch (error) {
      // Handle other errors
      console.error("Error during signup:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  // useGoogleOneTapLogin({
  //   onSuccess: credentialResponse => {
  //     console.log(credentialResponse);
  //   },
  //   onError: () => {
  //     console.log('Login Failed');
  //   },
  // });

  const handlGoogleAuth = async(key:string)=>{
    try {
      const response = await googleAuthLogin(key)
      console.log(response);
      
      if(response.status){
        toast.success("Successfully Logined")
        setFreelancerDetails(response.freelancer)
        const userDataString = JSON.stringify(response.freelancer);
        localStorage.setItem('user_data', userDataString);
        navigate('/')
      }else{
        toast.error(response.error)
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  }

  return (
    <>
      
        <section >
          <Toaster richColors position="top-left" />
          {/* component */}
      <div className="flex h-screen ">
        {/* Left Pane */}
        <img onClick={()=>navigate('/')} src="/images/FlexifyBlack.png" className="absolute w-28 m-8  lg:block hidden" alt="" />
        <div className="w-full bg-white lg:w-1/2 flex items-center justify-end sm:justify-center">
          <div className="max-w-md  w-full  mx-auto">
          
            <div className="flex flex-col  items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div className="w-screen bg-white  md:mt-0 sm:max-w-lg  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-1 md:space-y-6 sm:p-8">
                  <img src="/images/FlexifyBlack.png" className="w-52 mx-auto sm:mb-12 lg:hidden" alt="" />
                  <h1 className="text-xl text-center lg:text-2xl m-0 p-0 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Welcome Back 👋
                  </h1>
                  <p className="font-poppins text-lg text-center font-light" style={{marginTop:"0.5rem"}}>
                  Sign in now
                  </p>
                  <form
                    className="space-y-3 "
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    <div className="w-4/5 mx-auto flex justify-between mt-4">
                      <div className=" w-full m-1">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                         User Name
                        </label>
                        <input
                          type="text"
                          value={formData.username}
                          name="username"
                          onChange={handleChange}
                          className="bg-cyan-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="set a name"
                        />
                      </div>
                      
                    </div>

                    <div className="w-4/5 mx-auto flex justify-between">
                      <div className=" w-full m-1">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Password
                        </label>
                        <input
                          type="password"
                          value={formData.password}
                          name="password"
                          onChange={handleChange}
                          className="bg-cyan-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="At least 8 characters"
                        />
                      </div>
                     
                    </div>
    <p className="text-end mx-12 text-sm text-blue-600">Forgot Password?</p>
                    <button
                      type="submit"
                      className="w-4/5 mx-11 text-white bg-zinc-950 hover:bg-zinc-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-dark dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Sign In
                    </button>
                    <hr />
                    <div className="flex justify-center">
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          console.log("test",credentialResponse);
                          if(credentialResponse.credential){
                            handlGoogleAuth(credentialResponse.credential);
                          }
                          
                        }}
                        onError={() => {
                          console.log("Login Failed");
                          toast.error("Login Failed");
                        }}
                      />
                    </div>

                    <p className="cursor-pointer text-sm text-center font-light text-gray-500 dark:text-gray-400">
                    Don't have an account yet?{" "}
                      <a onClick={()=>navigate('/signup')} className="font-medium text-blue-600 hover:underline dark:text-primary-500">
                        Sign up
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Pane */}
        <div className="hidden signup-banner lg:flex bg-[url('/images/signup-banner3.jpg')]   items-center justify-center flex-1 bg-white text-black">
          <div className=" text-center">
          
          </div>
        </div>
      </div>
        </section>
      )
    </>
  );
}

export default Login;
