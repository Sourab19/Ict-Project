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
import React, { useEffect, useState } from "react";
import logo from "../images/logo.jpg";
import mentor from "../images/mentor.jpg"; // Make sure this image exists
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMentor = () => {
  // Temporary states for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState([]);
  const [availableProjects, setAvailableProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/project/unassigned"
        );
        setAvailableProjects(response.data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };

    fetchProjects();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const mentorData = {
      name,
      email,
      number: phone,
      password,
      projects, // contains project IDs
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/mentor/add",
        mentorData
      );
      console.log("Mentor added:", res.data);
      alert("Added Mentor successfully");
      navigate("/admindashboard");
    } catch (err) {
      console.error("Failed to add mentor", err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
      }}
    >
      {/* Left - Form */}
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
              Mentor SignUp
            </Typography>
          </Box>

          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            onSubmit={handleSubmit}
          >
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              fullWidth
              required
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              fullWidth
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Phone"
              variant="outlined"
              value={phone}
              fullWidth
              required
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              value={password}
              fullWidth
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControl fullWidth required>
              <InputLabel id="project-select-label">Select Projects</InputLabel>
              <Select
                labelId="project-select-label"
                id="project-select"
                multiple
                value={Array.isArray(projects) ? projects : []}
                onChange={(e) => {
                  const value = e.target.value;
                  // MUI sometimes sends a string (on autofill), so ensure array
                  setProjects(
                    typeof value === "string" ? value.split(",") : value
                  );
                }}
                renderValue={(selected) => {
                  return availableProjects
                    .filter((project) => selected.includes(project._id))
                    .map((project) => project.projectName)
                    .join(", ");
                }}
              >
                {availableProjects.map((project) => (
                  <MenuItem key={project._id} value={project._id}>
                    {project.projectName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                backgroundColor: "#3f51b5",
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "#303f9f",
                },
              }}
            >
              Submit
            </Button>
          </Box>

          <Typography
            variant="caption"
            display="block"
            sx={{ mt: 4, color: "text.secondary" }}
          >
            © 2025 Internship Portal by ICT
          </Typography>
        </Paper>
      </Box>

      {/* Right - Image */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          height: { xs: "300px", md: "100vh" },
          overflow: "hidden",
        }}
      >
        <img
          src={mentor}
          alt="Mentor Illustration"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
    </Box>
  );
};

export default AddMentor;
