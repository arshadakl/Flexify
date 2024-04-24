// FreelancerProtect.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function DualProtect() {
  const freelancer = useSelector((state: any) => state.freelancer);


  return freelancer.freelancer  ? <Outlet /> : <Navigate to='/login' />;
}

export default DualProtect;