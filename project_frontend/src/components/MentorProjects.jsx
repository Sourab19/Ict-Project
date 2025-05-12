import React, { useEffect, useState } from "react";
import Navbar2 from "./Navbar2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import img from "../images/img6.avif";
import axiosInstance from "../axiosInterceptor";

const MentorProjects = () => {
  const navigate = useNavigate();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submissionsByProject, setSubmissionsByProject] = useState({});
  const mentorId = sessionStorage.getItem("mentorId");

  useEffect(() => {
    if (mentorId) {
      axiosInstance
        .get(`https://ict-project-hazel.vercel.app/mentor/${mentorId}`)
        .then(async (res) => {
          const mentorData = res.data;
          setMentor(mentorData);

          const submissionsMap = {};
          for (const project of mentorData.projects) {
            try {
              const subRes = await axiosInstance.get(
                `https://ict-project-hazel.vercel.app/submissions/byProject/${project._id}`
              );
              submissionsMap[project._id] = subRes.data;
            } catch (err) {
              console.error(`Failed to fetch submissions for ${project._id}`);
              submissionsMap[project._id] = [];
            }
          }

          setSubmissionsByProject(submissionsMap);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch mentor:", err);
          alert("Failed to load mentor data");
          setLoading(false);
        });
    } else {
      alert("Mentor not logged in");
      navigate("/login");
    }
  }, [mentorId, navigate]);

  // ✅ Add this function to navigate to submission page with project ID
  const handleSubmitClick = (projectId) => {
    navigate("/submissions", { state: { selectedProjectId: projectId } });
  };

  return (
    <>
      <Navbar2 />
      <Box className="container mt-4">
        <Box
          sx={{
            width: "100%",
            mb: 4,
            borderRadius: 2,
            overflow: "hidden",
          }}
        ></Box>
        <Box
                    component="img"
                    src={img}
                    alt="Submissions Banner"
                    sx={{
                      width: { xs: "100%", sm: "90%" },
                      height: { xs: "250px", sm: "500px" },
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                      borderRadius: 4,
                      marginLeft: { xs: "auto", sm: "90px" },
                      marginBottom:"40px",
                      transition: "transform 0.6s ease",
                      animation: "zoomIn 1s ease",
                      "&:hover": { transform: "scale(1.03)" },
                      "@keyframes zoomIn": {
                        "0%": { transform: "scale(0.95)", opacity: 0 },
                        "100%": { transform: "scale(1)", opacity: 1 },
                      },
                    }}
                  />

        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#1565c0", fontWeight: "bold" }}
        >
          {mentor ? `Welcome, ${mentor.name} ` : "Loading..."}
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Allocated Projects
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress color="primary" />
          </Box>
        ) : mentor && mentor.projects && mentor.projects.length > 0 ? (
          <Paper elevation={4} sx={{ borderRadius: 2, padding: 2 }}>
            <List>
              {mentor.projects.map((project, index) => (
                <React.Fragment key={project._id}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#F8F8F8",
                        cursor: "pointer",
                        borderRadius: 1,
                      },
                      mb: 3,
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "#1976d2" }}>
                        <AssignmentIcon />
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {project.projectName}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ mb: 1 }}
                          >
                            {project.projectDescription ||
                              "No description available."}
                          </Typography>

                          <Box sx={{ mt: 2 }}>
                            <button
                              onClick={() => handleSubmitClick(project._id)}
                              style={{
                                backgroundColor: "#1976d2",
                                color: "#fff",
                                border: "none",
                                padding: "8px 16px",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                            >
                              View Submissions
                            </button>
                          </Box>
                        </>
                      }
                    />
                  </ListItem>

                  {index < mentor.projects.length - 1 && (
                    <Divider variant="fullWidth" sx={{ my: 1 }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        ) : (
          <Typography variant="body1" color="textSecondary">
            No projects assigned.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default MentorProjects;
