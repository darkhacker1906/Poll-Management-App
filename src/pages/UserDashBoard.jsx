import { Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function UserDashBoard() {
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.clear();
    navigate('/');
  }
  return (
    <div>
    <Typography variant='h4' color={"red"}>User dashboard</Typography>
    <Button variant='contained'onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default UserDashBoard
