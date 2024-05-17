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
import CreatePost from "../Pages/freelancer/CreatePost";
import Works from "../Pages/works/Works";
import SinglePage from "../Pages/works/SinglePage";
// import RoleLoading from "../common/animations/RoleLoading";
import DashboardFreelancer from "../Pages/freelancer/Dashboard";
import MyPosts from "../Pages/freelancer/MyPosts";
import EditPost from "../Pages/freelancer/EditPost";
import OrderManagment from "../Pages/freelancer/OrderManagment";
import RequirementsShow from "../Pages/freelancer/RequirementsShow";
import DualProtect from "../freelancers/components/DualProtect";
import PublicProfile from "../Pages/freelancer/PublicProfile";
import VideoCallPage from "../Pages/client/VideoCall";
import VideoLoading from "../common/components/ExtraComponents/VideoLoading";
import NotFound from "../Pages/NotFound";

function FreelancerRoute() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/test" element={<VideoLoading type="start" />} />
      <Route path="works" element={<Works />} />
      <Route path="works/single/:id" element={<SinglePage />} />
      <Route path="freelancer/:id" element={<PublicProfile />} />

      <Route element={<FreelancerLogoutProtect />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="profilecompletion" element={<ProfileCompletion />} />
        <Route path="forgotpassword" element={<ForgotPasswordPage />} />
      </Route>

      <Route element={<DualProtect />}>
        <Route path="profile" element={<FreelancerProfile />} />
        <Route path="/videocall" element={<VideoCallPage />} />

      </Route>
      <Route element={<FreelancerProtect />}>
        <Route path="post" element={<CreatePost />} />
        <Route path="edit-post" element={<EditPost />} />
        <Route path="my-post" element={<MyPosts />} />
        <Route path="dashboard" element={<DashboardFreelancer />} />
        <Route path="dashboard/order-management" element={<OrderManagment />} />
        <Route path="dashboard/requirements" element={<RequirementsShow />} />
      </Route>
      <Route path="/*" element={<NotFound />} />

    </Routes>
  );
}

export default FreelancerRoute;
