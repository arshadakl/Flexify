import { Outlet } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";

const LayoutParant = () => {
  return (
    <>
    <DefaultLayout />
      <div className="p-4 sm:ml-52 mt-5">
        <div className="p-4 border-2 border-gray-200  rounded-lg dark:border-gray-700 mt-14">
        <Outlet />
        </div>
      </div>
    </>
  );
};

export default LayoutParant;
