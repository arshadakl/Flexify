import { useEffect, useState } from "react";
import { getalltransactionAPI } from "../../common/utils/APIs/AdminApi";
// import { ITransaction } from "../../interfaces/Admin";
import { FormatDateString } from "../../common/utils/Services/dateFormater";

function TransactionTable() {
    const [transactions,setTransactions] = useState<any>()
    useEffect(() => {
      const fetchData = async()=>{
        const response = await getalltransactionAPI()
        console.log(response.data);
        
        if(response.status){
            setTransactions(response.data)
        }
      }
      fetchData()
    }, [])
  return (
    <>
      <div className="-m-1.5 overflow-auto w-full">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden">
            <div className="table border-collapse table-auto w-full divide-y divide-gray-200 dark:divide-gray-700">
              <div className="table-header-group">
                <div className="table-row">
                  <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                  User
                  </div>
                  <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Payment ID
                  </div>
                  <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Date
                  </div>
                  <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </div>
                  <div className="table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Payment Status
                  </div>
                  
                </div>
              </div>
              <div className="table-row-group divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-slate-800">
                {transactions?.map((transaction:any) => {
                  return (
                    <div className="table-row ">
                      <div className=" flex capitalize px-6 py-4 whitespace-nowrap text-sm font-medium  text-gray-800 content-end dark:text-gray-200">
                        <img className="h-9 w-9 rounded-full " src={transaction.user[0].profile} alt="" /> <p className="my-auto mx-2">{transaction.user[0].username}</p>
                      </div>
                      <div className="table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        #{transaction?._id}
                      </div>
                      <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                       {FormatDateString(transaction.date )} 
                      </div>
                      <div className="table-cell font-bold px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      ₹ {transaction.amount} 
                      </div>
                      <div className="table-cell px-6 py-4 text-green-500 whitespace-nowrap capitalize text-sm  dark:text-gray-200">
                      <i className="fa-regular fa-circle-dot fa-beat-fade" /> {" "} <span className="capitalize">{transaction.payment_status}</span>
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

export default TransactionTable