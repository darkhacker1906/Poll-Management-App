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

function AdminDashBoard() {
  const navigate = useNavigate();

  const [column1Data, setColumn1Data] = useState([]);
  const [column2Data, setColumn2Data] = useState([]);
  const handleLogout = () => {
    alert("Logging out");
    navigate("/");
    localStorage.clear();
  };
  const adminPollData = useSelector((state) => state.adminPoll.data);
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
            Admin dashboard
          </Typography>
          <NavLink
            to={"/admin/addpoll"}
            style={{ color: "white", textDecoration: "none" }}
          >
            {" "}
            Add poll
          </NavLink>
          <Button variant="contained" onClick={handleLogout}>
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
                      <MdDelete fontSize={25} />
                    </Box>

                    {user.options.map((e, index) => (
                      <Typography key={index}>{e.option}</Typography>
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
                    <MdDelete fontSize={25} />
                  </Box>
                  {user.options.map((e, index) => (
                    <Typography key={index}>{e.option}</Typography>
                  ))}
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}

export default AdminDashBoard;
