import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userApi } from "../redux/slice/UserDetailsSlice";
import { Box, Card, Stack, Pagination, CircularProgress } from "@mui/material";

const Table = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [displayedPages] = useState(3);

const userDetails=useSelector((state)=>state.userDetails.data);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = userDetails?.data
    ? userDetails.data.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  useEffect(() => {
    setLoading(true);
    userApi()
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);
 
  const paginate = (e, value) => setCurrentPage(value);
  return (
    <>
      {loading ? (
        <Box display={"flex"} sx={{justifyContent:"center",alignItems:"center"}}><CircularProgress sx={{color:"#ffffff"}}/></Box>
      ) : (
        <Stack
          sx={{ width: { lg: "80%" }, gap: 0,  marginX: "auto",
          marginY: 0 }}
        >
          <div style={{ overflowX: "hidden" }}>
            <table>
              <tr>
                <th>
                  <Card
                    sx={{
                      justifyContent: "center",
                      width: 350,
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
                <th>
                  <Card
                    sx={{
                      width: 350,
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
                <th>
                  <Card
                    sx={{
                      width: 350,
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
                        width: 350,
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
                        width: 350,
                        padding: 2,
                        boxShadow: 2,
                        display: "flex",
                        justifyContent: "center",
                      }}
                      variant="outlined"
                    >
                      {user.username ? user.username:"No username"}
                    </Card>
                  </td>
                  <td>
                    <Card
                      sx={{
                        width: 350,
                        padding: 2,
                        boxShadow: 2,
                        display: "flex",
                        justifyContent: "center",
                      }}
                      variant="outlined"
                    >
                      {user.role ? user.role:"No role"}
                    </Card>
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={Math.ceil((userDetails?.data?.length || 0) / itemsPerPage)}
              page={currentPage}
              onChange={paginate}
              color="primary"
            />
          </Box>
        </Stack>
      )}
    </>
  );
};

export default Table;
