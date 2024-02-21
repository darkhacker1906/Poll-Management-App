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
import { ToastContainer, toast } from "react-toastify";
import { userVoteApi } from "../redux/slice/UserVoteSlice";
import UserNav from "../components/UserNav";

function UserDashBoard() {
  const navigate = useNavigate();
  const adminPollData = useSelector((state) => state.adminPoll.data);
  const UserVoteData = useSelector((state) => state.userVote);
  const [column1Data, setColumn1Data] = useState([]);
  const [column2Data, setColumn2Data] = useState([]);
  const token = localStorage.getItem("token");
  const [addId,setAddId]=useState(null);
  useEffect(() => {
    const storedDisabledOptions = JSON.parse(localStorage.getItem("disabledOptions")) || {};
    setDisabledOptions(storedDisabledOptions);
  }, []);
  const [disabledOptions,setDisabledOptions]=useState({});

  const handleLogout = () => {
    alert("Logging out");
    navigate("/");
    localStorage.clear();
  };
  const add_poll = (id, option) => {
    const header = {
      headers: {
        access_token: token,
      },
    };
    dispatch(userVoteApi({ id, option, header }));
    setAddId(id);
    setDisabledOptions((prev)=>({
      ...prev,addId:OptionIndex,
    }));
    localStorage.setItem("disabledOptions", JSON.stringify({ ...disabledOptions, addId: OptionIndex }));
  };
  useEffect(() => {
    dispatch(AdminPollApi());
  }, [dispatch]);

  useEffect(() => {
    const halfData = Math.ceil(adminPollData.length / 2);
    setColumn1Data(adminPollData.slice(0, halfData));
    setColumn2Data(adminPollData.slice(halfData));
  }, [adminPollData]);

  useEffect(() => {
    if ( UserVoteData.isSuccess) {
      toast.success("Vote added successfully", { autoClose: 1000 });
    } else if (addId !== null && UserVoteData && UserVoteData.error !== 0) {
      toast.error("Failed to add vote",{autoClose:1000});
    }
  }, [UserVoteData.isSuccess, addId]);

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
        {/* <Box
          display={"flex"}
          sx={{ justifyContent: "space-around", color: "white" }}
        >
          <Typography variant="h5" color={"white"}>
            User Dashboard
          </Typography>
          <Button onClick={handleLogout} sx={{ color: "white" }}>
            Logout
          </Button>
        </Box> */}
        
        <UserNav/>
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
                          mt: 1,
                        }}
                      >
                        <Typography>{e.option}</Typography>
                        <Button
                          variant="contained"
                          sx={{ background: "#1A778A" }}
                          onClick={() => add_poll(user._id, e.option)}
                        >
                          Vote
                        </Button>
                      </Box>
                    ))}
                    <Box>View a poll</Box>
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
                          mt: 1,
                        }}
                      >
                        <Typography>{e.option}</Typography>
                        <Button
                          variant="contained"
                          sx={{ background: "#1A778A" }}
                          onClick={() => add_poll(user._id, e.option)}
                        >
                          Vote
                        </Button>
                      </Box>
                    ))}
                     <Box>View a poll</Box>
                  </CardContent>
                )}
              </Card>
            ))}
          </Grid>
        </Grid>
      </Stack>
      <ToastContainer />
    </>
  );
}

export default UserDashBoard;
