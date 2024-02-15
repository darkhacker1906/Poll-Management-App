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

function AddPoll() {
  const initialValues={
    title:"",
    option1:"",
    option2:"",

  }
  const [rowData, setRowData] = useState([]);
  const addInputField = () => {
    const data = [...rowData, ""];
    setRowData(data);
  };
  const handleChange = (e, index) => {
    const newData = [...rowData];
    newData[index] = e.target.value;
    setRowData(newData);
  };
  return (
    <Box sx={{ backgroundImage: `url(${AddPollimg})` }}>
      <Stack width={"100vw"} height={"100vh"}>
        <Card
          sx={{ minWidth: 300, width: "35%", margin: "auto", borderRadius: 5 }}
        >
          <CardContent>
            <Stack direction={"column"} spacing={2}>
              <Typography sx={{ textAlign: "center" }} variant="h4">
                Add Poll
              </Typography>
              <TextField variant="outlined" label="Title" name="title"  fullWidth />
              <TextField variant="outlined" label="Option1" name="option1"fullWidth />
              <TextField variant="outlined" label="Option2" name="option2" fullWidth />
              {rowData.map((data, index) => (
                <TextField
                  key={index}
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  variant="outlined"
                  label={`Option ${index + 3}`}
                  fullWidth
                />
           ))}

              <Box>
                <Button
                  variant="contained"
                  sx={{ background: "#08879C" }}
                  onClick={addInputField}
                >
                  Add Option
                </Button>
              </Box>
              <Button variant="contained" sx={{ background: "#08879C" }}>
                Submit
              </Button>
              <Button variant="contained" sx={{ background: "#08879C" }}>
                Cancel
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default AddPoll;
