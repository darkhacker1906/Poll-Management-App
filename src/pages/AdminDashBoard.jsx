import { Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import AdminImg2 from "../assets/images/Admindash.jpeg"
import { useSelector } from "react-redux";
import { AdminPollApi } from "../redux/slice/AdminPollSlice";
import { dispatch } from "../redux/store/store";

function AdminDashBoard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    alert("Logging out");
    navigate("/");
    localStorage.clear();
  };
  const adminPollData=useSelector((state)=>state.adminPoll.data)
  console.log(adminPollData);
 useEffect(()=>{
  dispatch(AdminPollApi());
 },[dispatch])
  return (
    <>
    <Stack
      sx={{
        // backgroundImage: `url(${AdminImg2})`,
        // background:"linear-gradient",
        // backgroundSize:'cover',
        // objectFit: "cover",/
        background:"linear-gradient(80deg, rgb(3, 195, 195) 0.3%, rgb(37, 84, 112) 87.8%)",
        minHeight: "100vh",
        minWidth: "100vh",
        // backgroundSize: "cover",
        // backgroundPosition: "center",
            
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
      <Card
          sx={{ minWidth: 300, width: "35%", margin: "auto", borderRadius: 5 }}
        >
          <CardContent>
            <Stack direction={"column"} spacing={1} >
              <Typography sx={{ textAlign: "center" }} variant="h4">
                Poll
              </Typography>{
              adminPollData.map((user)=>(
                  <Typography>{user.title}</Typography>
                  
                  
              ))
              }
            </Stack>
          </CardContent>
        </Card>
     
    </Stack>
    </>
  );
}

export default AdminDashBoard;
