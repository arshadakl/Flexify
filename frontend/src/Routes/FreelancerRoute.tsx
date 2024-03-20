import { Route, Routes } from 'react-router-dom'
import Signup from '../Pages/Signup/Signup'

function FreelancerRoute() {
  return (
    <Routes>
        {/* <Route path="/signup" element={<Signup/>}/> */}
        <Route path="/signup" element={<Signup/>}/>
    </Routes>
  )
}

export default FreelancerRoute
