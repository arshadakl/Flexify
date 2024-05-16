import Footer from "../../common/components/HomeComponents/Footer"
import NavBar from "../../common/components/Navbar/NavBar"
// import AxiosInterceptor from "../../common/utils/APIs/FreelancerApi"
import WorkList from "../../freelancers/components/WorkList"

function Works() {
  return (
    <>
    {/* <AxiosInterceptor/> */}
      <NavBar bg="white" fixed="none" />
      <div className="flex flex-col justify-center h-44 w-full bg-[url('https://www.behance.net/ui/img/hire/hire-banner.webp')] bg-auto bg-no-repeat bg-center">
        <>
    <h1 className="text-white text-center  text-5xl font-bold font-Outfit">Hire Freelancer</h1>
    <p className="text-center text-white text-xl">Find the perfect freelancer for your next project</p>
        </>
      </div>
      <WorkList/>
      <Footer/>
    </>
  )
}

export default Works