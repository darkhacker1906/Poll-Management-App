import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { userApi } from '../redux/slice/UserDetailsSlice';
import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Userdetail() {
  React.useEffect(() => {
    userApi();
  }, []);
  const id = localStorage.getItem("id");
  const userDetailsData = useSelector((state) => state.userDetails.data);
  if (!userDetailsData) {
    return <div>Loading...</div>;
  }
  const userDetails = userDetailsData.data || [];
  const filteredUserDetails = userDetails.filter((e) => e._id === id);
  const navigate=useNavigate();
  const handleClick=()=>{
    navigate("/user")
  }
 
  return (
    <Box sx={{ height: "100vh", width: "100vw", background: " #DFE2FF", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Button variant="contained" color="primary" sx={{ position: "absolute", top: "20px", left: "20px",background:"#7c85e8", "&:hover": {
                          background: "#535dd0",
                        }, }} onClick={handleClick}>Back</Button>
      {
         filteredUserDetails.length === 0 ?(<Box><CircularProgress/></Box>):<Box sx={{ minWidth: 275, width: "35%" }}>
        <Card variant="outlined" sx={{ borderRadius: "15px",background:"#cbcff5" }}>
          {
             filteredUserDetails.map((e) => (
              <CardContent>
                <Typography variant='h5' fontWeight={"bold"} mb={3} textAlign={"center"} gutterBottom>
                  User details
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between",mb:1 }}><Typography fontWeight={"bold"} fontSize={20}>UserId</Typography> <Typography> {e._id}</Typography></Box>
                <Box sx={{ display: "flex", justifyContent: "space-between",mb:1 }}><Typography fontWeight={"bold"} fontSize={20}>Username</Typography> <Typography> {e.username}</Typography></Box>
                <Box sx={{ display: "flex", justifyContent: "space-between",mb:1 }}><Typography fontWeight={"bold"} fontSize={20}>Role</Typography> <Typography> {e.role}</Typography></Box>
              </CardContent>
            ))
          }
        </Card>
      </Box>
      }
    </Box>
  );
}
