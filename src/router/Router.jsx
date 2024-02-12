import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

function Router() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </div>
  )
}

export default Router
