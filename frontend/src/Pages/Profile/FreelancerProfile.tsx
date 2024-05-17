import Footer from "../../common/components/HomeComponents/Footer";
import NavBar from "../../common/components/Navbar/NavBar";
import FreelancerProfilePage from "../../common/components/Profiles/FreelancerProfile";
import AxiosInterceptor from "../../common/utils/APIs/FreelancerApi";

function FreelancerProfile() {
  return (
    <>
    <AxiosInterceptor/>
      <NavBar fixed="none" bg={"dark"} />
      <hr />
      <FreelancerProfilePage/>
      <Footer/>
    </>
  );
}

export default FreelancerProfile;
