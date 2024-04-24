// FreelancerProtect.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ClientProtect() {
  const client = useSelector((state: any) => state.freelancer);
  const role = useSelector((state: any) => state.freelancer.freelancer.role)=="client" ;

  return (client.freelancer && role) ? <Outlet /> : <Navigate to='/login' />;
}

export default ClientProtect;