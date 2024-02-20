import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const navigate=useNavigate();
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleAddPoll=()=>{
    navigate("/admin/addpoll")
  }
  const handleUserDetails=()=>{
    navigate("/admin/userdetails")
  }
  const handleLogout = () => {
    alert("Logging out");
    navigate("/");
    localStorage.clear();
  };
  return (
    <AppBar position="static" sx={{background:"#158594"}}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters >
          <Typography
            // noWrap
            // component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              fontSize:30,
              color: 'inherit',
              textDecoration: 'none',
              textAlign:"center",
              width:"60%",
              justifyContent:"flex-end"
            }}
          >
            Admin Dashboard
          </Typography>

          <Box sx={{ flexGrow: 0 ,width:"38%",display:"flex",justifyContent:"flex-end",pr:3}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                <MenuIcon sx={{mt:0}}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleAddPoll}>Add Poll</MenuItem>
              <MenuItem onClick={handleUserDetails}>User Details</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;