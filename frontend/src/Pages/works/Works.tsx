import NavBar from "../../common/components/Navbar/NavBar"
// import AxiosInterceptor from "../../common/utils/APIs/FreelancerApi"
import WorkList from "../../freelancers/components/WorkList"

function Works() {
  return (
    <>
    {/* <AxiosInterceptor/> */}
      <NavBar bg="white" fixed="none" />
      <WorkList/>
    </>
  )
}

export default Works