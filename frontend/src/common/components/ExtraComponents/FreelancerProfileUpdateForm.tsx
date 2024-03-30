// import { profileCompletionForm } from "../ProfileCompletionParts/CompletionForm";

import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/config/context";
import { toast } from "sonner";
import { profileCompletionForm } from "../ProfileCompletionParts/CompletionForm";
import { profileUpdate } from "../../utils/APIs/FreelancerApi";

function FreelancerProfileUpdateForm(users:any) {
  const { setIsEdit, setFreelancerDetails, freelancerDetails } = useContext(AuthContext);
  const user = users || freelancerDetails;
  const [formData, setFormData] = useState<profileCompletionForm>({
    firstName: '',
    lastName: '',
    Country: '',
    language: '',
    skillsList: [],
    bio: '',
    user: '',
  });

  useEffect(() => {
    console.log(user.data);

    if (user && user.data) {
      setFormData(prevFormData => ({
        ...prevFormData,
        firstName: user.data.firstName || prevFormData.firstName,
        lastName: user.data.lastName || prevFormData.lastName,
        Country: user.data.Country || prevFormData.Country,
        language: user.data.language || prevFormData.language,
        skillsList: user.data.skillsList || prevFormData.skillsList,
        bio: user.data.bio || prevFormData.bio,
        user: user.data.user || prevFormData.user,
      }));

      // If you need to update the skills state separately
      setSkills(user.data.skillsList);
    }
  }, [user]);

  useEffect(() => {
    console.log(formData, "updated formData");
  }, [formData]);

  type Skill = string;
  const [input, setInput] = useState<string>("");

  // const {setFreelancerDetails} = useContext(AuthContext)

  const [skills, setSkills] = useState<Skill[]>([]);

  const addSkills = () => {
    if (input === "") return;

    if (skills.includes(input)) {
      toast.error("Skill already exists!");
      return;
    }

    const updatedSkills = [...skills, input];
    setSkills(updatedSkills);
    setFormData({ ...formData, skillsList: updatedSkills }); // Update skillsList with updatedSkills
    setInput("");
  };

  const removeSkill = (skill: string) => {
    const updatedSkills = skills.filter((item) => item !== skill);
    setSkills(updatedSkills);
    setFormData({ ...formData, skillsList: updatedSkills }); // Update skillsList with updatedSkills
  };

  const handileUpdate = async (e: SyntheticEvent) => {
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
    const updatedData = await profileUpdate(formData);
    console.log(updatedData,"user side");
    user.set(updatedData.response)
    setFreelancerDetails(updatedData.response);
    toast.success("Profile updated")
    setIsEdit(false)
  };

  const handleChange: any = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log(formData);
  };

  return (
    <form className="space-y-2 " onSubmit={(e) => handileUpdate(e)}>
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
        {formData.skillsList.map((item: any) => {
          console.log(item);

          return (
            <span
              key={item}
              id="badge-dismiss-dark"
              className="inline-flex mb-2 items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
            >
              {item}
              <button
                onClick={() => removeSkill(item)}
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
        onClick={(e) => handileUpdate(e)}
        className="w-full text-white bg-zinc-950 hover:bg-zinc-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-dark dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Update your profile
      </button>
    </form>
  );
}

export default FreelancerProfileUpdateForm;
