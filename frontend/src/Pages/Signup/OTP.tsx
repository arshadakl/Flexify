import React, { useContext, useEffect, useRef, useState } from 'react';
import { OTPApi, reSendOTP } from '../../API/FreelancerApi';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../config/context';
import { Toaster, toast } from 'sonner';

interface EmailVerificationProps {
  email: string;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ email }) => {


  const handleBeforeUnload = (event:any) => {
    event.preventDefault();
    event.returnValue = 'Please avoid refreshing this page.'; // Optional custom message
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  
  const { setUserId } = useContext(AuthContext);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState(['', '', '', '']);
  const [error, setError] = useState<string>('');
  const [timer, setTimer] = useState<number>(60);
  const [isActive,setIsActive] = useState(true)

  useEffect(() => {
    inputRefs.current[0]?.focus(); 
  }, []);

  const updateInputValues = (index: number, value: string) => {
    console.log(index);
    
    if (value === '' && index > 0) {
      const newInputValues = [...inputValues];
      newInputValues[index ] = '';
      setInputValues(newInputValues);
      inputRefs.current[index - 1]?.focus(); 
    } else if (/^\d*$/.test(value) && index < inputValues.length) {
      
      const newInputValues = [...inputValues];
      newInputValues[index] = value;
      setInputValues(newInputValues);
  
      
      if (value !== '' && index < inputValues.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === '' && index >= inputValues.length) {
      
      const newInputValues = [...inputValues];
      newInputValues[index - 1] = '';
      setInputValues(newInputValues);
      inputRefs.current[index - 1]?.focus();
    }
  };
  

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0)); 
    }, 1000);
  
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(timer);
      setIsActive(false)
    }
  }, [timer]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!isActive) return
    setError('');
    const code = Number(inputValues.join(''));
    const formData = { email, code };
    const OTP_response: any = await OTPApi(formData);

    if (OTP_response.status) {
      setUserId(OTP_response.userId);
      navigate('/profilecompletion');
    } else {
      setError(OTP_response.error);
      toast.error(OTP_response.error);
    }
    // inputRefs.current[0]?.focus();
    // setInputValues(['', '', '', '']);
  };

  const resend = async()=>{
    
    const response = await reSendOTP(email)
    if(response){
      setError('')
      toast.success("OTP has been Resent.")
      setTimer(60)
      setIsActive(true)
      inputRefs.current[0]?.focus();
      setInputValues(['', '', '', '']);

    }
  }

  return (
    <div className="min-h-screen flex items-center content-center">
      <Toaster richColors position="top-left" />
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
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => updateInputValues(index, e.target.value)}
                onKeyDown={(e) => {
                  // Handle backspace
                  if (e.key === 'Backspace') {
                    e.preventDefault();
                    updateInputValues(index, '');
                  
                  }
                }}
              />
            ))}
          </div>
          <div className="max-w-[260px] mx-auto mt-4">
            {isActive ? <button type="submit" 
             className="w-full hover:bg-gray-900 inline-flex justify-center whitespace-nowrap rounded-lg bg-black px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:logo-green focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150" >
              Verify Account
            </button>:
            <button 
            className="w-full cursor-not-allowed  hover:bg-gray-600 inline-flex justify-center whitespace-nowrap rounded-lg bg-gray-600 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:logo-green focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150" >
             Verify Account
           </button>
            }
          </div>
        </form>
        <div className="text-sm text-slate-500 mt-4">
          {timer === 0 ? (
            <p>
              Didn't receive code?{' '}
              <a onClick={resend} className="font-medium text-indigo-500 hover:text-indigo-600 cursor-pointer" >
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
