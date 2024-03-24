import { Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage/HomePage';
import FreelancerProfile from '../Pages/Profile/FreelancerProfile';
// import FreelancerProfile from '../Pages/Profile/FreelancerProfile';

function FreelancerRoute() {
  return (
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="profile" element={<FreelancerProfile />} />
    </Routes>
  );
}

export default FreelancerRoute;
