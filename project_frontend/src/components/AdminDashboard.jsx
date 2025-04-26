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
import AdminCarousel from "./AdminCarousel";
import Navbar from "./Navbar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };

  return (
    <>
    <Navbar />
    <AdminCarousel />
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


     
    </>

  );
};

export default AdminDashboard;
