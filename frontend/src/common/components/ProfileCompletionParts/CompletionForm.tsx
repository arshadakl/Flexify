import React, { SyntheticEvent, useContext, useState } from "react";
import { Toaster, toast } from "sonner";
import { AuthContext } from "../../utils/config/context";
import { profileCompletion } from "../../utils/APIs/FreelancerApi";

import { useNavigate } from "react-router-dom";
import { profileCompletionClient } from "../../utils/APIs/ClientApi";

export interface profileCompletionForm {
  firstName: string;
  lastName: string;
  Country: string;
  skillsList: string[];
  language: string;
  bio: string;
  user: string | null | undefined;
}

export interface profileCompletionFormClient {
  firstName: string;
  lastName: string;
  Country: string;
  language: string;
  bio: string;
  user: string | null | undefined;
}

const Profile = ({ userType }: { userType: string }) => {
  const [skills, setSkills] = useState<{ id: number; skill: string }[]>([]);
  const [input, setInput] = useState<string>("");
  const { setFreelancerDetails } = useContext(AuthContext);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  const [formData, setFormData] = useState<profileCompletionForm>({
    firstName: "",
    lastName: "",
    Country: "",
    language: "",
    skillsList: [],
    bio: "",
    user: userId,
  });

  const [formDataClient, setFormDataClient] =
    useState<profileCompletionFormClient>({
      firstName: "",
      lastName: "",
      Country: "",
      language: "",
      bio: "",
      user: userId,
    });

  // useEffect(() => {
  //   console.log("user ID : ", userId);
  //   console.log(userType);

  // }, [temp]);

  const addSkills = () => {
    if (input === "") return;

    const updatedSkills = [...skills, { id: Date.now(), skill: input }];
    setSkills(updatedSkills);

    // Update skillsList in formData
    const skillsArray = updatedSkills.map((item) => item.skill);
    setFormData({
      ...formData,
      skillsList: skillsArray,
    });

    setInput("");
  };

  const removeSkill = (id: number) => {
    const updatedSkills = skills.filter((item) => item.id !== id);
    setSkills(updatedSkills);

    // Update skillsList in formData
    const skillsArray = updatedSkills.map((item) => item.skill);
    setFormData({
      ...formData,
      skillsList: skillsArray,
    });
  };

  const handleChange: any = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log(formData);
  };

  // for client
  const handleChangeClient: any = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormDataClient({
      ...formDataClient,
      [event.target.name]: event.target.value,
    });
    console.log(formDataClient);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    let isValid = true;
    const errors: { [key: string]: string } = {};

    if (formData.firstName.trim() === "") {
      errors.firstName = "First name is required";
      isValid = false;
    }

    if (formData.lastName.trim() === "") {
      errors.lastName = "Last name is required";
      isValid = false;
    }

    if (formData.Country === "") {
      errors.Country = "Please select your country";
      isValid = false;
    }

    if (formData.language === "") {
      errors.language = "Please select your language";
      isValid = false;
    }

    if (formData.bio.trim().length < 5) {
      errors.bio = "Bio must be at least 5 characters";
      isValid = false;
    }

    if (skills.length === 0) {
      errors.skillsList = "At least one skill is required";
      isValid = false;
    }

    if (!isValid) {
      Object.values(errors).forEach((error) => toast.error(error));
      console.log(errors);
      return;
    }

    console.log("updated data ", formData);

    const response = await profileCompletion(formData);
    if (response.status) {
      setFreelancerDetails(response.freelancer);
      const userDataString = JSON.stringify(response.freelancer);
      localStorage.setItem("user_data", userDataString);
      navigate("/", { state: { signpopup: true } });
      console.log("Form submitted successfully");
    }else{
      toast.error("some error occurred")
    }
  };

  //for client
  // ------------
  const handleSubmitClient = async (e: SyntheticEvent) => {
    e.preventDefault();

    let isValid = true;
    const errors: { [key: string]: string } = {};

    if (formDataClient.firstName.trim() === "") {
      errors.firstName = "First name is required";
      isValid = false;
    }

    if (formDataClient.lastName.trim() === "") {
      errors.lastName = "Last name is required";
      isValid = false;
    }

    if (formDataClient.Country === "") {
      errors.Country = "Please select your country";
      isValid = false;
    }

    if (formDataClient.language === "") {
      errors.language = "Please select your language";
      isValid = false;
    }

    if (formDataClient.bio.trim().length < 5) {
      errors.bio = "Bio must be at least 5 characters";
      isValid = false;
    }

    if (!isValid) {
      Object.values(errors).forEach((error) => toast.error(error));
      console.log(errors);
      return;
    }

    console.log("updated data ", formDataClient);

    const response = await profileCompletionClient(formDataClient);
    setFreelancerDetails(response.freelancer);
    navigate("/", { state: { signpopup: true } });
    console.log("Form submitted successfully");
  };

  return (
    <>
      {" "}
      {userType == "freelancer" ? (
        <>
          {/* component */}
          <div className="flex h-screen ">
            <Toaster richColors position="top-left" />
            {/* Left Pane */}
            {/* <img src="/images/FlexifyBlack.png" className="absolute w-28 m-8  lg:block hidden" alt="" /> */}
            <div className="w-full bg-white lg:w-1/2 flex items-center justify-end sm:justify-center">
              <div className="max-w-md  w-full  mx-auto">
                {/* Your form elements go here */}
                <div className="flex flex-col  items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                  <div className="w-screen bg-white  md:mt-0 sm:max-w-lg  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-1 md:space-y-6 sm:p-8">
                      <img
                        src="/images/FlexifyBlack.png"
                        className="w-52 mx-auto sm:mb-12 lg:hidden"
                        alt="Click here.."
                      />
                      <h1 className="text-xl lg:text-4xl font-poppins m-0 p-0 font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign up to find work <br /> you love
                      </h1>
                      <form
                        className="space-y-2 "
                        onSubmit={(e) => handleSubmit(e)}
                      >
                        <div className="w-full flex justify-between">
                          <div className=" w-80 m-1">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              First Name
                            </label>
                            <input
                              type="text"
                              value={formData.firstName}
                              name="firstName"
                              onChange={handleChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="first name"
                              required
                            />
                          </div>
                          <div className="w-80 m-1">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Last Name
                            </label>
                            <input
                              value={formData.lastName}
                              name="lastName"
                              onChange={handleChange}
                              type="text"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="last name"
                              required
                            />
                          </div>
                        </div>

                        <div className="w-full flex justify-between">
                          <div className="w-80 m-1">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Country
                            </label>
                            <select
                              id="countries"
                              value={formData.Country}
                              name="Country"
                              onChange={handleChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option value="" disabled>
                                Select your region
                              </option>
                              <option>India</option>
                              <option>United States</option>
                              <option>Canada</option>
                              <option>Germany</option>
                            </select>
                          </div>

                          <div className="w-80 m-1">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Primary language
                            </label>
                            <select
                              id="languages"
                              value={formData.language}
                              name="language"
                              onChange={handleChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option value="" disabled>
                                Select your language
                              </option>
                              <option>English</option>
                              <option>Malayalam</option>
                              <option>Spanish</option>
                              <option>Arabic</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Add your Skills
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              onChange={(e) => setInput(e.target.value)}
                              value={input}
                              id="default-search"
                              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Javascript, illustration, Logo Design..."
                            />
                            <button
                              onClick={addSkills}
                              type="button"
                              className="text-white absolute end-2.5 bottom-2.5 bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              <i className="fa-light fa-layer-plus"></i>
                            </button>
                          </div>
                        </div>

                        <div className="max-w-full">
                          {skills.map((item: any) => {
                            return (
                              <span
                                key={item.id}
                                id="badge-dismiss-dark"
                                className="inline-flex mb-2 items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
                              >
                                {item.skill}
                                <button
                                  onClick={() => removeSkill(item.id)}
                                  type="button"
                                  className="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300"
                                  data-dismiss-target="#badge-dismiss-dark"
                                  aria-label="Remove"
                                >
                                  <svg
                                    className="w-2 h-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                  </svg>
                                  <span className="sr-only">Remove badge</span>
                                </button>
                              </span>
                            );
                          })}
                        </div>

                        <div>
                          <label className="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white">
                            Bio about yourself for work
                          </label>
                          <textarea
                            value={formData.bio}
                            name="bio"
                            onChange={handleChange}
                            id="message"
                            rows={2}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write here..."
                            defaultValue={""}
                          />
                        </div>

                        <hr />
                        <button
                          onClick={(e) => handleSubmit(e)}
                          className="w-full text-white bg-zinc-950 hover:bg-zinc-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-dark dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          Create your profile
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Pane */}
            <div className="hidden signup-banner lg:flex bg-[url('/images/signup-banner3.jpg')]   items-center justify-center flex-1 bg-white text-black">
              <div className=" text-center">
                {/* <img
              className="w-full h-auto max-w-1xl rounded-lg"
              src="/images/signup-banner.jpg"
              alt=""
            /> */}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* component */}
          <div className="flex h-screen ">
            <Toaster richColors position="top-left" />
            {/* Left Pane */}
            {/* <img src="/images/FlexifyBlack.png" className="absolute w-28 m-8  lg:block hidden" alt="" /> */}
            <div className="w-full bg-white lg:w-1/2 flex items-center justify-end sm:justify-center">
              <div className="max-w-md  w-full  mx-auto">
                {/* Your form elements go here */}
                <div className="flex flex-col  items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                  <div className="w-screen bg-white  md:mt-0 sm:max-w-lg  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-1 md:space-y-6 sm:p-8">
                      <img
                        src="/images/FlexifyBlack.png"
                        className="w-52 mx-auto sm:mb-12 lg:hidden"
                        alt=""
                      />
                      <h1 className="text-xl lg:text-4xl font-poppins m-0 p-0 font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign up <br /> to hire talent
                      </h1>
                      <form
                        className="space-y-2 "
                        onSubmit={(e) => handleSubmitClient(e)}
                      >
                        <div className="w-full flex justify-between">
                          <div className=" w-80 m-1">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              First Name
                            </label>
                            <input
                              type="text"
                              value={formDataClient.firstName}
                              name="firstName"
                              onChange={handleChangeClient}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="first name"
                              required
                            />
                          </div>
                          <div className="w-80 m-1">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Last Name
                            </label>
                            <input
                              value={formDataClient.lastName}
                              name="lastName"
                              onChange={handleChangeClient}
                              type="text"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="last name"
                              required
                            />
                          </div>
                        </div>

                        <div className="w-full flex justify-between">
                          <div className="w-80 m-1">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Country
                            </label>
                            <select
                              id="countries"
                              value={formDataClient.Country}
                              name="Country"
                              onChange={handleChangeClient}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option value="" disabled>
                                Select your region
                              </option>
                              <option>India</option>
                              <option>United States</option>
                              <option>Canada</option>
                              <option>Germany</option>
                            </select>
                          </div>

                          <div className="w-80 m-1">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Primary language
                            </label>
                            <select
                              id="languages"
                              value={formDataClient.language}
                              name="language"
                              onChange={handleChangeClient}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option value="" disabled>
                                Select your language
                              </option>
                              <option>English</option>
                              <option>Malayalam</option>
                              <option>Spanish</option>
                              <option>Arabic</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white">
                            Bio about yourself for work
                          </label>
                          <textarea
                            value={formDataClient.bio}
                            name="bio"
                            onChange={handleChangeClient}
                            id="message"
                            rows={5}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write here..."
                            defaultValue={""}
                          />
                        </div>

                        <hr />
                        <button
                          type="submit"
                          onClick={(e) => handleSubmitClient(e)}
                          className="w-full text-white bg-zinc-950 hover:bg-zinc-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-dark dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          Create your profile
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Pane */}
            <div className="hidden signup-banner lg:flex bg-[url('/images/signup-bannerClien.jpg')]   items-center justify-center flex-1 bg-white text-black">
              <div className=" text-center"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
