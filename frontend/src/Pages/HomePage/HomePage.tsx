
import { useEffect, useState } from "react";
import HeroSection from "../../common/components/HomeComponents/HeroSection"
import Popular from "../../common/components/HomeComponents/Popular"
import NavBar from "../../common/components/Navbar/NavBar"
import InspiringPost from "../../common/components/HomeComponents/InspiringPost";
import Footer from "../../common/components/HomeComponents/Footer";

function HomePage() {
  const [scrolled, setScrolled] = useState<boolean>(false); // Changed Boolean to boolean
  const [scrollPercentage, setScrollPercentage] = useState(0)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setScrollPercentage(Math.round(scrollPercentage))
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
      <Popular scroll={scrollPercentage}/> {/* Passing scrollPercentage as a prop */}
      <InspiringPost/>
      <Footer/>
    </>
  );
}

export default HomePage;
