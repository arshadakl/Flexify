import { Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage/HomePage';
import FreelancerProfile from '../Pages/Profile/FreelancerProfile';
import Login from '../common/components/Login/Login';
import ProfileCompletion from '../common/components/Signup/ProfileCompletion';
import Signup from '../common/components/Signup/Signup';


function FreelancerRoute() {
  return (
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="login" element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='profilecompletion' element={<ProfileCompletion />} />
      <Route path="profile" element={<FreelancerProfile />} />
    </Routes>
  );
}

export default FreelancerRoute;
