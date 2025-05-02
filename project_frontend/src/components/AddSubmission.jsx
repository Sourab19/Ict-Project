import React, { useEffect, useState } from "react";
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
import Navbar2 from "./Navbar2";
import img from "../images/img4.avif";
import logo from "../images/logo.jpg";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AddSubmission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingSubmission = location.state?.submission || null;

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [marks, setMarks] = useState("");
  const [comments, setComments] = useState("");
  const [availableProjects, setAvailableProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [mentor, setMentor] = useState(null);

  const mentorId = sessionStorage.getItem("mentorId");

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
    if (editingSubmission) {
      setName(editingSubmission.name || "");
      setStatus(editingSubmission.status || "");
      setMarks(editingSubmission.marks || "");
      setComments(editingSubmission.comments || "");
      if (editingSubmission.projects?.[0]?._id) {
        setSelectedProject(editingSubmission.projects[0]._id);
      }
    }
  }, [editingSubmission]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProject || !mentorId) {
      alert("Please select a project and ensure you're logged in.");
      return;
    }

    const payload = {
      name,
      status,
      marks,
      comments,
      projects: [selectedProject],
      mentorId,
    };

    try {
      if (editingSubmission) {
        await axios.put(
          `http://localhost:3000/mentor/submission/${editingSubmission._id}`,
          payload
        );
        alert("Submission updated successfully!");
      } else {
        await axios.post("http://localhost:3000/mentor/submission", payload);
        alert("Submission created successfully!");
      }
      navigate("/submissions");
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to submit. Please try again.");
    }
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
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

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
                {editingSubmission ? "Edit Submission" : "Add Submission"}
              </Typography>
            </Box>

            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              onSubmit={handleSubmit}
            >
              <FormControl fullWidth required>
                <InputLabel>Select Project</InputLabel>
                <Select
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
                fullWidth
                required
                value={name}
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
                type="number"
                fullWidth
                required
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
              />

              <TextField
                label="Comments"
                variant="outlined"
                multiline
                minRows={3}
                fullWidth
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 1,
                  backgroundColor: "#3f51b5",
                  textTransform: "none",
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: 1,
                  "&:hover": { backgroundColor: "#303f9f" },
                }}
              >
                {editingSubmission ? "Update" : "Submit"}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default AddSubmission;
