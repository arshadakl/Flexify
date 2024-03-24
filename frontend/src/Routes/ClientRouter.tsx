
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import FreelancerProfile from '../Pages/Profile/FreelancerProfile'

function ClientRouter() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<FreelancerProfile />} />
    </Routes>
  </BrowserRouter>
  )
}

export default ClientRouter