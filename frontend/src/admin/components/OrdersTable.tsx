import { useEffect, useState } from "react"
import { IOrder } from "../../interfaces/Client"
import { getAllOrdersAPI } from "../../common/utils/APIs/AdminApi"
import { ShortenDescription } from "../../common/utils/Services/shortenDescription"
// import { FormatDateString } from "../../common/utils/Services/dateFormater"

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
      
      <div className="overflow-x-auto">

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
              image
              </th>
              <th scope="col" className="px-6 py-3">
              Title
              </th>
              <th scope="col" className="px-6 py-3">
              Category & Subcategory
              </th>
              <th scope="col" className="px-6 py-3">
              Date
              </th>
              <th scope="col" className="px-6 py-3">
              Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order:IOrder) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img className="h-10 rounded" src={order.WorkDetails.image1} alt="" />
                  </th>
                  <td className="px-6 py-4"> {ShortenDescription(order.WorkDetails.title,20)}</td>
                  <td className="px-6 py-4">
                  {order.WorkDetails.categoryNames[0]}
                  </td>
                  <td className="px-6 py-4">
                  ₹ {order.amount} 
                  </td>
                  <td className="px-6 py-4">
                  <i className="fa-regular fa-circle-dot fa-beat-fade" /> {" "} <span className="capitalize">{order.status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </>
  )
}

export default OrdersTable