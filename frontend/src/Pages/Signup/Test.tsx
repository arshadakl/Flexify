import React, { useContext, useEffect, useRef, useState } from 'react';
import { OTPApi } from '../../API/FreelancerApi';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../config/context';

interface EmailVerificationProps {
  email: string;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ email }) => {
  const { setUserId } = useContext(AuthContext);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState(['', '', '', '']);
  const [error, setError] = useState<string>('');
  const [timer, setTimer] = useState<number>(10);

  const updateInputValues = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0)); // Ensure timer doesn't go below 0
    }, 1000);
  
    return () => clearInterval(timerId);
  }, []);
  

  useEffect(() => {
    if (timer === 0) {
      // Timer reached 0, handle resend or other action here
      clearInterval(timer);
    }
  }, [timer]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const code = Number(inputValues.join(''));
    const formData = { email, code };
    const OTP_response: any = await OTPApi(formData);

    if (OTP_response.status) {
      setUserId(OTP_response.userId);
      navigate('/profilecompletion');
    } else {
      setError(OTP_response.error);
    }

    setInputValues(['', '', '', '']);
  };

  return (
    <div className="min-h-screen flex items-center content-center">
      <div className="max-w-md lg:w-full mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
          <p className="text-[15px]  text-slate-500">
            Check your Email, We have sent you the Code <br /> <b>{email}</b>
          </p>
        </header>
        <form ref={formRef} id="otp-form" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-3">
            {inputValues.map((value, index) => (
              <input
                key={index}
                type="text"
                className="border border-gray-300 w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100  hover:border-gray-300 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                pattern="\d*"
                maxLength={1}
                value={value}
                onChange={(e) => updateInputValues(index, e.target.value)}
              />
            ))}
          </div>
          <div className="max-w-[260px] mx-auto mt-4">
            <button
              type="submit"
              className="w-full hover:bg-gray-600 inline-flex justify-center whitespace-nowrap rounded-lg bg-black px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:logo-green focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
            >
              Verify Account
            </button>
          </div>
        </form>
        <div className="text-sm text-slate-500 mt-4">
          {timer === 0 ? (
            <p>
              Didn't receive code?{" "}
              <a className="font-medium text-indigo-500 hover:text-indigo-600" href="#0">
                Resend
              </a>
            </p>
          ) : (
            <p>Resend code in {timer} seconds</p>
          )}
          <p className="text-rose-600 font-medium">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
