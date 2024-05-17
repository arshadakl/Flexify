import { useEffect, useState } from "react";
import { getRecivedOrdersAPI } from "../../common/utils/APIs/FreelancerApi";
// import { IOrder } from "../../interfaces/Client";
import { FormatDateString } from "../../common/utils/Services/dateFormater";
import { useNavigate } from "react-router-dom";

function RecivedWork() {
  const navigate = useNavigate()
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalpage] = useState(1);
  const [orders, setOrders] = useState<any>();

  const fetchOrders = async () => {
    const response = await getRecivedOrdersAPI(page);

    if (response.status) {
      setOrders(response.orders.works);
      setTotalpage(response.orders.totalPages);
    }
  };

  useEffect(() => {
    
    fetchOrders();
  }, [page]);
  const currentDate = new Date();

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs border-2  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4">
                Client
              </th>
              <th scope="col" className="px-2 py-4">
                Category
              </th>
              <th scope="col" className="px-2 py-4">
                Orderd Date
              </th>
              <th scope="col" className="px-2 py-4">
                Deadline
              </th>
              <th scope="col" className="px-2 py-4">
                Requirements
              </th>
              <th scope="col" className="px-2 py-4">
                submition
              </th>
              <th scope="col" className="px-2 py-4">
                Staus
              </th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order: any) => {
              // const date = new Date(order.date);
              // date.setDate(date.getDate() + order.WorkDetails.deliveryPeriod);
              // const deadline:any = date.getTime();
              const isToday =
                currentDate.toDateString() ===
                new Date(order.deadline).toDateString();
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-2 flex py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="h-10 w-10 rounded-full mx-1.5"
                      src={order.client[0].profile}
                      alt=""
                    />
                    <p className="my-auto"> {order.client[0].username}</p>
                  </th>
                  <td className="px-2 py-4">{order.category[1]}</td>
                  <td className="px-2 py-4">{FormatDateString(order.date)}</td>
                  <td className={` px-2 py-4 font-medium`}>
                    {isToday ? (
                      <p className="text-yellow-500 font-semibold">Today</p>
                    ) : (
                      FormatDateString(order.deadline)
                    )}
                  </td>
                  <td className="px-1 py-4 text-[13px]">
                    {order.requirementStatus ? <button onClick={()=>navigate(`/dashboard/requirements?id=${order._id}`)} className=" py-2 px-4 me-2 mb-2 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 ">
                    <i className="fa-solid fa-file-zipper mx-3" />
                      Get Requirements Files
                    </button> :
                    <button disabled={true} className=" py-2 px-4 me-2 mb-2 text-md font-medium text-gray-300 focus:outline-none bg-white rounded-lg border border-gray-200   ">
                    <i className="fa-solid fa-file-zipper mx-3" />
                      Requirements Not Added
                    </button>
                    }
                  </td>
                  <td className="px-1 py-4">
                  <button onClick={()=>navigate(`/dashboard/order-management?id=${order._id}`)} className=" py-2 px-4 me-2 mb-2 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 ">
                  <i className="fa-solid fa-calendar-arrow-up mx-3" />
                    Manage Order
                    </button>
                  </td>
                  <td className="px-1 py-4">
                  

                  <td
                  className={`px-6 py-4 text-[13px] capitalize ${
                    order.status !== "submited"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  <i className="fa-regular fa-circle-dot fa-fade" />{" "}
                  {order.status}
                </td>


                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <>
                <div className="w-full flex px-5 py-2 justify-end ">
                  <nav aria-label="Page navigation example">
                    <ul className="inline-flex -space-x-px text-sm">
                      <li>
                        <button
                          disabled={page == 1 ? true : false}
                          onClick={() => setPage(page - 1)}
                          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          Previous
                        </button>
                      </li>
                      <li>
                        <p
                          aria-current="page"
                          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          {page}
                        </p>
                      </li>

                      <li>
                        <p
                          onClick={() => {
                            if (page == totalPage + 1) return;
                            setPage(page + 1);
                          }}
                          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          Next
                        </p>
                      </li>
                    </ul>
                  </nav>
                </div>
              </>
        {orders && (
          <h1 className="text-center w-full text-2xl font-semibold py-5 text-slate-400">
            {orders.length === 0 ? "No Orders Found" : ""}
          </h1>
        )}
      </div>
    </>
  );
}

export default RecivedWork;
