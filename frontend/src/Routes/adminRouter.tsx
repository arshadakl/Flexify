
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminHome from '../components/admin-component/adminHome'

function adminRouter() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AdminHome />} />
    </Routes>
  </BrowserRouter>
  )
}

export default adminRouter