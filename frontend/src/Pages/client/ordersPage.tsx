import Orders from "../../clients/components/orders"
import NavBar from "../../common/components/Navbar/NavBar"

function OrdersPage() {
  return (
    <>
      <NavBar bg="white" fixed="none" />
      <Orders/>
    </>
  )
}

export default OrdersPage