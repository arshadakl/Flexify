


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup/Signup';
import ProfileCompletion from './Pages/Signup/ProfileCompletion';
import Login from './Pages/Login/Login';
import FreelancerRoute from './Routes/FreelancerRoute';
import FreelancerProfile from './Pages/Profile/FreelancerProfile';
import { useContext, useEffect } from 'react';
import { AuthContext } from './config/context';
import AdminHome from './components/admin-component/adminHome';

function App() {
  const {setFreelancerDetails} = useContext(AuthContext)
  // const [user,setUser]= useState(false)

  useEffect(() => { 
    
    const storedDataString = localStorage.getItem('user_data');
    if(storedDataString){
      let obj = JSON.parse(storedDataString)
      if(obj.token){
        // setUser(true)
      }
      setFreelancerDetails(obj)
    }
    
  }, [])
  
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<FreelancerRoute />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profilecompletion' element={<ProfileCompletion />} />
        <Route path='/profile' element={<FreelancerProfile />} />

        <Route path="/admin" element={<AdminHome/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

