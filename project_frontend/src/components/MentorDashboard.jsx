import React, { useEffect, useState } from "react";
import Navbar2 from "./Navbar2";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { Container } from "react-bootstrap";
import home1 from "../images/home5.avif"; // Section 1
import home2 from "../images/home6.avif"; // Section 2
import home3 from "../images/home7.avif";

const MentorDashboard = () => {
  const [mentor, setMentor] = useState(null); // store mentor details
  const mentorId = sessionStorage.getItem("mentorId"); // get mentorId

  useEffect(() => {
    if (mentorId) {
      axios
        .get(`http://localhost:3000/mentor/${mentorId}`)
        .then((res) => {
          setMentor(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch mentor:", err);
          alert("Failed to load mentor data");
        });
    }
  }, [mentorId]);
  useEffect(() => {
    if (mentor) {
      console.log("Mentor fetched:", mentor);
      console.log("Mentor projects:", mentor.projects);
    }
  }, [mentor]);

  return (
    <>
      <Navbar2 />
      <Box
        sx={{
          backgroundColor: "white",
          color: "black",
          py: 6,
          height: { xs: "auto", sm: "900px", md: "600px" },
          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
        }}
      >
        <Container sx={{ py: 5 }}>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="center"
            gap={4}
          >
            {/* Image on Left */}
            <Box
              component="img"
              src={home1}
              alt="Mentor Welcome"
              sx={{
                width: { xs: "100%", md: "50%" },
                maxWidth: 500,
                borderRadius: 2,
                boxShadow: 3,
              }}
            />

            {/* Text on Right */}
            <Box flex={1}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                {mentor ? `Welcome ${mentor.name},` : "Loading..."}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
              >
                At ICTAK, we truly believe that mentors are the foundation of a
                successful internship experience. This platform is thoughtfully
                designed to make your mentorship journey smoother, more
                organized, and highly impactful.
                <br />
                <br />
                As a mentor, you are not just guiding projects; you are shaping
                the skills, confidence, and creativity of future professionals.
                Your role is vital in nurturing young talent, helping students
                bring their ideas to life, and providing them with the support
                and knowledge they need to succeed. With your guidance, students
                can transform their potential into real-world success.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Section 2: Project Management */}
      <Box
        sx={{
          backgroundColor: "#474b52",
          color: "white",
          py: 6,
          height:{ xs: "auto", sm: "900px", md: "600px" },
        }}
      >
        <Container sx={{ py: 5 }}>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="center"
            gap={4}
          >
            {/* Content on Left */}
            <Box flex={1}>
              <Typography variant="h3" gutterBottom fontWeight="bold">
                Why Your Role Matters
              </Typography>
              <Typography variant="h6">
                Mentors provide the bridge between academic knowledge and
                industry expectations. Through your insights and experience, you
                help students:
              </Typography>
              <ul style={{ fontSize: "20px" }}>
                <li>Build confidence</li>
                <li>Develop practical skills</li>
                <li>Foster a spirit of innovation</li>
                <li>Prepare for future career challenges</li>
              </ul>
            </Box>

            {/* Image on Right */}
            <Box
              component="img"
              src={home2}
              alt="Project Topic Management"
              sx={{
                width: { xs: "100%", md: "50%" },
                maxWidth: "500px",
                height: "auto", // Corrected from "heigth" to "height"
                borderRadius: 2,
                objectFit: "contain",
                boxShadow: 3,
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* Section 3: Mentor Management */}
      <Box
        sx={{
          backgroundColor: "white",
          color: "black",
          py: 6,
          height: { xs: "auto", sm: "900px", md: "600px" },
        }}
      >
        <Container sx={{ py: 5 }}>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="center"
            gap={4}
          >
            {/* Image on Left */}
            <Box
              component="img"
              src={home3}
              alt="Mentor Management"
              sx={{
                width: { xs: "100%", md: "50%" },
                maxWidth: "800px",
                height: "auto", // Ensures the image doesn't stretch vertically
                borderRadius: 2,
                objectFit: "contain",
                boxShadow: 3,
              }}
            />

            {/* Content on Right */}
            <Box flex={1}>
              <Typography variant="h3" gutterBottom fontWeight="bold">
                Capabilities of Mentors
              </Typography>
              <Typography variant="h6">
                As a mentor on the ICTAK Internship Portal, you have a
                centralized dashboard to manage all your assigned projects
                efficiently. You can review student submissions, provide marks,
                add comments, and make edits or deletions as needed. The portal
                allows you to track the evaluation status of each submission.
                Additionally, you can upload helpful reference materials to
                ensure students have access to the latest resources.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MentorDashboard;
