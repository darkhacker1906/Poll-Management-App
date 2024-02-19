import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Table from "../components/UserDetailsTable";

function UserDetails() {
  return (
    <>
      <Stack
      sx={{
        overflow : 'auto' ,
        background: 'linear-gradient(90.9deg, rgb(3, 195, 195) 0.3%, rgb(37, 84, 112) 87.8%)',
        width:"100%",
        height:"100vw"
      }}
      >
        <NavLink
          style={{ textDecoration: "none", color: "black" }}
          to={"/admin"}
        >
          <Typography
            sx={{ my: 2, color: "white", display: "block", paddingLeft: 3 ,
            fontWeight :'bold' ,
            fontSize : '19px'
             }}
          >
            {" "}
            Go Back{" "}
          </Typography>
        </NavLink>
        <Table />
      </Stack>
    </>
  );
}

export default UserDetails;
