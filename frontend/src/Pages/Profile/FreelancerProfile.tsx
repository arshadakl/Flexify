import NavBar from "../../common/components/Navbar/NavBar";
import FreelancerProfilePage from "../../common/components/Profiles/FreelancerProfile";

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
