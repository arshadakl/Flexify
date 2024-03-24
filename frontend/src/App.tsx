// import { BrowserRouter, Route, Routes } from 'react-router-dom'

// import Signup from './Pages/Signup/Signup'
// // import HomePage from './Pages/HomePage/HomePage'
// import ProfileCompletion from './Pages/Signup/ProfileCompletion'
// // import Test from './Pages/Signup/Test'
// import Login from './Pages/Login/Login'
// // import FreelancerRoute from './Routes/FreelancerRoute'
// // import ClientRouter from './Routes/ClientRouter'
// import FreelancerRoute from './Routes/FreelancerRoute'

// function App() {

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<FreelancerRoute/>} />
//         <Route path='/signup' element={<Signup/>} />
//         <Route path='/login' element={<Login/>} />
//         <Route path='/profilecompletion' element={<ProfileCompletion/>} />
//         {/* <Route path='/client' element={<ProfileCompletion/>} /> */}
//         {/* <Route path='/freelancer' element={<FreelancerRoute/>} /> */}

//         {/* <Route path='/test' element={<Test
//         //  userType={"freelancer"}
//          userType={"client"}
//          />} /> */}

        
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup/Signup';
import ProfileCompletion from './Pages/Signup/ProfileCompletion';
import Login from './Pages/Login/Login';
import FreelancerRoute from './Routes/FreelancerRoute';
import FreelancerProfile from './Pages/Profile/FreelancerProfile';
import { useContext, useEffect } from 'react';
import { AuthContext } from './config/context';

function App() {
  const {setFreelancerDetails} = useContext(AuthContext)

  useEffect(() => { 
    
    const storedDataString = localStorage.getItem('user_data');
    if(storedDataString){
      let obj = JSON.parse(storedDataString)
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
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

