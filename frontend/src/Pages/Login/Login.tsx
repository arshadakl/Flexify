import { useState } from "react";
import { SignupApi } from "../../API/FreelancerApi";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { GoogleLogin,useGoogleOneTapLogin } from "@react-oauth/google";
// interface EmailVerificationProps {
//   email: string;
// }
function Signup() {
  interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const navigate = useNavigate();

//   const [isOTP, setIsOTP] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.email.trim()) {
      toast.error("Please enter an email address.");
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // All validations passed, proceed with signup
    try {
      const signupResponse: any = await SignupApi(formData);
      console.log(signupResponse);
      if (signupResponse.status) {
        // setIsOTP(true);
      } else {
        toast.error(signupResponse.error);
      }
    } catch (error) {
      // Handle other errors
      console.error("Error during signup:", error);
      toast.error("Signup failed. Please try again.");
    }
  };
  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

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
            {/* Your form elements go here */}
            <div className="flex flex-col  items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div className="w-screen bg-white  md:mt-0 sm:max-w-lg  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-1 md:space-y-6 sm:p-8">
                  <img src="/images/FlexifyBlack.png" className="w-52 mx-auto sm:mb-12 lg:hidden" alt="" />
                  <h1 className="text-xl lg:text-2xl m-0 p-0 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Welcome Back 👋
                  </h1>
                  <p className="font-poppins text-lg font-light" style={{marginTop:"0.5rem"}}>
                    Today is a new day. It's your day. You shape it. Sign in to
                    start grow with us.
                  </p>
                  <form
                    className="space-y-4 "
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    <div className="w-full flex justify-between mt-8">
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
                      <div className="w-full m-1">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Email
                        </label>
                        <input
                           type="email"
                           value={formData.email}
                           name="email"
                           onChange={handleChange}
                          className="bg-cyan-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="example@flexify.com"
                        />
                      </div>
                    </div>

                    <div className="w-full flex justify-between">
                      <div className=" w-80 m-1">
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
                      <div className="w-80 m-1">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Confirm password
                        </label>
                        <input
                           type="password"
                           name="confirmPassword"
                           onChange={handleChange}
                           value={formData.confirmPassword}
                          className="bg-cyan-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="confirm password"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-zinc-950 hover:bg-zinc-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-dark dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Sign Up
                    </button>
                    <hr />
                    <div className="flex justify-center">
                      <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          console.log(credentialResponse);
                        }}
                        onError={() => {
                          console.log("Login Failed");
                        }}
                      />
                    </div>

                    <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                      already have an account ?{" "}
                      <a className="font-medium text-blue-600 hover:underline dark:text-primary-500">
                        Sign in
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

export default Signup;
