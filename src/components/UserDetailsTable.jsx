import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userApi } from "../redux/slice/UserDetailsSlice";
import {
  Box,
  Card,
  Stack,
  Pagination,
  CircularProgress,
  Typography,
} from "@mui/material";

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [displayedPages] = useState(3);

  const userDetails = useSelector((state) => state.userDetails.data);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = userDetails?.data
    ? userDetails.data.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  useEffect(() => {
    userApi();
  }, []);

  const paginate = (e, value) => setCurrentPage(value);
  return (
    <>
      <Stack sx={{ width:{lg:"80%",md:"80%",xs:"100%"}, gap: 0, marginX: "auto", marginY:"0",overflowX:{lg:"hidden",md:"hidden",sm:"hidden",xs:"auto"}}}>
        <Box sx={{width:{lg:"100% "} , padding:{lg:3,md:2,sm:1} , margin:'auto'}}>
    
          <table style={{width:'100%',minWidth:"600px",overflowX:"auto"}}>
            <tr  style={{width:"100%"}}>
              <th style={{width:"40%"}}>
                <Card
                  sx={{
                    justifyContent: "center", 
                    padding: 2,
                    boxShadow: 4,
                    bgcolor: "#1282c570",
                    display: "flex",
                    color: "white",
                  }}
                  variant="outlined"
                >
                  Id
                </Card>
              </th>
              <th style={{width:"30%"}}>
                <Card
                  sx={{
                    padding: 2,
                    boxShadow: 2,
                    bgcolor: "#1282c570",
                    display: "flex",
                    justifyContent: "center",
                    color: "white",
                  }}
                  variant="outlined"
                >
                  User name
                </Card>
              </th>{" "}
              <th style={{width:"30%"}}>
                <Card
                  sx={{
                    padding: 2,
                    boxShadow: 2,
                    bgcolor: "#1282c570",
                    display: "flex",
                    justifyContent: "center",
                    color: "white",
                  }}
                  variant="outlined"
                >
                  Role
                </Card>
              </th>
            </tr>

            {currentItems.map((user) => (
              <tr key={user._id}>
                <td>
                  <Card
                    sx={{
                      padding: 2,
                      boxShadow: 2,
                      display: "flex",
                      justifyContent: "center",
                    }}
                    variant="outlined"
                  >
                    {user._id}
                  </Card>
                </td>
                <td>
                  <Card
                    sx={{
                      width: "100%",
                      padding: 2,
                      boxShadow: 2,
                      display: "flex",
                      justifyContent: "center",
                    }}
                    variant="outlined"
                  >
                    {user.username ? (
                      user.username
                    ) : (
                      <Typography sx={{ visibility: "hidden" }}>
                        No user
                      </Typography>
                    )}
                  </Card>
                </td>
                <td>
                  <Card
                    sx={{
                      // width: 350,
                      padding: 2,
                      boxShadow: 2,
                      display: "flex",
                      justifyContent: "center",
                    }}
                    variant="outlined"
                  >
                    {user.role ? (
                      user.role
                    ) : (
                      <Typography sx={{ visibility: "hidden" }}>
                        No user
                      </Typography>
                    )}
                  </Card>
                </td>
              </tr>
            ))}
          </table>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={Math.ceil((userDetails?.data?.length || 0) / itemsPerPage)}
            page={currentPage}
            onChange={paginate}
            color="primary"
          />
        </Box>
      </Stack>
    </>
  );
};

export default Table;
