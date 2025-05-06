import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ictLogo from "../images/logo.jpg";

const Navbar2 = () => {
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
            Internship Portal -Mentor
          </Typography>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ color: "black" }}>
          <Button color="inherit" onClick={() => navigate("/mentordashboard")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/mentorprojects")}>
            Projects
          </Button>
          <Button color="inherit" onClick={() => navigate("/submissions")}>
            Submissions
          </Button>
          <Button color="inherit" onClick={() => navigate("/ref")}>
            Reference Material
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              sessionStorage.removeItem("token"); 
              sessionStorage.removeItem("mentorId"); 
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

export default Navbar2;
