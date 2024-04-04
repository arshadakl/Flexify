// FreelancerRoute.jsx
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import FreelancerProfile from "../Pages/Profile/FreelancerProfile";
import Login from "../common/components/Login/Login";
import ProfileCompletion from "../common/components/Signup/ProfileCompletion";
import Signup from "../common/components/Signup/Signup";
import FreelancerProtect from "../freelancers/components/FreelancerProtect";
import FreelancerLogoutProtect from "../freelancers/components/FreelancerLogoutProtect";
import ForgotPasswordPage from "../Pages/ForgotPassword/ForgotPasswordPage";

function FreelancerRoute() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<FreelancerLogoutProtect />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="profilecompletion" element={<ProfileCompletion />} />
        <Route path="forgotpassword" element={<ForgotPasswordPage />} />
      </Route>
      <Route element={<FreelancerProtect />}>
        <Route path="profile" element={<FreelancerProfile />} />
      </Route>
    </Routes>
  );
}

export default FreelancerRoute;