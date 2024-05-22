import { useEffect, useState } from "react";
import Footer from "../../common/components/HomeComponents/Footer";
import NavBar from "../../common/components/Navbar/NavBar";
import WorkList from "../../freelancers/components/WorkList";
import { motion } from "framer-motion";
import { fadeIn } from "../../common/animations/Frame_Motion/variants";
function Works() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      if (scrollPercentage >= 15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      {/* <AxiosInterceptor/> */}
      <NavBar fixed={"top"} bg={scrolled ? "dark" : "none"} />
      {/* <div className="flex flex-col justify-center h-44 w-full bg-[url('https://www.behance.net/ui/img/hire/hire-banner.webp')] bg-auto bg-no-repeat bg-center">
        <>
    <h1 className="text-white text-center  text-5xl font-bold font-Outfit">Hire Freelancer</h1>
    <p className="text-center text-white text-xl">Find the perfect freelancer for your next project</p>
        </>
      </div> */}
      <div
        className="relative flex flex-col bg-gray-900 justify-center md:h-72 h-96 w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hire-banner.webp')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10">
          <motion.h1
            variants={fadeIn("up", 1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className="text-white text-center text-5xl font-bold font-Outfit"
          >
            Hire Freelancer
          </motion.h1>
          <motion.p
            variants={fadeIn("down", 0.5)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className="text-center text-white text-xl w-8/12 mx-auto"
          >
            Find the perfect freelancer for your next project
          </motion.p>
        </div>
      </div>

      <WorkList />
      <Footer />
    </>
  );
}

export default Works;
