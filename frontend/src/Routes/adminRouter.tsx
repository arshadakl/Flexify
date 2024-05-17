import { Navigate, Route, Routes } from "react-router-dom";
import AdminLogin from "../Pages/admin/adminLogin";
import AdminProtect from "../admin/AdminProtect";
import { useSelector } from "react-redux";
import UserManagementPage from "../Pages/admin/UserManagementPage";
import DashboardPage from "../Pages/admin/Dashboard";
import LayoutParant from "../admin/components/LayoutParant";
import CategoryManagement from '../Pages/admin/CategoryManagement'
import PostManagement from "../Pages/admin/PostManagement";
import Orders from "../Pages/admin/Orders";
import Payments from "../Pages/admin/Payments";
import Submissions from "../Pages/admin/Submissions";
import FlaggedContent from "../Pages/admin/FlaggedContent";
import NotFound from "../Pages/NotFound";
function AdminRouter() {
  const { admin } = useSelector((state: any) => state.admin);

  return (
    <Routes>
      <Route path="login" element={admin ? <Navigate to="/admin" /> : <AdminLogin />} />
      
     
      <Route element={<AdminProtect />}>

        <Route element={<LayoutParant />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/users" element={<UserManagementPage />} />
          <Route path="/category" element={<CategoryManagement />} />
          <Route path="/post" element={<PostManagement />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/submissions" element={<Submissions />} />
          <Route path="/flagged-content" element={<FlaggedContent />} />
        </Route>

      </Route>
      <Route path="/*" element={<NotFound />} />

    </Routes>
  );
}

export default AdminRouter;
