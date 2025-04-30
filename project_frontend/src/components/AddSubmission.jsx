import React, { useEffect, useState } from "react";
import Navbar2 from "./Navbar2";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import img from "../images/mentor.jpg";
import logo from "../images/logo.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSubmission = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [marks, setMarks] = useState("");
  const [comments, setComments] = useState("");
  const [availableProjects, setAvailableProjects] = useState([]); // for list of options
  const [selectedProject, setSelectedProject] = useState("");
  const [mentor, setMentor] = useState(null); 

  const mentorId = sessionStorage.getItem("mentorId");
  const navigate =useNavigate();

  
  useEffect(() => {
    if (mentorId) {
      axios
        .get(`http://localhost:3000/mentor/${mentorId}`)
        .then((res) => {
          setMentor(res.data);
          setAvailableProjects(res.data.projects);
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

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const mentorId = sessionStorage.getItem("mentorId");
  
    // Basic validation
    if (!selectedProject || !mentorId) {
      alert("Please select a project and ensure you're logged in as a mentor.");
      return;
    }
  
    axios
      .post("http://localhost:3000/mentor/submission", {
        name,
        status,
        marks,
        comments,
        projects: [selectedProject], 
        mentorId,
      })
      .then((res) => {
        alert("Submission successful!");
        console.log("Submitted data:", res.data);
        navigate('/submissions')
        
      })
      .catch((err) => {
        console.error("Submission failed:", err);
        alert("Failed to submit. Please try again.");
      });
  };
  

  return (
    <>
      <Navbar2 />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: "100vh",
        }}
      >
        {/* left - Image */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            height: { xs: "300px", md: "100vh" },
            overflow: "hidden",
          }}
        >
          <img
            src={img}
            alt="Mentor Illustration"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        {/* Right - Form */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: 400,
              p: 3,
              textAlign: "center",
              boxShadow: "none",
            }}
          >
            <Box sx={{ mb: 2 }}>
              <img
                src={logo}
                alt="ICT Logo"
                style={{ width: "100px", marginBottom: 10 }}
              />
              <Typography variant="h4" sx={{ color: "text.secondary" }}>
                Add Submission
              </Typography>
            </Box>

            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              onSubmit={handleSubmit}
            >
              <FormControl fullWidth required>
                <InputLabel id="project-select-label">
                  Select Project
                </InputLabel>
                <Select
                  labelId="project-select-label"
                  id="project-select"
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                >
                  {availableProjects.map((project) => (
                    <MenuItem key={project._id} value={project._id}>
                      {project.projectName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Name"
                variant="outlined"
                value={name}
                fullWidth
                required
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                select
                label="Status"
                value={status}
                fullWidth
                required
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </TextField>

              <TextField
                label="Marks"
                variant="outlined"
                value={marks}
                fullWidth
                required
                type="number"
                onChange={(e) => setMarks(e.target.value)}
              />

              <TextField
                label="Comments"
                variant="outlined"
                value={comments}
                fullWidth
                multiline
                minRows={3}
                onChange={(e) => setComments(e.target.value)}
              />

              <Button
                type="submit"
                variant="contained"
                color="inherit"
                fullWidth
                sx={{
                  mt: 1,
                  backgroundColor: "#3f51b5",
                  textTransform: "none",
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "#303f9f",
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default AddSubmission;
