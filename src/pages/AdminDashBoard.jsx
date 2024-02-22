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
import Navbar from "../components/Navbar";
import { MdEdit } from "react-icons/md";

function AdminDashBoard() {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const adminPollData = useSelector((state) => state.adminPoll.data);
  const [column1Data, setColumn1Data] = useState([]);
  const [column2Data, setColumn2Data] = useState([]);
  const deletedLoading = useSelector((state) => state.deletePoll.loading);

  const handleDelete = (id) => {
    dispatch(DeletePollApi(id));
    setDeleteId(id);
    toast.success("Poll  deleted successfully!", { autoClose: 1000 });
  };
  const handleEdit = (titleID) => {
    const selectedPoll = adminPollData.find((poll) => poll._id === titleID);
    if (selectedPoll) {
      navigate(`/edit/${titleID}`, { state: { pollData: selectedPoll } });
    }
  };
  const handleAddOption=(id)=>{
    navigate("/admin/addoption", { state: { id: id } })
  }

  useEffect(() => {
    dispatch(AdminPollApi());
  }, [dispatch, deleteId, deletedLoading]);

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
          <Navbar />
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
                  pt: 2,
                  opacity: 0.8,
                }}
              >
                {user && (
                  <CardContent>
                    <Box
                      display={"flex"}
                      sx={{
                        justifyContent: "space-between",
                        background: "#08B3B7",
                      }}
                    >
                      <Typography p={1}>{user.title}</Typography>{" "}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 1,
                        }}
                      >
                       <Typography sx={{ "&:hover": {
                         cursor:"pointer"
                        } }}> <MdEdit fontSize={23} onClick={() => handleEdit(user._id)} /></Typography>
                      </Box>
                    </Box>

                    {user.options.map((e, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography p={1}>{e.option}</Typography>
                        <Typography>Vote {e.vote}</Typography>
                      </Box>
                    ))}
                    <Button
                      variant="contained"
                      onClick={()=>handleAddOption(user._id)}
                      sx={{
                        mr: 1,
                        background: "#168594",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "#168594",
                        },
                      }}
                    >
                      Add Option
                    </Button>
                    {user._id === deleteId && deletedLoading ? (
                      <CircularProgress />
                    ) : (
                      <Button
                        onClick={() => handleDelete(user._id)}
                        sx={{
                          color: "#ffffff",
                          fontWeight: "bold",
                          // background: "#f46161",
                          background: "#FF0000",
                          "&:hover": {
                            backgroundColor: "red",
                          },
                        }}
                      >
                        Delete
                        <MdDelete fontSize={25} />
                      </Button>
                    )}
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
                  pt: 2,
                  opacity: 0.8,
                }}
              >
                <CardContent>
                  <Box
                    display={"flex"}
                    sx={{
                      justifyContent: "space-between",
                      background: "#08B3B7",
                    }}
                  >
                    <Typography sx={{ p: 1 }}>{user.title}</Typography>{" "}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 1,
                        fontSize: "20px",
                      }}
                    >
                     <Typography sx={{ "&:hover": {
                         cursor:"pointer",
                        },
                        }}><MdEdit fontSize={23} onClick={() => handleEdit(user._id)} /></Typography> 
                    </Box>
                  </Box>
                  {user.options.map((e, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography p={1}> {e.option}</Typography>
                      <Typography>Vote {e.vote}</Typography>
                    </Box>
                  ))}
                  <Button
                    variant="contained"
                    onClick={()=>handleAddOption(user._id)}
                    sx={{
                      mr: 1,
                      background: "#168594",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#168594",
                      },
                    }}
                  >
                    Add Option
                  </Button>
                  {user._id === deleteId && deletedLoading ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      onClick={() => handleDelete(user._id)}
                      sx={{
                        color: "#ffffff",
                        fontWeight: "bold",
                        // background: "#f46161",
                        background: "#FF0000",
                        "&:hover": {
                          backgroundColor: "red",
                        },
                      }}
                    >
                      Delete
                      <MdDelete fontSize={25} />
                    </Button>
                  )}
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
