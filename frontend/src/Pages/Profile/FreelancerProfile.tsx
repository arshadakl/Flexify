import NavBar from "../../components/Navbar/NavBar";
import FreelancerProfilePage from "../../components/Profiles/FreelancerProfile";

function FreelancerProfile() {
  return (
    <>
      <NavBar fixed="none" bg={"dark"} />
      <hr />
      <FreelancerProfilePage/>
    </>
  );
}

export default FreelancerProfile;
