import { Route, Routes } from "react-router-dom";
// import FreelancerProfile from '../Pages/Profile/FreelancerProfile'
import PaymentSuccces from "../common/components/ExtraComponents/paymentSuccces";
import OrdersPage from "../Pages/client/ordersPage";
import OrderRequirements from "../Pages/client/OrderRequirements";
import DashboardClient from "../Pages/client/DashboardClient";
import ClientProtect from "../clients/components/ClientProtect";
import Submissions from "../Pages/client/Submissions";
import TransactionsClient from "../Pages/client/TransactionsClient";
import ChatPage from "../Pages/client/ChatPage";

function ClientRouter() {
  return (
    <Routes>
      <Route element={<ClientProtect />}>
        <Route path="/success" element={<PaymentSuccces />} />
        <Route path="/fail" element={<PaymentSuccces />} />
        <Route path="/dashboard" element={<DashboardClient />} />

        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/transactions" element={<TransactionsClient />} />
        <Route path="/orders/requirements" element={<OrderRequirements />} />
        <Route path="/orders/submission" element={<Submissions />} />
        <Route path="/orders/chat/:id" element={<ChatPage />} />

      </Route>
    </Routes>
  );
}

export default ClientRouter;
