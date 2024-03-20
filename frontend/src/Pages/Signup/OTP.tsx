import React, { useContext, useEffect, useRef, useState } from 'react';
import { OTPApi } from '../../API/FreelancerApi';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../config/context';


interface EmailVerificationProps {
    email: string;
  }
const EmailVerification: React.FC<EmailVerificationProps> = ({ email }) => {
const {setUserId} = useContext(AuthContext)
  


  // State to store the values of the inputs
  const [inputValues, setInputValues] = useState(['', '', '', '']);
  const formRef = useRef<HTMLFormElement>(null);
  const [error,setError] = useState<string>("")
  const navigate = useNavigate()

  // Function to update the state when input values change
  const updateInputValues = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  useEffect(() => {
    const form = formRef.current;
    if (form) {
      const inputs = Array.from(form.querySelectorAll('input[type="text"]')) as HTMLInputElement[];
      const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;

      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (
          !/^[0-9]{1}$/.test(e.key) &&
          e.key !== 'Backspace' &&
          e.key !== 'Delete' &&
          e.key !== 'Tab' &&
          !e.metaKey
        ) {
          e.preventDefault();
        }

        if (e.key === 'Delete' || e.key === 'Backspace') {
          const index = inputs.indexOf(e.currentTarget);
          if (index > 0) {
            updateInputValues(index - 1, '');
            inputs[index - 1].focus();
          }
        }
      };

      const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const index = inputs.indexOf(target);
        updateInputValues(index, target.value);
        if (target.value) {
          if (index < inputs.length - 1) {
            inputs[index + 1].focus();
          } else {
            submitButton?.focus();
          }
        }
      };

      const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select();
      };

      const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text');
        if (!new RegExp(`^[0-9]{${inputs.length}}$`).test(pasteData)) {
          return;
        }
        const digits = pasteData.split('');
        digits.forEach((digit, index) => {
          updateInputValues(index, digit);
        });
        submitButton?.focus();
      };

      inputs.forEach((input, index) => {
        input.value = inputValues[index]; // Set the value from the state
        input.addEventListener('keydown', handleKeyDown as any);
        input.addEventListener('input', handleInput as any);
        input.addEventListener('focus', handleFocus as any);
        input.addEventListener('paste', handlePaste as any);
      });
    }
  }, [inputValues]);


  // Function to handle form submission
  const handleSubmit  = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you can add the code to verify the OTP
    setError("")
    console.log(inputValues.join(''));
    const code:number = Number(inputValues.join(''))
    const formData = {  email,code }
    const OTP_response:any = await OTPApi(formData)
    console.log(OTP_response,": test");


    if(OTP_response.status){
      setUserId(OTP_response.userId)
      navigate('/profilecompletion')
    }
    setInputValues(['', '', '', ''])
    setError(OTP_response.error)
    
    // For example, send the OTP to the server for verification
    console.log('OTP submitted:', inputValues.join(''));
  };

  return (
    <div className="min-h-screen flex items-center content-center ">
      <div className="max-w-md lg:w-full mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
          <p className="text-[15px]  text-slate-500">
          Check your Email, We have sent you the Code  <br /> <b>{email}</b>
          </p>
        </header>
        <form ref={formRef} id="otp-form" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-3">
            {inputValues.map((value, index) => (
              <input
                key={index}
                type="text"
                className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
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
          Didn't receive code?{" "}
          <a className="font-medium text-indigo-500 hover:text-indigo-600" href="#0">
            Resend
          </a>
          <p className='text-rose-600 font-medium'>{error}</p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
