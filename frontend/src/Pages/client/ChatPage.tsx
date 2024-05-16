import ChatingComponent from "../../clients/components/ChatingComponent"
import Footer from "../../common/components/HomeComponents/Footer"
import NavBar from "../../common/components/Navbar/NavBar"

function ChatPage() {
  return (
    <>
    <NavBar fixed={"top"} bg="white"/>
    <ChatingComponent/>
    <Footer/>
    </>
  )
}

export default ChatPage