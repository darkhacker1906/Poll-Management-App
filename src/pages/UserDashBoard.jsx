import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AdminPollApi } from "../redux/slice/AdminPollSlice";
import { dispatch } from "../redux/store/store";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { DeletePollApi } from "../redux/slice/DeletePollSlice";
import { userVoteApi } from "../redux/slice/UserVoteSlice";

function AdminDashBoard() {
  const navigate = useNavigate();
  const adminPollData = useSelector((state) => state.adminPoll.data);
const UserVoteData=useSelector((state)=>state.userVote);

  const [column1Data, setColumn1Data] = useState([]);
  const [column2Data, setColumn2Data] = useState([]);
  
  const handleLogout = () => {
    alert("Logging out");
    navigate("/");
    localStorage.clear();
  };
  const add_poll=(id,option)=>{
    const header={headers:{
      access_token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEwMTgyYzU5NTI3ZmUwMDEyMzcwN2IyIiwiaWF0IjoxNTEwMDQ4NDY4LCJleHAiOjE1MTM2NDg0Njh9.DG93Hq-Fde9kNZbgnr34l2dZyeEYyJ0OfD_9yZK1JCQ'
  },}
   dispatch(userVoteApi({id,option},header));
  }
  useEffect(() => {
    dispatch(AdminPollApi());
  }, [dispatch]);
  useEffect(() => {
    const halfData = Math.ceil(adminPollData.length / 2);
    setColumn1Data(adminPollData.slice(0, halfData));
    setColumn2Data(adminPollData.slice(halfData));
  }, [adminPollData]);

  return (
    <>
      <Stack
        sx={{
          background:
            "linear-gradient(80deg, rgb(3, 195, 195) 0.3%, rgb(37, 84, 112) 87.8%)",
          minHeight: "100vh",
          minWidth: "100vh",
        }}
      >
        <Box
          display={"flex"}
          sx={{ justifyContent: "space-around", color: "white" }}
        >
          <Typography variant="h5" color={"white"}>
            User Dashboard
          </Typography>
          <Button onClick={handleLogout} sx={{ color: "white" }}>
            Logout
          </Button>
        </Box>
        <Grid container spacing={5} p={5}>
          <Grid item xs={12} md={6} sm={6}>
            {column1Data.map((user) => (
              <Card
                key={user._id}
                sx={{
                  minWidth: 300,
                  width: "100%",
                  borderRadius: 5,
                  marginTop: 3,
                }}
              >
                {user && (
                  <CardContent>
                    <Box
                      display={"flex"}
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Typography>{user.title}</Typography>{" "}
                    </Box>

                    {user.options.map((e, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: 2,
                        }}
                      >
                        <Typography>{e.option}</Typography>
                        <Button
                          variant="contained"
                          sx={{ background: "#1A778A" }}
                          onClick={()=>add_poll(user._id,e.option)}
                        >
                          Vote
                        </Button>
                      </Box>
                    ))}
                  </CardContent>
                )}
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            {column2Data.map((user) => (
              <Card
                key={user._id}
                sx={{
                  minWidth: 200,
                  width: "100%",
                  borderRadius: 5,
                  marginTop: 3,
                }}
              >
                <CardContent>
                  <Box
                    display={"flex"}
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Typography>{user.title}</Typography>{" "}
                    <Button variant="contained" sx={{ background: "#1A778A" }}>
                      Vote
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Stack>
      <ToastContainer />
    </>
  );
}

export default AdminDashBoard;
