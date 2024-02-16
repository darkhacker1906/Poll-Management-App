import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AdminImg2 from "../assets/images/Admindash.jpeg"
import { useSelector } from "react-redux";

function AdminDashBoard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    alert("Logging out");
    navigate("/");
    localStorage.clear();
  };
  const pollData=useSelector((state)=>state.addPoll);
  console.log(pollData);
  return (
    <>
    <Stack
      sx={{
        backgroundImage: `url(${AdminImg2})`,
        backgroundSize:'cover',
        objectFit: "cover",
        minHeight: "100vh",
        minWidth: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
            
      }}
    >
      <Box display={"flex"} sx={{justifyContent:"space-around",color:"white"}}>
      <Typography variant="h5" color={"white"}>
        Admin dashboard
      </Typography>
      <NavLink to={"/admin/addpoll"} style={{color:"white",textDecoration:"none" }}> Add poll</NavLink>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
      </Box>
     
    </Stack>
    </>
  );
}

export default AdminDashBoard;
