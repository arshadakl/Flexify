import OrderSubmission from "../../clients/components/OrderSubmission"
import Footer from "../../common/components/HomeComponents/Footer"
import NavBar from "../../common/components/Navbar/NavBar"

function Submissions() {
  return (
    <>
      <NavBar bg="white" fixed="top" />
      <OrderSubmission/>  
      <Footer/>
    </>
  )
}

export default Submissions
