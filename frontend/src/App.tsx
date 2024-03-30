
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FreelancerRoute from './Routes/FreelancerRoute';
// import { useContext, useEffect } from 'react';
// import { AuthContext } from './common/utils/config/context';
import AdminRouter from './Routes/AdminRouter';
import ClientRouter from './Routes/ClientRouter';


function App() {
  // const {setFreelancerDetails} = useContext(AuthContext)
  // // const [user,setUser]= useState(false)

  // useEffect(() => { 
    
  //   const storedDataString = localStorage.getItem('user_data');
  //   if(storedDataString){
  //     let obj = JSON.parse(storedDataString)
  //     setFreelancerDetails(obj)
  //   }
    
  // }, [])
  

  

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/*" element={<FreelancerRoute />} />
        <Route path="/client/*" element={<ClientRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>    
    </BrowserRouter>
  );
}

export default App;

