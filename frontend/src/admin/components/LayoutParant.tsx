import { Outlet } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";

const LayoutParant = () => {
  return (
    <>
    <DefaultLayout />
      <div className="p-4 sm:ml-52 mt-5 ">
        <div className="p-4  dark:border-gray-700 mt-14 bg-slate-400 rounded-md bg-clip-padding backdrop-filter  bg-opacity-10 border border-gray-100
">
        <Outlet />
        </div>
      </div>
    </>
  );
};

export default LayoutParant;
