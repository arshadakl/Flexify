import { useEffect, useState } from "react"
import { getNotificationsAPI } from "../../utils/APIs/FreelancerApi"

function NotificationSection({bg}:{bg:string}) {
    const [notification,setNotification] = useState<any[]>()
    useEffect(() => {
     const fetchData = async ()=>{
        const response = await getNotificationsAPI()
        setNotification(response.notifications)
        
     }
     fetchData()
    }, [])
    
  return (
    <>
     <button
                  id="dropdownNotificationButton"
                  data-dropdown-toggle="dropdownNotification"
                  className={`relative inline-flex items-center text-sm font-medium text-center  ${bg == "none" ? "text-white" : "text-logo-green"} hover:text-logo-green focus:outline-none dark:hover:text-white dark:text-gray-400`}
                  type="button"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 14 20"
                  >
                    <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
                  </svg>
                  <div className="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 start-2.5 dark:border-gray-900" />
                </button>
                {/* Dropdown menu */}
                <div
                  id="dropdownNotification"
                  className="z-20 hidden w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
                  aria-labelledby="dropdownNotificationButton"
                >
                  <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                    Notifications
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {notification?.map((notif)=>{
                        return(
                            <a
                      className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      
                      <div className="w-full ps-3">
                        <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                          {notif.message}
                          
                        </div>
                        <div className="text-xs text-blue-600 dark:text-blue-500">
                          {notif.date}
                        </div>
                      </div>
                    </a>
                        )
                    })}
                    
                    
                  </div>
                  <a
                    href="#"
                    className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                  >
                   
                  </a>
                </div>
    </>
  )
}

export default NotificationSection