import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddPollimg from "../assets/images/AddPollimg.jpeg";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { dispatch } from "../redux/store/store";
import { useSelector } from "react-redux";
import { addPollApi, addPollResetReducer } from "../redux/slice/AddPollSlice";

function AddPoll() {
  const navigate=useNavigate();
  const initialValues={
    title:"",
    option1:"",
    option2:"",

  }
  // const [rowData, setRowData] = useState([]);
  // const addInputField = () => {
  //   const data = [...rowData, ""];
  //   setRowData(data);
  // };
  // const handleChange = (e, index) => {
  //   const newData = [...rowData];
  //   newData[index] = e.target.value;
  //   setRowData(newData);
  // };
  const {handleSubmit,resetForm,
    handleChange,
    values}=useFormik({
      initialValues:initialValues,
      onSubmit: (values) =>{
        dispatch(addPollApi(values));
        dispatch(addPollResetReducer());
        // navigate("/admin")
        resetForm();
      }
    })
  return (
    <Box sx={{ backgroundImage: `url(${AddPollimg})` }}>

      <Stack width={"100vw"} height={"100vh"}>
        <Card
          sx={{ minWidth: 300, width: "35%", margin: "auto", borderRadius: 5 }}
        >
          <CardContent>
          {/* <form onSubmit={handleSubmit}> */}
            <Stack direction={"column"} spacing={2} as="form" onSubmit={handleSubmit}>
              <Typography sx={{ textAlign: "center" }} variant="h4">
                Add Poll
              </Typography>
              <TextField variant="outlined" label="Title" name="title" value={values.name} onChange={handleChange} fullWidth />
              <TextField variant="outlined" label="Option1" name="option1" value={values.name} onChange={handleChange} fullWidth />
              <TextField variant="outlined" label="Option2" name="option2" value={values.name} onChange={handleChange} fullWidth />
              {/* {rowData.map((data, index) => (
                <TextField
                  key={index}
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  variant="outlined"
                  label={`Option ${index + 3}`}
                  fullWidth
                />
           ))} */}

              <Box>
                <Button
                  variant="contained"
                  sx={{ background: "#08879C" }}
                  // onClick={addInputField}
                >
                  Add Option
                </Button>
              </Box>
              <Button variant="contained" sx={{ background: "#08879C" }} type="submit" >
                Submit
              </Button>
              <Button variant="contained" sx={{ background: "#08879C" }}>
                Cancel
              </Button>
            </Stack>
            {/* </form> */}
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default AddPoll;
