import ChatingComponent from "../../clients/components/ChatingComponent"
import NavBar from "../../common/components/Navbar/NavBar"

function ChatPage() {
  return (
    <>
    <NavBar fixed={"top"} bg="white"/>
    <ChatingComponent/>
    </>
  )
}

export default ChatPage