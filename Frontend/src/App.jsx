import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Captainlogin from './pages/Captainlogin'
import Captainsignup from './pages/Captainsignup'
import Userlogin from './pages/Userlogin'
import Usersignup from './pages/Usersignup'
import Home from './pages/Home'
import Homepage from './pages/Homepage'
import UserProtrctedWrapper from './pages/UserProtrctedWrapper'
import Userlogout from './pages/Userlogout'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import Captainlogout from './pages/Captainlogout'
import CaptainHome from './pages/CaptainHome'
import RidingToDastination from './pages/RidingToDastination'
import CaptainRiding from './pages/CaptainRiding'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/captain-login" element={<Captainlogin />} />
        <Route path="/captain-signup" element={<Captainsignup />} />
        <Route path="/login" element={<Userlogin />} />
        <Route path="/signup" element={<Usersignup />} />
        <Route path="/final-riding" element={<RidingToDastination />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />
        <Route path="/home" element={
          <UserProtrctedWrapper>
            <Homepage />
          </UserProtrctedWrapper>
        } />
        <Route path="/logout" element={
          <UserProtrctedWrapper>
            <Userlogout />
          </UserProtrctedWrapper>
        } />
        <Route path="/captain-logout" element={
          <CaptainProtectedWrapper>
            <Captainlogout />
          </CaptainProtectedWrapper>
        } />
        <Route path="/captain-home" element={
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>
        } />
      </Routes>
    </div>
  )
}

export default App