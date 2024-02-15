import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import AdminDashBoard from '../pages/AdminDashBoard'
import UserDashBoard from '../pages/UserDashBoard'
import AddPoll from '../pages/AddPoll'
import PrivateRoute from './PrivateRoute'

function Router() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        {/* <Route path='/admin' element={<AdminDashBoard/>}/> */}
        <Route  path='/admin' element={<PrivateRoute Component={AdminDashBoard}/>}/>
        {/* <Route path='/user' element={<UserDashBoard/>}/> */}
        <Route path='/user' element={<PrivateRoute Component={UserDashBoard}/>}/>
        <Route path='/admin/addpoll' element={<AddPoll/>}/>
      </Routes>
    </div>
  )
}

export default Router
