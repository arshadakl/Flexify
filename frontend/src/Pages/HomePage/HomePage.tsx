import { useEffect, useState } from "react";
import HeroSection from "../../common/components/HomeComponents/HeroSection"
import Popular from "../../common/components/HomeComponents/Popular"
import NavBar from "../../common/components/Navbar/NavBar"


function HomePage() {
  const [scrolled, setScrolled] = useState<Boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      if (scrollPercentage >= 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
    <NavBar fixed={"top"} bg={scrolled ? "dark" : "none"}/>
    <HeroSection/>
    <Popular/>
    </>
  )
}

export default HomePage