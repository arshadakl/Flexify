import HeroSection from "../../components/HomeComponents/HeroSection"
import Popular from "../../components/HomeComponents/Popular"
import NavBar from "../../components/Navbar/NavBar"


function HomePage() {
  return (
    <>
    <NavBar fixed={"top"} bg={"none"}/>
    <HeroSection/>
    <Popular/>
    </>
  )
}

export default HomePage