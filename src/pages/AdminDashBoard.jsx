import {
  Box,
  Button,
  Card,
  CardContent,
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const adminPollData = useSelector((state) => state.adminPoll.data);
  const deleteData = useSelector((state) => state.deletePoll);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addOptionOpen, setAddOptionOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [addOptionId, setAddOptionId] = useState(null);
  const editdata = useSelector((state) => state.editPoll);
  const addPollData = useSelector((state) => state.addPoll);
  const addOptionData = useSelector((state) => state.addOption);

  const handleDelete = async (id) => {
    const selectedPoll = adminPollData.find((poll) => poll._id === id);
    if (selectedPoll) {
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
  const handleAddOptionClose = () => {
    setAddOptionOpen(false);
  };
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
    } else if (addOptionData && addOptionData.isSuccess) {
      toast.success("Option added successfully", { autoClose: 1000 });
      dispatch(addOptionResetReducer());
    } else if (addOptionData && addOptionData.isError) {
      toast.error("Option not added successfully", { autoClose: 1000 });
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
    addOptionData.isError,
  ]);

  useEffect(() => {
    dispatch(AdminPollApi());
  }, [
    deleteId,
    deleteData.isSuccess,
    editId,
    editdata.isSuccess,
    addOptionId,
    addOptionData.isSuccess,
  ]);

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
        background:
          "linear-gradient(80deg, rgb(3, 195, 195) 0.3%, rgb(37, 84, 112) 87.8%)",
      }}
    >
      <Navbar />
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexWrap: "wrap",
          width: "97%",
          margin: "auto",
          justifyContent:"space-between",
          padding:1
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
                "&:hover": {
                  boxShadow: "15px 15px 15px teal",
                },
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
                  {
                    user.options.length<4 && 
                     <Button
                    variant="contained"
                    onClick={() => handleAddOption(user._id)}
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
                  }
                 
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
                    <MdDelete fontSize={25} />
                  </Button>
                </CardContent>
              )}
            </Card>
          ))
        ) : (
          <Typography variant="h6" textAlign={"center"}></Typography>
        )}
      </Box>
      <Box sx={{ margin: "auto", width: { sm: "70%", display:"flex",justifyContent:"center"} }}>
        <Pagination 
         sx={{
          margin: "auto",
          width: {
            lg: "35%",
            sm: "70%",
          },
        }}
         count={Math.ceil(adminPollData.length / itemsPerPage)}
         page={currentPage}
         onChange={handlePageChange}
         color="primary" />
      </Box>
      <ToastContainer />
      <DeleteModal open={open} deleteId={deleteId} handleClose={handleClose} />
      <EditModal
        editOpen={editOpen}
        handleEditClose={handleEditClose}
        editId={editId}
        title={title}
      />
      <AddOptionModal
        handleAddOptionClose={handleAddOptionClose}
        addOptionOpen={addOptionOpen}
        addOptionId={addOptionId}
      />
    </Box>
  );
}

export default AdminDashBoard;
