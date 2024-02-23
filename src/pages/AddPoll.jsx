import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { dispatch } from "../redux/store/store";
import { useSelector } from "react-redux";
import { addPollApi, addPollResetReducer } from "../redux/slice/AddPollSlice";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

function AddPoll() {
  const navigate = useNavigate();
  const addPollslice = useSelector((state) => state.addPoll);
  const isLoading = addPollslice.loading;
  const initialValues = {
    title: "",
  };
  const [rowData, setRowData] = useState([]);
  const addInputField = () => {
    const data = [...rowData, ""];
    setRowData(data);
  };
  const handleRemoveOption = (index) => {
    const updatedData = [...rowData];
    updatedData.splice(index, 1);
    setRowData(updatedData);
  };
  const { handleSubmit, resetForm, handleChange, values,errors,touched,handleBlur} = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      try {
        if (values.title.trim() !== "") {
          if (values.option1.trim() !== "" && values.option2.trim() !== "") {
            await dispatch(addPollApi(values));
            setTimeout(() => {
              navigate("/admin");
            }, 200);
          } else {
            toast.warning("Please enter options", { autoClose: 1000 });
          }
        } else {
          dispatch(addPollResetReducer());
          toast.warning("Please enter title and options", { autoClose: 1000 });
          addPollResetReducer();
        }
      } catch (e) {
        console.log(e, "error");
      }
      resetForm();
    },
  });

  const handleCancel = () => {
    navigate("/admin");
  };
  useEffect(() => {
    if (addPollslice.isSuccess) {
      navigate("/admin");
    } else if (addPollslice.isError) {
      toast.error("Error occurred while adding poll.", { autoClose: 1500 });
    }
  }, [addPollslice.isSuccess, addPollslice.error]);
  return (
    <Box sx={{ background: "linear-gradient(80deg, #764BA2 ,#667EEA)" }} p={2}>
      <Stack minHeight={"100vh"} sx={{ overflowY: "auto" }}>
        <Card
          sx={{ minWidth: 300, width: "35%", margin: "auto", borderRadius: 5 }}
        >
          <CardContent>
            <Stack
              direction={"column"}
              spacing={2}
              as="form"
              onSubmit={handleSubmit}
            >
              <Typography sx={{ textAlign: "center" }} variant="h4">
                Add Poll
              </Typography>
              <Box>
                <TextField
                  variant="outlined"
                  label="Title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ width: "410px" }}
                />
              </Box>
              {errors.title && errors.touched  && (
                  <FormError error_msg={errors.title} />
                )}
              <Box>
                <TextField
                  variant="outlined"
                  label="Option1"
                  name="option1"
                  value={values.option1}
                  onChange={handleChange}
                  sx={{ width: "410px" }}
                />
              </Box>

              <Box>
                <TextField
                  variant="outlined"
                  label="Option2"
                  name="option2"
                  value={values.option2}
                  onChange={handleChange}
                  sx={{ width: "410px" }}
                />
              </Box>

              {rowData.map((data, index) => (
                <Box sx={{ display: "flex", width: "450px" }}>
                  <TextField
                    key={index}
                    onChange={handleChange}
                    variant="outlined"
                    value={values.name}
                    label={`Option${index + 3}`}
                    name={`option${index + 3}`}
                    fullWidth
                  />
                  <IconButton onClick={() => handleRemoveOption(index)}>
                    {" "}
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))}

              <Box>
                {rowData.length < 2 && (
                  <Button
                    variant="contained"
                    sx={{ background: "#08879C" }}
                    onClick={addInputField}
                  >
                    Add Option
                  </Button>
                )}
              </Box>

              {isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Button
                  variant="contained"
                  sx={{ background: "#08879C" }}
                  type="submit"
                >
                  Submit
                </Button>
              )}

              <Button
                variant="contained"
                sx={{ background: "#08879C" }}
                onClick={() => handleCancel()}
              >
                Cancel
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
      <ToastContainer />
    </Box>
  );
}

export default AddPoll;
