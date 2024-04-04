import { SyntheticEvent, useState } from "react";
import { passwordReset } from "../../utils/APIs/FreelancerApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PasswordValidation from "../../../validations/PasswordValidation";

function SetPassword({ token }: { token: string }) {
  const [password, SetPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetPassword(e.target.value);
  };

  const handilSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (!password.trim()) {
      toast.error("Please enter a password.");
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least 8 characters, one number, one uppercase letter, and one special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // Proceed with further actions if password is valid
    const response = await passwordReset({ password, token });
    if (response.status) {
      toast.success(response.message);
      navigate("/login");
    } else {
      toast.error(response.error);
    }
  };
  return (
    <>
      <main
        id="content"
        role="main"
        className="w-full h-screen flex items-stretch  mx-auto  bg-gray-100 "
      >
        <div className="bg-white md:w-3/6 lg:w-1/4 w-5/6 self-center my-auto mx-auto rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 py-10 px-5">
          <h2 className="mb-1 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create New Password
          </h2>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={(e) => handilSubmit(e)}
          >
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="confirm-password"
                name="confirm-password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset passwod
            </button>
            <hr />
            <div className="  ">
              <PasswordValidation
                password={password}
                confirmPassword={confirmPassword}
              />
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default SetPassword;
