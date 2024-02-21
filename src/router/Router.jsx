import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import AdminDashBoard from '../pages/AdminDashBoard'
import UserDashBoard from '../pages/UserDashBoard'
import AddPoll from '../pages/AddPoll'
import PrivateRoute from './PrivateRoute'
import UserDetails from '../pages/UserDetails'
import EditTitle from '../pages/EditTitle'
import AddOption from '../pages/AddOption'
import ViewPoll from '../pages/ViewPoll'

function Router() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        {/* <Route path='/admin' element={<AdminDashBoard/>}/> */}
        {/* <Route path='/user' element={<UserDashBoard/>}/> */}
        <Route  path='/admin' element={<PrivateRoute Component={AdminDashBoard}/>}/>
        <Route path='/user' element={<PrivateRoute Component={UserDashBoard}/>}/>
        <Route path='/admin/addpoll' element={<AddPoll/>}/>
        <Route path='admin/userdetails' element={<UserDetails/>}/>
        <Route path='/edit/:id' element={<EditTitle/>}/>
        <Route path='/admin/addoption' element={<AddOption/>}/>
        <Route path='/user/viewpoll' element={<ViewPoll/>}/>
      </Routes>
    </div>
  )
}

export default Router
