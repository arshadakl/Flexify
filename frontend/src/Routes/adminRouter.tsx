
import { Route, Routes } from 'react-router-dom'
import AdminHome from '../admin/components/adminHome'
import AdminLogin from '../Pages/admin/adminLogin'

function AdminRouter() {
  return (
    <Routes>
      <Route path="/*" element={<AdminHome />} />
      <Route path="login" element={<AdminLogin />} />
    </Routes>
  )
}

export default AdminRouter