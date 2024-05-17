import Orders from "../../clients/components/orders"
import Footer from "../../common/components/HomeComponents/Footer"
import NavBar from "../../common/components/Navbar/NavBar"

function OrdersPage() {
  return (
    <>
      <NavBar bg="white" fixed="none" />
      <Orders/>
      <Footer/>
    </>
  )
}

export default OrdersPage