
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FreelancerRoute from './Routes/FreelancerRoute';
// import { useContext, useEffect } from 'react';
// import { AuthContext } from './common/utils/config/context';
import AdminRouter from './Routes/adminRouter';
import ClientRouter from './Routes/ClientRouter';
import { useEffect } from 'react';
import {initFlowbite} from 'flowbite'


function App() {

useEffect(() => {
  initFlowbite()
}, [])

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

