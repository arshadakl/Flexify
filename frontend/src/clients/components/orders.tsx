import { useEffect, useState } from "react";
import { getAllOrdersAPI } from "../../common/utils/APIs/ClientApi";
import { IOrder } from "../../interfaces/Client";
import { FormatDateString } from "../../common/utils/Services/dateFormater";
// import { ShortenDescription } from "../../common/utils/Services/shortenDescription";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalpage] = useState(1);
  const [orders, setOrders] = useState<IOrder[]>();
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await getAllOrdersAPI(page);
    setOrders(response.orders.orders);
    setTotalpage(response.orders.totalPages);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      <div className=" bg-slate-100 w-full min-h-screen max-h-full">
        <div className="w-11/12 mx-auto py-10">
          <h1 className="text-3xl font-semibold mx-5">Orders</h1>
          <hr className="my-4" />
          <div>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm border text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs border text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="uppercase">
                    <th scope="col" className="px-6 py-3"></th>
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
                      Work Status
                    </th>
                    <th scope="col" className="px-1 py-3"></th>
                    <th scope="col" className="px-1 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order: IOrder) => {
                    return (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">
                          <img
                            className="h-10 rounded"
                            src={order.WorkDetails.image1}
                            alt=""
                          />
                        </td>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {/* {ShortenDescription(order.WorkDetails.title,15)} */}
                          {order.category[1]}
                        </th>

                        <td className="px-6 py-4">
                          {FormatDateString(order.date as any)}
                        </td>
                        <td className="px-6 py-4 font-semibold">
                          ₹ {order.amount}
                        </td>
                        <td className="px-6 py-4">{order.category[0]}</td>
                        <td
                          className={`px-6 py-4 capitalize font-semibold font-poppins ${
                            order.status == "pending" && "text-gray-600"
                          } ${order.status == "submited" && "text-green-600"} ${
                            order.status == "Awaiting Approval" &&
                            "text-yellow-500"
                          }`}
                        >
                          <i className="fa-regular fa-circle-dot fa-beat-fade" />{" "}
                          <span className="capitalize">{order.status}</span>
                        </td>
                        <td className="px-1 py-4">
                          {order.status == "pending" ? (
                            <>
                              {!order.requirementStatus ? (
                                <button
                                  onClick={() =>
                                    navigate(
                                      `/client/orders/requirements?order=${order._id}`
                                    )
                                  }
                                  className=" py-2 px-5 me-2 mb-2 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 "
                                >
                                  <i className="fa-solid fa-rectangle-history-circle-plus mx-2" />
                                  Add Requirements
                                </button>
                              ) : (
                                <button
                                  disabled={true}
                                  className=" py-2 px-5 me-2 mb-2 text-md font-medium text-gray-300 focus:outline-none bg-white rounded-lg border border-gray-200  "
                                >
                                  <i className="fa-solid fa-file-circle-check mx-2 text-green-300" />
                                  Requirements Added
                                </button>
                              )}
                            </>
                          ) : (
                            <button
                              onClick={() =>
                                navigate(
                                  `/client/orders/submission?id=${order._id}`
                                )
                              }
                              className=" py-2 px-5 me-2 mb-2 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 "
                            >
                              <i className="fa-duotone fa-files mx-2" />
                              Delivered Work
                            </button>
                          )}
                        </td>
                        <td className="px-1 py-4">
                          <button
                            onClick={() =>
                              navigate(
                                `/client/orders/chat/${order.freelancerId}`
                              )
                            }
                            className=" py-2 px-4 me-2 mb-2 text-md font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 "
                          >
                            <i className="fa-solid fa-messages mx-3" />
                            Connect Freelancer
                          </button>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
