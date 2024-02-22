import {
  Box,
  Button,
  Card,
  CardContent,
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
import Navbar from "../components/Navbar";
import { MdEdit } from "react-icons/md";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";

import { resetReducer } from "../redux/slice/TitleEditSlice";
import { addPollResetReducer } from "../redux/slice/AddPollSlice";
import { deleteResetReducer } from "../redux/slice/DeletePollSlice";
import AddOptionModal from "../components/AddOptionModal";
import { addOptionResetReducer } from "../redux/slice/AddOptionSlice";

function AdminDashBoard() {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const adminPollData = useSelector((state) => state.adminPoll.data);
  const [column1Data, setColumn1Data] = useState([]);
  const [column2Data, setColumn2Data] = useState([]);
  const deleteData = useSelector((state) => state.deletePoll);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addOptionOpen,setAddOptionOpen]=useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [addOptionId,setAddOptionId]=useState(null);
  const editdata = useSelector((state) => state.editPoll);
  const addPollData = useSelector((state) => state.addPoll);
  const addOptionData=useSelector((state)=>state.addOption);

  const handleDelete = async (id) => {
    const selectedPoll=adminPollData.find((poll)=>poll._id===id);
    if(selectedPoll){
      setOpen(true);
    setDeleteId(id);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };
  const handleEdit = async (id) => {
    const selectedPoll = adminPollData.find((poll) => poll._id === id);
    if (selectedPoll) {
      setEditId(id);
      setTitle(selectedPoll.title);
      setEditOpen(true);
    }
  };
  const handleAddOption = (id) => {
    setAddOptionId(id);
    setAddOptionOpen(true);
  };
  const handleAddOptionClose=()=>{
    setAddOptionOpen(false);
  }
  useEffect(() => {
    if (addPollData && addPollData.isSuccess) {
      toast.success("Poll added successfully", { autoClose: 1000 });
      dispatch(addPollResetReducer());
    } else if (addPollData && addPollData.isError) {
      toast.error("Poll not added successfully", { autoClose: 1000 });
      dispatch(addPollResetReducer());
    } else if (deleteData && deleteData.isSuccess) {
      console.log("delete");
      toast.success("Poll  deleted successfully", { autoClose: 1000 });
      dispatch(deleteResetReducer());
    } else if (deleteData && deleteData.isError) {
      toast.error("Poll not  deleted successfully", { autoClose: 1000 });
      dispatch(deleteResetReducer());
    } else if (editdata && editdata.isSuccess) {
      toast.success("Title edited successfully", { autoClose: 1000 });
      dispatch(resetReducer());
    } else if (editdata && editdata.isError) {
      toast.error("Poll not  edited successfully", { autoClose: 1000 });
      dispatch(resetReducer());
    }
    else if(addOptionData && addOptionData.isSuccess){
      toast.success("Option added successfully",{autoClose:1000});
      dispatch(addOptionResetReducer());
    }
    else if(addOptionData && addOptionData.isError){
      toast.error("Option not added successfully",{autoClose:1000});
      dispatch(addOptionResetReducer());
    }
  }, [
    deleteData.isSuccess,
    deleteData.isError,
    editdata.isSuccess,
    editdata.isError,
    addPollData.isError,
    addPollData.isSuccess,
    addOptionData.isSuccess,
    addOptionData.isError
  ]);

  useEffect(() => {
    dispatch(AdminPollApi());
  }, [ deleteId, deleteData.isSuccess, editId, editdata.isSuccess,addOptionId,addOptionData.isSuccess]);

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
                        <Typography
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                            },
                          }}
                        >
                          {" "}
                          <MdEdit
                            fontSize={23}
                            onClick={() => handleEdit(user._id)}
                          />
                        </Typography>
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
                      onClick={() => handleAddOption(user._id)}
                      disabled={user.options.length >= 4} 
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
                    <Button
                      onClick={() => handleDelete(user._id)}
                      sx={{
                        color: "#ffffff",
                        fontWeight: "bold",
                        background: "#FF0000",
                        "&:hover": {
                          backgroundColor: "red",
                        },
                      }}
                    >
                      Delete
                      <MdDelete fontSize={25} />
                    </Button>
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
                      <Typography
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                      >
                        <MdEdit
                          fontSize={23}
                          onClick={() => handleEdit(user._id)}
                        />
                      </Typography>
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
                    onClick={() => handleAddOption(user._id)}
                    disabled={user.options.length >= 4}
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
                  <Button
                    onClick={() => handleDelete(user._id)}
                    sx={{
                      color: "#ffffff",
                      fontWeight: "bold",
                      background: "#FF0000",
                      "&:hover": {
                        backgroundColor: "red",
                      },
                    }}
                  >
                    Delete
                    <MdDelete fontSize={25} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Stack>
      <ToastContainer />
      <DeleteModal open={open} deleteId={deleteId} handleClose={handleClose} />
      <EditModal
        editOpen={editOpen}
        handleEditClose={handleEditClose}
        editId={editId}
        title={title}
      />
      <AddOptionModal handleAddOptionClose={handleAddOptionClose} addOptionOpen={addOptionOpen} addOptionId={addOptionId}/>
    </>
  );
}

export default AdminDashBoard;
