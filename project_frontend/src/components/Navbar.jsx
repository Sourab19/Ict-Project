import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ictLogo from "../images/logo.jpg"; // Adjust path as needed

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo + Heading */}
        <Box display="flex" alignItems="center">
          <img
            src={ictLogo}
            alt="ICT Logo"
            style={{ width: 50, height: 50, marginRight: 10 }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold" }}
            color="black"
          >
            Internship Portal -Admin
          </Typography>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ color: "black" }}>
          <Button color="inherit" onClick={() => navigate("/admindashboard")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/projects")}>
            Projects
          </Button>
          <Button color="inherit" onClick={() => navigate("/mentors")}>
            Mentors
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              sessionStorage.removeItem("token"); 
              navigate("/");
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
