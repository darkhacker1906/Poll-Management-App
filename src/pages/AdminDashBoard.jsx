import { Button, Typography } from '@mui/material'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function AdminDashBoard() {
  const navigate=useNavigate();
  const handleLogout=()=>{
    alert("Logging out")
    navigate("/");
    localStorage.clear();
  }
  return (
    <div>
      <Typography variant='h1' color={"red"}>Admin dashboard</Typography>
      <NavLink to={"/admin/addpoll"} > Add poll</NavLink>
      <Button variant='contained'onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default AdminDashBoard
