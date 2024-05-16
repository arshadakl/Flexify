import UploadRequirements from "../../clients/components/UploadRequirements";
import Footer from "../../common/components/HomeComponents/Footer";
import NavBar from "../../common/components/Navbar/NavBar";

function OrderRequirements() {
  return (
    <>
    <NavBar fixed={"top"} bg="white"/>
    <UploadRequirements/>
    <Footer/>
    </>
  )
}

export default OrderRequirements