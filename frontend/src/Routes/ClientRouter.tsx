
import { Route, Routes } from 'react-router-dom'
// import FreelancerProfile from '../Pages/Profile/FreelancerProfile'
import PaymentSuccces from '../common/components/ExtraComponents/paymentSuccces'
import OrdersPage from '../Pages/client/ordersPage'

function ClientRouter() {
  return (
    <Routes>
      {/* <Route path="/" element={<FreelancerProfile />} /> */}
      <Route path="/success" element={<PaymentSuccces />} />
      <Route path="/fail" element={<PaymentSuccces />} />
      <Route path="/orders" element={<OrdersPage />} />
    </Routes>
  )
}

export default ClientRouter