import { initFlowbite } from "flowbite";
import NavBar from "../../common/components/Navbar/NavBar";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../common/animations/Frame_Motion/variants";
import RecivedWork from "../../freelancers/components/RecivedWork";


function DashboardClient() {
  const [tab,setTab] = useState<string>("Work Submissions")
  initFlowbite()
  return (
    <>
      <NavBar fixed="top" bg={"dark"} />
      <div className="w-full h-full min-h-screen py-5  bg-slate-100">
      <div className="pt-32 px-32">
        <motion.h1
         variants={fadeIn("down",0.5)} initial="hidden" whileInView={"show"} viewport={{once:true}}
         className="text-4xl font-normal my-2 font-poppins">{tab}</motion.h1>
        <div>
        <>
  <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
    <ul
      className="flex flex-wrap -mb-px text-sm font-medium text-center"
      id="default-styled-tab"
      data-tabs-toggle="#default-styled-tab-content"
      data-tabs-active-classes="text-flexy-green hover:text-logo-green dark:text-logo-green dark:hover:text-logo-green border-logo-green dark:border-logo-green"
      data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300"
      role="tablist"
    >
      <li className="me-2" role="presentation">
        <motion.button   variants={fadeIn("down",0.1)}  initial="hidden" whileInView={"show"} viewport={{once:true}}
          className="inline-block p-4 border-b-2 rounded-t-lg"
          id="profile-styled-tab"
          data-tabs-target="#styled-profile"
          type="button"
          role="tab" onClick={()=>setTab("Open Work Orders")}
          aria-controls="profile"
          aria-selected="false"
        >
          Work Orders
        </motion.button>
      </li>
      <li className="me-2" role="presentation">
        <motion.button   variants={fadeIn("down",0.2)} initial="hidden" whileInView={"show"} viewport={{once:true}}
          className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
          id="dashboard-styled-tab"
          data-tabs-target="#styled-dashboard"
          type="button"
          role="tab" onClick={()=>setTab("Analytics")}
          aria-controls="dashboard"
          aria-selected="false"
        >
          Analytics
        </motion.button>
      </li>
      <li className="me-2" role="presentation">
        <motion.button   variants={fadeIn("down",0.3)} initial="hidden" whileInView={"show"} viewport={{once:true}}
          className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
          id="settings-styled-tab"
          data-tabs-target="#styled-settings"
          type="button"
          role="tab" onClick={()=>setTab("Works")}
          aria-controls="settings"
          aria-selected="false"
        >
          Works
        </motion.button>
      </li>
      <li role="presentation">
        <motion.button  variants={fadeIn("down",0.4)} initial="hidden" whileInView={"show"} viewport={{once:true}}
          className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
          id="contacts-styled-tab"
          data-tabs-target="#styled-contacts"
          type="button"
          role="tab" onClick={()=>setTab("Transactions")}
          aria-controls="contacts"
          aria-selected="false"
        >
          Transactions
        </motion.button>
      </li>
    </ul>
  </div>
  <div id="default-styled-tab-content">
    <div
      className="hidden  bg-gray-50 dark:bg-gray-800"
      id="styled-profile"
      role="tabpanel"
      aria-labelledby="profile-tab"
    >
      <RecivedWork/>
      
    </div>
    <div
      className="hidden py-5  bg-gray-50 dark:bg-gray-800"
      id="styled-dashboard"
      role="tabpanel"
      aria-labelledby="dashboard-tab"
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">
      Analytics
      </p>
    </div>
    <div
      className="hidden   bg-gray-50 dark:bg-gray-800"
      id="styled-settings"
      role="tabpanel"
      aria-labelledby="settings-tab"
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">
      Works
      </p>
      
    </div>
    <div
      className="hidden   bg-gray-50 dark:bg-gray-800"
      id="styled-contacts"
      role="tabpanel"
      aria-labelledby="contacts-tab"
    >
      <p className="text-sm py-5 text-gray-500 dark:text-gray-400">
      Transactions
      </p>
    </div>
  </div>
</>

        </div>
      </div>
      </div>
    </>
  );
}

export default DashboardClient;
