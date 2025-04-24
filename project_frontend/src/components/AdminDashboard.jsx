<<<<<<< HEAD
import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [mentors, setMentors] = React.useState([]);
  const navigate=useNavigate();

  const handleLogout = () => {
    // Add logout functionality
    console.log('Logging out...');
    navigate('/');

  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar Drawer (Always visible) */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: 'purple',
            color: 'white',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* Profile Icon */}
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <IconButton sx={{ color: 'white' }}>
            <AccountCircleIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Box>
        
        <Divider />

        {/* Sidebar Menu Items */}
        <List>
          <ListItem button component={Link} to="/projects">
            <ListItemText primary="Projects" sx={{ color: 'white' }} />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/mentors">
            <ListItemText primary="Mentors" sx={{ color: 'white' }} />
          </ListItem>
          <Divider />
        </List>
      </Drawer>

      {/* Content Area */}
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginTop: '64px', width: '100%' }}>
        {/* AppBar (Navbar) */}
        <AppBar position="fixed" sx={{ backgroundColor: 'purple' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              ADMIN DASHBOARD
            </Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>

        {/* Mentor List Table */}
        <Box sx={{ marginTop: '64px' }}>
          <Typography variant="h5" gutterBottom>Mentor List</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Mentor Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Phone</strong></TableCell>
                  <TableCell><strong>Project Name</strong></TableCell>
                  <TableCell><strong>Batch</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Rows will be dynamically added when data is fetched */}
                {/* Example row: */}
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>johndoe@example.com</TableCell>
                  <TableCell>(123) 456-7890</TableCell>
                  <TableCell>Web Development</TableCell>
                  <TableCell>Batch A</TableCell>

                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
=======
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import home1 from "../images/home1.webp"; // Section 1
import home2 from "../images/home2.webp"; // Section 2
import home3 from "../images/home3.webp"; // New image for Section 3

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };

  return (
    <>
      {/* Section 1: Welcome */}
      <Box sx={{ backgroundColor: "white", color: "black", py: 6, height: { xs: 'auto', sm: '900px', md: '800px' },fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }}}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <img
                src={home1}
                alt="Admin Dashboard Overview"
                style={{ width: '100%',  borderRadius: '12px', objectFit: 'contain' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom fontWeight="bold">
                Welcome to the Admin Dashboard
              </Typography>
              <Typography variant="h6">
              The Admin Dashboard is the central workspace for administrators
              after logging in. From here, you can manage key features such as
              mentors and project topics, ensuring the academic portal remains
              organized and up-to-date. Designed for ease of use and efficiency,
              the dashboard provides all necessary tools in one place. Whether
              you're updating information, reviewing data, or logging out
              securely, this dashboard makes the admin workflow straightforward
              and effective, helping maintain a seamless experience for students
              and faculty alike.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Section 2: Project Management */}
      <Box sx={{ backgroundColor: "#474b52", color: "white", py: 6, height: "800px" }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom fontWeight="bold">
                Project Topic Management
              </Typography>
              <Typography variant="h6">
              This allows administrators to manage the list of available project
            topics for students. You can easily add new topics, update existing
            ones, or remove those no longer needed. Keeping this list accurate
            is essential for guiding students toward meaningful academic work.
            By ensuring only relevant and approved topics appear in the student
            dashboard, you help maintain project quality and academic integrity.
            It’s a simple, flexible tool that supports ongoing curriculum
            updates and evolving departmental goals.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                src={home2}
                alt="Project Topic Management"
                style={{ width: '90%', maxWidth: '800px', heigth: '100px', borderRadius: '12px', objectFit: 'contain' }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Section 3: Mentor Management */}
      <Box sx={{ backgroundColor: "white", color: "black", py: 6, height: "900px" }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <img
                src={home3} // Replace with your third image path
                alt="Mentor Management"
                style={{ width: '90%', maxWidth: '800px', borderRadius: '12px', objectFit: 'contain' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom fontWeight="bold">
                Manage Mentors with Ease
              </Typography>
              <Typography variant="h6">
              Administrators are responsible for maintaining the mentor database.
            This feature allows you to add new mentors, update their contact
            details, and assign them to specific project topics. By keeping
            mentor information accurate and aligned with current projects, you
            help ensure students receive the guidance they need. The process is
            straightforward and efficient, supporting the dynamic nature of
            academic planning. With an organized mentor system, communication
            and project supervision become more structured, benefiting both
            students and faculty.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#474b52", color: "white", py: 3, textAlign: "center" }}>
        <Typography variant="body2">
          &copy; 2025 KTU Dashboard. All rights reserved.
        </Typography>
      </Box>
    </>
>>>>>>> b7b36e2e2b8513be62923a6c3cd40746d73c5cef
  );
};

export default AdminDashboard;
