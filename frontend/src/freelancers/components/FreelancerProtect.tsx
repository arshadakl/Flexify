// FreelancerProtect.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function FreelancerProtect() {
  const freelancer = useSelector((state: any) => state.freelancer);
  const role = useSelector((state: any) => state.freelancer.freelancer.role)=="freelancer" ;


  return (freelancer.freelancer && role) ? <Outlet /> : <Navigate to='/login' />;
}

export default FreelancerProtect;