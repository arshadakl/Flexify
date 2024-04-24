import { useEffect, useState } from "react";
import {  getTransactionsAPI } from "../../common/utils/APIs/FreelancerApi";
// import { IOrder } from "../../interfaces/Client";
import { FormatDateString } from "../../common/utils/Services/dateFormater";
// import { useNavigate } from "react-router-dom";

function TransactionsTable() {
//   const navigate = useNavigate()
  const [transactions, setTransactions] = useState<any>();
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getTransactionsAPI();

      if (response.status) {
        setTransactions(response.details);
      }
    };
    fetchOrders();
  }, []);


  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs border-2  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4">
                ID
              </th>
              <th scope="col" className="px-6 py-4">
                Amount
              </th>
              <th scope="col" className="px-6 py-4">
                Tansaction Date
              </th>
              <th scope="col" className="px-6 py-4">
                payment_status
              </th>
              
            </tr>
          </thead>

          <tbody>
            {transactions?.map((transaction: any) => {
            
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 flex py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    #{transaction.date}
                  </th>
                  <td className="px-2 py-4 font-bold">₹ {transaction.amount}</td>
                  <td className={` px-2 py-4 font-medium`}>
                    {FormatDateString(transaction.date)}
                  </td>
                  
                  <td className="px-1 py-4">
                  

                  <td
                  className={`px-6 py-4 font-medium capitalize ${
                    transaction.payment_status === "pending"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  <i className="fa-regular fa-circle-dot fa-fade" />{" "}
                  {transaction.payment_status}
                </td>


                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {transactions && (
          <h1 className="text-center w-full text-2xl font-semibold py-5 text-slate-400">
            {transactions.length === 0 ? "No Transactions Found" : ""}
          </h1>
        )}
      </div>
    </>
  );
}

export default TransactionsTable;
