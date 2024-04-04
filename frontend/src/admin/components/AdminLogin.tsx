import { SyntheticEvent, useState } from "react";
import { adminLoginValid } from "../../validations/adminValidations";
import { Admin } from "../../interfaces/Admin";
import { toast } from "sonner";
import { doLogin } from "../../common/utils/APIs/AdminApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess} from '../../Redux/Slices/adminSlice'
function AdminLoginComp() {
    const [adminId,setAdminid] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const submitHandler =async (e:SyntheticEvent)=>{
        e.preventDefault()
        
        const adminData: Admin = {adminId,password };
        const validationRes = await adminLoginValid(adminData)
        
        if(validationRes==="success"){
            const response = await doLogin(adminData)
            console.log(response);
            
            if(response.status){
                dispatch(loginSuccess(response.admin.token))
                toast.success("Admin login successful")
                navigate('/admin')
            }else{
                toast.error(response.message)
            }
            
        }else{
            toast.warning(validationRes)
        }
    }

    
  return (
    <>
      <div className="min-h-screen flex items-center bg-gray-50 justify-center w-full dark:bg-gray-950">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 mb-5 w-96 ">
          <img src="/images/FlexifyBlack.png" className="w-32 mx-auto" alt="" />
          <h1 className="text-lg font-normal  text-center mb-4 dark:text-gray-200">
            administration
          </h1>
          <form className="mb-5" onSubmit={(e)=>submitHandler(e)}>
            <div className="mb-4">
              <label
                htmlFor="AdminID"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                AdminID
              </label>
              <input
                type="text"
                value={adminId}
                onChange={(e)=>setAdminid(e.target.value)}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Admin ID"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={(e)=>setPassword(e.target.value)}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between mb-4"></div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-neutral-800 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLoginComp;
