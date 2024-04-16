import { useEffect, useState } from "react"
import { IOrder } from "../../interfaces/Client"
import { getAllOrdersAPI } from "../../common/utils/APIs/AdminApi"
import { ShortenDescription } from "../../common/utils/Services/shortenDescription"
import { FormatDateString } from "../../common/utils/Services/dateFormater"

function OrdersTable() {
    const [orders,setOrders] = useState<IOrder[]>()
    useEffect(() => {
      const fetchData = async()=>{
        const response = await getAllOrdersAPI()
        console.log(response);
        
        if(response.status){
          setOrders(response.orders)
        }
      }
      fetchData()
    }, [])
  return (
    <>
      <div className="-m-1.5 overflow-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <div className="table border-collapse table-auto w-full divide-y divide-gray-200 dark:divide-gray-700">
              <div className="table-header-group">
                <div className="table-row">
                  <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    image
                  </div>
                  <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Title
                  </div>
                  <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Category & Subcategory
                  </div>
                  <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    work Amount
                  </div>
                  <div className=" table-cell px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Date
                  </div>
                  <div className=" table-cell px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Status
                  </div>
                </div>
              </div>
              <div className="table-row-group divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-slate-800">
                {orders?.map((order:IOrder) => {
                  return (
                    <div className="table-row">
                      <div className="table-cell  px-1 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        <img className="h-10 rounded" src={order.WorkDetails.image1} alt="" />
                      </div>
                      <div className="table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        {ShortenDescription(order.WorkDetails.title,20)}
                      </div>
                      <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {order.WorkDetails.categoryNames[0]}-{order.WorkDetails.categoryNames[1]}
                      </div>
                      <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      ₹ {order.amount} 
                      </div>
                      <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {FormatDateString(order.date as any)} 
                      </div>
                      <div className="table-cell px-6 py-4 text-yellow-500 whitespace-nowrap capitalize text-sm  dark:text-gray-200">
                      <i className="fa-regular fa-circle-dot fa-beat-fade" /> {" "} <span className="capitalize">{order.status}</span>
                      </div>
                      
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrdersTable