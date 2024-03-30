import {  useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useLocation  } from "react-router-dom"
// import { AuthContext } from "../../utils/config/context"
import { toast } from 'sonner'
import { logout } from "../../../Redux/Slices/freelancerSlice";
import { persistor } from "../../../Redux/store";
// import { handleLogout } from "../../services/freelancer";


function NavBar({bg,fixed}:{bg:string,fixed:string}) {
  const freelancerDetails = useSelector((state: any) => state.freelancer);
  console.log(freelancerDetails,"redux data");
  const navigate = useNavigate()
  const location = useLocation();
  const {signpopup} = location.state?.signpopup || '';
  const dispatch = useDispatch()

  
  const handleLogout = () => {
    dispatch(logout());
    persistor.purge(); 
    navigate('/')
  };
 
  useEffect(() => {
    console.log(signpopup);
    
    if(signpopup == true){
      toast.success('Account has been successfully created')
    }
  }, [signpopup])
  


  return (
    <>
    
    <nav className={`transition duration-300 ease-out  border-gray-200 ${bg=="none" ? "text-white bg-transparent" : "text-black bg-gray-50"} ${fixed == "top" ? "fixed top-0 left-0 right-0" : ""}`}>
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    
    <a onClick={()=>navigate('/')} >
    <img src={bg=="none" ? `/images/FlexifyWhite.png` : `/images/FlexifyBlack.png`} className="w-32" alt="" />

    </a>
    <button
  data-collapse-toggle="navbar-default"
  type="button"
  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
  aria-controls="navbar-default"
  aria-expanded="false"
>
  <span className="sr-only">Open main menu</span>
  <svg
    className="w-5 h-5"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 17 14"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 1h15M1 7h15M1 13h15"
    />
  </svg>
</button>

    <div className="hidden w-full  md:block md:w-auto bg:" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  md:bg-transparent bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a
            href="#"
            className="block py-2 px-3  bg-logo-green rounded md:bg-transparent  md:p-0 dark:text-white md:dark:text-blue-500"
            aria-current="page"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-logo-green md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Discover works
          </a>
        </li>
        <li>
          <a
            onClick={handleLogout}
            className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-logo-green md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Logout
          </a>
        </li>
       {!freelancerDetails.freelancer ?<li>
          <a onClick={()=>navigate('/login')} className="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-logo-green md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Sign In 
          </a>
        </li>
        : null}
        <li>
          {freelancerDetails.freelancer !== null ? 
          <>

          <a onClick={()=>navigate('/profile')} className="outline outline-2 outline-offset-8  block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-logo-green md:p-0 :text-white md::hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" >
            {freelancerDetails.freelancer.username}
          </a>


            
          
          </>
          :
          <a
  onClick={() => navigate('/signup')}
  className="outline-none py-2 px-3 rounded hover:bg-gray-100outline md:outline-2 md:outline-offset-8 md:hover:bg-transparent md:border-0 md:hover:text-logo-green md:p-0 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
>
  Join
</a>

          }
        </li>
      </ul>
    </div>



  </div>
  {/* <hr /> */}
</nav>

    </>
  )
}

export default NavBar