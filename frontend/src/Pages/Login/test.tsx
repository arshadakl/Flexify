import React from "react";

function test() {
  return (
    <>
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
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              rtrt
            </th>
            <td className="px-6 py-4">trt</td>
            <td className="px-6 py-4">tesss</td>
            <td className="px-6 py-4">
              <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                test
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default test;
