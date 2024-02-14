import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import AdminDashBoard from '../pages/AdminDashBoard'
import UserDashBoard from '../pages/UserDashBoard'


function Router() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/admin' element={<AdminDashBoard/>}/>
        <Route path='/user' element={<UserDashBoard/>}/>
      </Routes>
    </div>
  )
}

export default Router
