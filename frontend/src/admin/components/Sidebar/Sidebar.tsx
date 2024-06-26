import { useDispatch } from "react-redux";
import { persistor } from "../../../Redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import { logout} from "../../../Redux/Slices/adminSlice";
import { useEffect, useState } from "react";


function Sidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = ()=>{
    dispatch(logout());
    persistor.purge(); 
    navigate('/admin/login');
  }



  const [currentDirectory, setCurrentDirectory] = useState('');

  const location = useLocation();
  useEffect(() => {
    const pathname = location.pathname;
    const parts = pathname.split('/');
    setCurrentDirectory(parts[parts.length - 1]);
  }, [location.pathname]);

  return (
    <>
    <div className="flex flex-col items-center w-52 mt-14 pt-5 h-95vh overflow-hidden text-gray-900 bg-slate-100 ">
 
  <div className="w-full px-2 ">
    <div className="flex flex-col items-center w-full mt-3  border-gray-700">
      <p
        className={`flex cursor-pointer items-center w-full h-12 px-3 mt-2 rounded hover:bg-logo-green hover:text-white ${currentDirectory=='admin' && "bg-logo-green text-white" }`}
        onClick={()=>navigate('/admin')}
      >
        <svg
          className="w-6 h-6 stroke-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span  className="ml-2 text-sm font-medium">Dasboard</span>
      </p>
      <p
        className={`flex cursor-pointer items-center w-full h-12 px-3 mt-2 rounded hover:bg-logo-green hover:text-white ${currentDirectory=='users' && "bg-logo-green text-white" }`}
        onClick={()=>navigate('/admin/users')}
      >
        <i className="fa-regular fa-user-group"/>
        <span  className="ml-2 text-sm font-medium">User Manage</span>
      </p>
      <p
      onClick={()=>navigate('/admin/category')}
      className={`flex cursor-pointer items-center w-full h-12 px-3 mt-2 rounded hover:bg-logo-green hover:text-white ${currentDirectory=='category' && "bg-logo-green text-white" }`}
        
      >
        <svg
          className="w-6 h-6 stroke-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="ml-2 text-sm font-medium">Category</span>
      </p>
      <p onClick={()=>navigate('/admin/post')}
        className={`flex cursor-pointer items-center w-full h-12 px-3 mt-2 rounded hover:bg-logo-green hover:text-white ${currentDirectory=='post' && "bg-logo-green text-white" }`}
        
      >
        <svg
          className="w-6 h-6 stroke-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
          />
        </svg>
        <span className="ml-2 text-sm font-medium">Posts</span>
      </p>
      <p onClick={()=>navigate('/admin/orders')}
        className={`flex cursor-pointer items-center w-full h-12 px-3 mt-2 rounded hover:bg-logo-green hover:text-white ${currentDirectory=='orders' && "bg-logo-green text-white" }`}
        
      >
       <i className="fa-sharp fa-regular fa-house-laptop" />

        <span className="ml-2 text-sm font-medium">Orders</span>
      </p>
      <p onClick={()=>navigate('/admin/payments')}
        className={`flex cursor-pointer items-center w-full h-12 px-3 mt-2 rounded hover:bg-logo-green hover:text-white ${currentDirectory=='payments' && "bg-logo-green text-white" }`}
        
      >
       <i className="fa-regular fa-credit-card" />


        <span className="ml-2 text-sm font-medium">Transactions</span>
      </p>
      <p onClick={()=>navigate('/admin/submissions')}
        className={`flex cursor-pointer items-center w-full h-12 px-3 mt-2 rounded hover:bg-logo-green hover:text-white ${currentDirectory=='submissions' && "bg-logo-green text-white" }`}
        
      >
       <i className="fa-duotone fa-cloud-word" />

        <span className="ml-2 text-sm font-medium">Submissions</span>
      </p>
      <p onClick={()=>navigate('/admin/flagged-content')}
        className={`flex cursor-pointer items-center w-full h-12 px-3 mt-2 rounded hover:bg-logo-green hover:text-white ${currentDirectory=='flagged-content' && "bg-logo-green text-white" }`}
        
      >
       <i className="fa-duotone fa-flag" />


        <span className="ml-2 text-sm font-medium">Flagged Content</span>
      </p>
    </div>
    {/* <div className="flex flex-col items-center w-full mt-2 border-t border-gray-700">
      
      <a
        className={`flex cursor-pointer items-center w-full h-12 px-3 mt-2 rounded hover:bg-logo-green hover:text-white ${currentDirectory=='users' && "bg-logo-green text-white" }`}
        
      >
        <svg
          className="w-6 h-6 stroke-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
          />
        </svg>
        <span className="ml-2 text-sm font-medium">Messages</span>
        <span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full" />
      </a>
    </div> */}
  </div>
  <a
    className="flex items-center justify-center w-full h-16 mt-auto bg-slate-200 hover:bg-slate-300 cursor-pointer hover:text-gray-900"
    onClick={handleLogout}
  >
    <svg
      className="w-6 h-6 stroke-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span  className="ml-2 text-sm font-medium">Logout</span>
  </a>
</div>

    </>
  )
}

export default Sidebar