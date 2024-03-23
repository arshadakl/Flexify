import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Signup from './Pages/Signup/Signup'
import HomePage from './Pages/HomePage/HomePage'
import ProfileCompletion from './Pages/Signup/ProfileCompletion'
import Test from './Pages/Signup/Test'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/profilecompletion' element={<ProfileCompletion/>} />
        <Route path='/client' element={<ProfileCompletion/>} />

        <Route path='/test' element={<Test
        //  userType={"freelancer"}
         userType={"client"}
         />} />

        
      </Routes>
    </BrowserRouter>
  )
}

export default App
