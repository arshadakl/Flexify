import { useContext, useEffect } from "react"
import { useNavigate,useLocation  } from "react-router-dom"
import { AuthContext } from "../../config/context"
import { Toaster, toast } from 'sonner'

function NavBar() {
  const navigate = useNavigate()
  const {freelancerDetails} = useContext(AuthContext)
  const location = useLocation();
  const {signpopup} = location.state?.signpopup || '';
  useEffect(() => {
    console.log(signpopup);
    
    if(signpopup == true){
      toast.success('Account has been successfully created')
    }
  }, [signpopup])
  
  

  return (
    <>
    <Toaster richColors position="bottom-right" />
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    
    <a onClick={()=>navigate('/')} >
    <img src="/images/FlexifyBlack.png" className="w-32" alt="" />

    </a>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a
            href="#"
            className="block py-2 px-3 text-white bg-logo-green rounded md:bg-transparent md:text-logo-green md:p-0 dark:text-white md:dark:text-blue-500"
            aria-current="page"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-logo-green md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Discover works
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-logo-green md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Become a Seller {signpopup}
          </a>
        </li>
        <li>
          {freelancerDetails !== null ? 
          <a onClick={()=>navigate('/signup')} className="outline outline-2 outline-offset-8  block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-logo-green md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" >
            {freelancerDetails?.username}
          </a>
          :
          <a onClick={()=>navigate('/signup')} className="outline outline-2 outline-offset-8  block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-logo-green md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" >
            Join 
          </a>
          }
        </li>
      </ul>
    </div>
  </div>
  <hr />
</nav>

    </>
  )
}

export default NavBar