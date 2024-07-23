import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import BusinessCenterSharpIcon from '@mui/icons-material/BusinessCenterSharp';
import { useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchUserData } from "./../helper/userAPI";
import { styled } from '@mui/material/styles';

// Define a custom styled button
const NavbarButton = styled(Button)(({ theme }) => ({
  color: 'white',
  textTransform: 'none',
  fontSize: '1rem',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: '#00d4ff',
    transform: 'scaleX(0)',
    transformOrigin: 'bottom left',
    transition: 'transform 0.3s ease',
    zIndex: 1,
  },
  '&:hover::after': {
    transform: 'scaleX(1)',
  },
  '&:hover': {
    color: 'white',
    '&::after': {
      backgroundColor: '#00d4ff',
    },
  },
}));

const settings = ["Profile", "Logout"];

function Navbar() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:830px)");

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  
  const baseUrl = "http://localhost:3000";

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUserData();
        setUser(userData);
        setImageUrl(userData.cloudinaryImageUrl);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  const pages = ["About Us", "Contact Us", "ArtworkMap"];
  if (user && user.role !== "user") {
    pages.push("Upload Artwork");
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${baseUrl}/api/v1/users/logout`, {
        headers: {
          'Access-Control-Allow-Origin': '*', 
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      navigate("/", { replace: true });
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response ? error.response.data.message : error.message
      );
    }
  };

  const handlePageClick = (page) => {
    if (page === "About Us") {
      navigate("/about");
    } else if (page === "Contact Us") {
      navigate("/contact");
    } else if (page === "Upload Artwork") {
      navigate("/upload");
    } else if (page === "ArtworkMap") {
      navigate("/artwork-map");
    }
  };

  const handleSettingClick = (setting) => {
    if (setting === "Logout") {
      handleLogout();
    } else if (setting === "Profile") {
      navigate("/profile");
    }
  };

  return (
    <AppBar
      position="static"
      style={{
        background: `linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%)`,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
        margin: 0,
        padding: 0,
      }}
      enableColorOnDark
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          style={{ width: "100%", justifyContent: "center" }}
        >
          {isMobile && (
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          )}
          {!isMobile && (
            <Link to="/home" style={{ textDecoration: "none" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src="/images/Logo.png"
                  alt="Art Map Logo"
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: "50%",
                    marginRight: 10,
                  }}
                />
                <Typography
                  variant="h5"
                  noWrap
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "#fefae0",
                    textAlign: "center",
                    margin: isMobile ? "auto" : "0",
                  }}
                >
                  Urban Artmap
                </Typography>
              </Box>
            </Link>
          )}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }}}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => handlePageClick(page)}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {!isMobile && (
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              {pages.map((page) => (
                <NavbarButton
                  key={page}
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </NavbarButton>
              ))}
            </Box>
          )}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Profile"
                  src={imageUrl || "/images/default.png"}
                  sx={{ margin: "auto" }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => handleSettingClick(setting)}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
