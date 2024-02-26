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
  console.log(adminPollData);
  const UserVoteData = useSelector((state) => state.userVote);
  const token = localStorage.getItem("token");
  const [addId, setAddId] = useState(null);
  const [disabledIds, setDisabledIds] = useState({});

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
  const add_vote =async (title ,id, option, index) => {
    try{
      setDisabledIds((prev)=>({
        ...prev,
        [id] : index,
      }))
      localStorage.setItem("disabledIds", JSON.stringify({ ...disabledIds, [id]: index }));
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
    } 
    if(UserVoteData.isError){
      toast.error("Vote not added successfully", { autoClose: 1000 });
    }
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
                        disabled={disabledIds[user._id]===index }
                        onClick={() => add_vote(user.title, user._id, e.option, index)}
                      >
                     {
                     disabledIds[user._id]===index && e.vote? <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="30" viewBox="0 0 48 48">
                     <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
                     </svg>:'vote'
                     }
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
