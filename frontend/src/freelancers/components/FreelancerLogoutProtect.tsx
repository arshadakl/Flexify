// FreelancerLogoutProtect.jsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function FreelancerLogoutProtect() {
  const freelancer = useSelector((state: any) => state.freelancer);

  return (
    freelancer.freelancer ? <Navigate to='/' /> : <Outlet /> 
   )
}

export default FreelancerLogoutProtect;