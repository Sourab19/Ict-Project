import React, { useEffect, useState } from "react";
import Navbar2 from "./Navbar2";
import {
  Button,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import img from "../images/img5.avif";
import axiosInstance from "../axiosInterceptor";

const Submissions = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(location.state?.selectedProjectId || "");

  const mentorId = sessionStorage.getItem("mentorId");

  const fetchProjects = async () => {
    try {
      const res = await axiosInstance.get(`http://localhost:3000/mentor/${mentorId}`);
      setProjects(res.data.projects); // Assigned projects only
    } catch (err) {
      console.error("Failed to fetch mentor's projects", err);
    }
  };

  const fetchSubmissions = async (projectId = "") => {
    try {
      if (!mentorId) {
        alert("Mentor not logged in.");
        return;
      }

      const url = projectId
        ? `http://localhost:3000/mentor/submission?mentorId=${mentorId}&projectId=${projectId}`
        : `http://localhost:3000/mentor/submission?mentorId=${mentorId}`;

      const res = await axiosInstance.get(url);
      setSubmissions(res.data);
    } catch (error) {
      console.error("Failed to fetch submissions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (mentorId) {
      fetchSubmissions(selectedProjectId);
    }
  }, [selectedProjectId]);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`http://localhost:3000/mentor/submission/${id}`);
      fetchSubmissions(selectedProjectId);
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const handleEdit = (submission) => {
    navigate("/addsubmission", { state: { submission } });
  };

  const handleProjectChange = (event) => {
    const projectId = event.target.value;
    setSelectedProjectId(projectId);
  };

  return (
    <>
      <Box
        sx={{
          backgroundImage:
            'url("https://img.freepik.com/premium-vector/abstract-white-modern-background-with-wavy-lines_745217-362.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          pb: 5,
        }}
      >
        <Navbar2 />

        {/* Image Banner */}
        <Box sx={{ position: "relative", mt: 2 }}>
          <Box
            component="img"
            src={img}
            alt="Submissions Banner"
            sx={{
              width: { xs: "100%", sm: "80%" },
              height: { xs: "250px", sm: "500px" },
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              borderRadius: 4,
              marginLeft: { xs: "auto", sm: "145px" },
              transition: "transform 0.6s ease",
              animation: "zoomIn 1s ease",
              "&:hover": { transform: "scale(1.03)" },
              "@keyframes zoomIn": {
                "0%": { transform: "scale(0.95)", opacity: 0 },
                "100%": { transform: "scale(1)", opacity: 1 },
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/addsubmission")}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              marginRight: "340px",
              textTransform: "none",
              fontWeight: "bold",
              color: "white",
              borderRadius: 2,
              boxShadow: 3,
              "&:hover": {
                backgroundColor: "#303f9f",
              },
            }}
          >
            Add Submission
          </Button>
        </Box>

        {/* Project Filter Dropdown */}
        <Box sx={{ mt: 4, width: "300px", ml: 4 }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Project</InputLabel>
            <Select
              value={selectedProjectId}
              onChange={handleProjectChange}
              label="Filter by Project"
            >
              <MenuItem value="">All</MenuItem>
              {projects.map((project) => (
                <MenuItem key={project._id} value={project._id}>
                  {project.projectName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Submission Table */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : submissions.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            No submissions found.
          </Typography>
        ) : (
          <TableContainer
            component={Paper}
            sx={{ mt: 4, borderRadius: 2, boxShadow: 3 }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: "grey" }}>
                <TableRow>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Marks
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Comments
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold", width: "180px" }}>
                    Projects
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission._id}>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "whitesmoke",
                        color: "black",
                      }}
                    >
                      {submission.name}
                    </TableCell>
                    <TableCell>{submission.marks}</TableCell>
                    <TableCell>{submission.comments}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          backgroundColor:
                            submission.status.toLowerCase() === "completed"
                              ? "#c8e6c9"
                              : "#fff9c4",
                          px: 2,
                          py: 0.5,
                          borderRadius: 1,
                          display: "inline-block",
                          fontWeight: 500,
                        }}
                      >
                        {submission.status}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ maxWidth: "180px", wordWrap: "break-word" }}>
                      {submission.projects?.map((p) => p.projectName).join(", ") || "N/A"}
                    </TableCell>
                    <TableCell>
                      <Stack spacing={1} direction="column">
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          onClick={() => handleEdit(submission)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(submission._id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
};

export default Submissions;
