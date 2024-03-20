// import { useState } from "react";
import { useState } from "react";
// import NavBar from "../../components/Navbar/NavBar";
import UserSelection from "../../components/ProfileCompletionParts/userSelection";
import CompletionForm from "../../components/ProfileCompletionParts/CompletionForm";

const ProfileCompletion = () => {
  const [pageManage,setPageManage] = useState<number>(1)
  const [userType,setUserType] = useState<string>("")
  return (
    <>
      {/* <NavBar /> */}
      {pageManage===1 ? <UserSelection pageManage={setPageManage} setUserType={setUserType} userType={userType} /> : <CompletionForm/>}
      
      
    </>
  );
};

export default ProfileCompletion;
