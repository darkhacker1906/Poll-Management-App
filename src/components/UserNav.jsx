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

function UserNav() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const navigate=useNavigate();
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    alert("Logging out");
    navigate("/");
    localStorage.clear();
  };
  return (
    <AppBar position="static" sx={{background:"#2E9FBB"}}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters >
          <Typography
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: {lg:"700", md:"600",sm:"600"},
              letterSpacing: {lg:".3rem",md:".2rem",sm:".1rem"},
              fontSize:{lg:30,md:26,sm:23,xs:20},
              color: 'inherit',
              textDecoration: 'none',
              textAlign:"center",
              width:"68%",
             textAlign:{lg:"right", md:"right",sm:"left",xs:"left"},
              display:"block"
            }}
          >
            User Dashboard
          </Typography>
          <Box sx={{ flexGrow: 0 ,width:{lg:"38%",sm:"38%",xs:"30%"},display:"flex",justifyContent:"flex-end",pr:{lg:1,md:1,sm:1,xs:2}}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default UserNav;