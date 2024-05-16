import { SyntheticEvent, useState } from "react";
import ForgotPassword from "../../common/components/ExtraComponents/ForgotPassword";
import NavBar from "../../common/components/Navbar/NavBar";
import {
  forgotPassword,
  otpApiForgotpassword,
} from "../../common/utils/APIs/FreelancerApi";
import { toast } from "sonner";
import { EmailVerification } from "../../common/components/Signup/OTP";
import SetPassword from "../../common/components/ExtraComponents/SetPassword";

function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [isOTP, setIsOTP] = useState<Boolean>(false);
  const [token, setToken] = useState<string>("");
  const [isReset, setIsReset] = useState<Boolean>(false);
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const response = await forgotPassword(email);
    if (response.status) {
      toast.success(response.message);
      setIsOTP(true);
    } else {
      toast.error(response.error);
    }
  };

  const handleOTPSubmit = async (email: string, code: number) => {
    const data = { email, code };
    const response = await otpApiForgotpassword(data);
    if (response.status) {
      setIsReset(true)
      setToken(response.token);
      toast.success(response.message);
    } else {
      toast.error(response.error);
    }
  };

  return (
    <>
      <NavBar fixed="top" bg={"dark"} />

      {/* {isReset ? <SetPassword token={token}/> :
       {isOTP ? <EmailVerification email={email} action={handilOTPSubmit} type={"forgot"} /> :  <ForgotPassword email={email} setEmail={setEmail} api={handilSubmit}  /> }
      } */}

      {isReset && <SetPassword token={token} />}
      {!isReset && isOTP && (
        <EmailVerification
          email={email}
          action={handleOTPSubmit}
          type="forgot"
        />
      )}
      {!isReset && !isOTP && (
        <ForgotPassword email={email} setEmail={setEmail} api={handleSubmit} />
      )}
    </>
  );
}

export default ForgotPasswordPage;
