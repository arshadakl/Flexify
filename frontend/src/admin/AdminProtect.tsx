import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function AdminProtect() {
  const { admin } = useSelector((state: any) => state.admin);
  console.log(admin);

  return admin ? <Outlet /> : <Navigate to='/admin/login' />;
}

export default AdminProtect;