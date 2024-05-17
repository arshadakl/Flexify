import Footer from "../../common/components/HomeComponents/Footer"
import NavBar from "../../common/components/Navbar/NavBar"
import MyPostList from "../../freelancers/components/MyPostList"

function MyPosts() {
  return (
    <>
      <NavBar bg="white" fixed="top" />
      <MyPostList/>
    <Footer/>
    </>
  )
}

export default MyPosts
