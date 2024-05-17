import Footer from "../../common/components/HomeComponents/Footer"
import NavBar from "../../common/components/Navbar/NavBar"
import OrderSubmition from "../../freelancers/components/OrderSubmition"

function OrderManagment() {
  return (
    <>
    <NavBar bg="white" fixed="top" />
    <OrderSubmition/>
    <Footer/>
    </>
  )
}

export default OrderManagment
