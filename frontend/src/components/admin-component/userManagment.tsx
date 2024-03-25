import { useEffect, useState } from "react"
import { blockUser, getAllusers } from "../../API/AdminApi"


function UserManagment() {
    const [alluser,setAllusers] = useState([])

    useEffect(() => {
        const fetchData = async () =>{
            const response = await getAllusers()
            console.log(response);
            
            if(response.status){
                setAllusers(response.users)
            }
        }
        fetchData()
    }, [])
    

    const manageBlcok =async (id:string)=>{
        console.log(id);
        const response = await blockUser(id)
        console.log(response);
        
        if(response.status){
            setAllusers(response.users)
        }
        
    }


  return (
    <>
     <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <h2 className="text-4xl m-5">users</h2>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      User Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Verification status
                    </th>
                    <th scope="col" className="px-6 py-3">
                     Block /UnBlock
                    </th>
                  </tr>
                </thead>
                <tbody>

                    {alluser.map((user:any)=>{
                        return(
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {user.username}
                            </th>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.username !== 0 ? <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">verified</span>
                            : <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">not Verified</span>}</td>
                            <td className="px-6 py-4">
                              <a
                                onClick={()=>manageBlcok(user._id)}
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                              >
                                {user.isBlocked}
                                {/* {user.isBLocked===0 ? <button type="button" onClick={()=>manageBlcok(user._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Block</button> 
                                : <button type="button" onClick={()=>manageBlcok(user._id)} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">unBlock</button>} */}

                                 {/* <button onClick={()=>manageBlcok(user._id)}>{user.isBLocked}</button>

                                {user.isBLocked} */}
                                
                              </a>
                            </td>
                          </tr>
                        )
                    })}
                  
                  
                </tbody>
              </table>
            </div>
    </>
  )
}

export default UserManagment
