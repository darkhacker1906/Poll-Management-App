import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AdminPollApi } from "../redux/slice/AdminPollSlice";
import { dispatch } from "../redux/store/store";
import { ToastContainer, toast } from "react-toastify";
import { userVoteApi, userVoteResetReducer } from "../redux/slice/UserVoteSlice";
import UserNav from "../components/UserNav";

function UserDashBoard() {
  const navigate = useNavigate();
  const adminPollData = useSelector((state) => state.adminPoll.data);
  const UserVoteData = useSelector((state) => state.userVote);
  const token = localStorage.getItem("token");
  const [addId, setAddId] = useState(null);
  const [option,setOption]=useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  
  const header = {
    headers: {
      access_token: token,
    },
  };
  const add_vote =async (id, option) => {
    try{
      await dispatch(userVoteApi(id, option,header ));
      setAddId(id);
      dispatch(userVoteResetReducer());
    }catch(error){
      console.log("error", error);
    }
    setAddId(id);
  };
  useEffect(() => {
    dispatch(AdminPollApi());
  }, [UserVoteData]);

  useEffect(() => {
    if (UserVoteData!=null && UserVoteData.isSuccess) {
      toast.success("Vote added successfully", { autoClose: 1000 });
    } else if (addId !== null && UserVoteData && UserVoteData.isError !== 0) {
      toast.error("Failed to add vote", { autoClose: 1000 });
    }
    setAddId(null);
  }, [UserVoteData.isSuccess, UserVoteData.isError]);

  const reversedPollList = [...adminPollData].reverse();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = reversedPollList.slice(startIndex, endIndex);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "auto",
        margin: "auto",
        background: "linear-gradient(80deg, #2193b0 0.3%, #6dd5ed 87.8%)",
      }}
    >
      <UserNav />
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexWrap: "wrap",
          width: "97%",
          margin: "auto",
          justifyContent: "space-between",
          padding: 1,
        }}
      >
        {currentItems && currentItems.length > 0 ? (
          currentItems.map((user) => (
            <Card
              key={user._id}
              sx={{
                width: { lg: "49%", sm: "47%", md: "47%", xs: "95%" },
                borderRadius: 5,
                marginTop: 3,
                pt: 2,
                opacity: 0.8,
                height: "280px",
                "&:hover": {
                  boxShadow: "15px 15px 15px grey",
                },
              }}
            >
              {user && (
                <CardContent>
                  <Box
                    display={"flex"}
                    sx={{
                      justifyContent: "space-between",
                      background: "#2E9FBB",
                    }}
                  >
                    <Typography p={1} sx={{fontSize:"19px",fontWeight:"bold"}}>{user.title}</Typography>{" "}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 1,
                      }}
                    ></Box>
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
                      <Typography p={1}>{e.option}</Typography>
                      <Button
                        variant="contained"
                        sx={{ background: "#1A778A","&:hover": {
                          background: "#156467",
                        },}}
                        onClick={() => add_vote(user._id, e.option)}
                      >
                        Vote
                      </Button>
                    </Box>
                  ))}
                </CardContent>
              )}
            </Card>
          ))
        ) : (
          <Typography variant="h6" textAlign={"center"}></Typography>
        )}
      </Box>
      <Box
        sx={{
          margin: "auto",
          width: { sm: "70%", display: "flex", justifyContent: "center" },
        }}
      >
        {currentItems.length > 2 ? (
          <Pagination
            sx={{
              margin: "auto",
              width: {
                lg: "35%",
                sm: "70%",
              },
              display: "flex",
              justifyContent: "center",
            }}
            count={Math.ceil(adminPollData.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        ) : (
          <Pagination
            sx={{
              margin: "auto",
              width: {
                lg: "35%",
                sm: "70%",
                bottom: 0,
                position: "fixed",
                display: "flex",
                justifyContent: "center",
              },
            }}
            count={Math.ceil(adminPollData.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        )}
      </Box>
      <ToastContainer />
    </Box>
  );
}

export default UserDashBoard;
