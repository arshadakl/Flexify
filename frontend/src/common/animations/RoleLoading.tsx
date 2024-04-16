// import React from 'react'
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fadeIn } from "./Frame_Motion/variants";
function RoleLoading() {
    const [load,setLoad] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setLoad(true)
        },2000);
    }, [])
    
  return (
    <>
      {/* <div className=""> */}
        <motion.div  className={`static top-0 z-50 bg-white opacity-90 w-full flex items-center h-screen`}>
          {/* <motion.div className="w-1/4  bg-red-100">
          </motion.div> */}
          <motion.div className="w-1/4 m-auto flex justify-center ">
            <motion.div
              animate={{
                scale: load ? [1, 2, 2, 1, 1] : [1, 2, 2, 8, 1],
                rotate: [0, 0, 180, 180, 0],
                borderRadius: ["0%", "0%", "50%", "50%", "0%"],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1,
              }} variants={fadeIn("right",0.5)} initial="hidden" whileInView={"show"} viewport={{once:true}}
              className={`w-8 h-8 rounded my-auto bg-logo-green`}
            ></motion.div>

            <motion.img  variants={fadeIn("right",0.8)} initial="hidden" whileInView={"show"} viewport={{once:true}} className="w-44" src={load ? "/images/logo-txt.png" : "/images/logo-txt-w.png"} />
          </motion.div>
        </motion.div>
      {/* </div> */}
    </>
  );
}

export default RoleLoading;
