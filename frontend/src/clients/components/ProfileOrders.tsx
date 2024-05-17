import { useEffect, useState } from "react";
import { IOrder } from "../../interfaces/Client";
import { getAllOrdersAPI } from "../../common/utils/APIs/ClientApi";
import { FormatDateString } from "../../common/utils/Services/dateFormater";
import { ShortenDescription } from "../../common/utils/Services/shortenDescription";

function ProfileOrders() {
    const [orders, setOrders] = useState<IOrder[]>();
    useEffect(() => {
      const fetchData = async () => {
        const response = await getAllOrdersAPI(1);
        setOrders(response.orders.orders);
        console.log(response);
      };
      fetchData();
    }, []);
  return (
    <>
    <div className="relative overflow-x-auto">
            <table className="w-full text-sm border text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs border text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="uppercase">
                  <th scope="col" className="px-6 py-3">
                    order
                  </th>
                  <th scope="col" className="px-6 py-3">
                    date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    budget
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => {
                  return (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {ShortenDescription(order.WorkDetails.title,20)}
                      </th>
                      
                      <td className="px-6 py-4">
                        {FormatDateString(order.date as any)}
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        ₹ {order.amount}
                      </td>
                      <td className="px-6 py-4">{order.category[0]}</td>
                      <td className="px-6 py-4 capitalize font-semibold font-poppins text-yellow-500"><i className="fa-regular fa-circle-dot fa-beat-fade" /> <span className="capitalize">{order.status}</span></td>
                     
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
    </>
  )
}

export default ProfileOrders