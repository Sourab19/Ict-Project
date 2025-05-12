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

import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import axiosInstance from "../axiosInterceptor";

const AddMentor = () => {
  const location = useLocation();
  const mentorToEdit = location.state?.mentor; // Rename to avoid name conflict

  const [name, setName] = useState(mentorToEdit ? mentorToEdit.name : "");
  const [email, setEmail] = useState(mentorToEdit ? mentorToEdit.email : "");
  const [phone, setPhone] = useState(mentorToEdit ? mentorToEdit.number : "");
  const [password, setPassword] = useState(mentorToEdit ? mentorToEdit.password : ""); // Not pre-filled
  const [projects, setProjects] = useState(
    mentorToEdit ? mentorToEdit.projects.map((p) => p._id) : []
  );

  const [availableProjects, setAvailableProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosInstance.get("https://ict-project-beta.vercel.app/get");

        let allProjects = res.data;

        if (mentorToEdit) {
          const alreadyAssigned = mentorToEdit.projects;

          // Merge and remove duplicates based on _id
          const combined = [...res.data, ...alreadyAssigned];
          const uniqueProjects = Array.from(
            new Map(combined.map((p) => [p._id, p])).values()
          );

          allProjects = uniqueProjects;
        }

        setAvailableProjects(allProjects);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };

    fetchProjects();
  }, [mentorToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      number: phone,
      password,

      projects, // this should be array of _ids
    };

    try {
      if (mentorToEdit?._id) {
        await axiosInstance.put(
          `/mentor/update/${mentorToEdit._id}`,
          formData
        );
        alert("Mentor updated successfully");
      } else {
        await axiosInstance.post("/mentor/add", formData);
        alert("Added Mentor successfully");
      }

      navigate("/mentors");
    } catch (err) {
      console.error("Failed to add or update mentor", err);
    }
  };

  return (
    <>
    <Navbar />
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
              {mentorToEdit ? "Edit Mentor" : "Add Mentor"}
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
              required={!mentorToEdit} // Required only while adding
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <FormControl fullWidth required>
              <InputLabel id="project-select-label">Select Projects</InputLabel>
              <Select
                labelId="project-select-label"
                id="project-select"
                multiple
                value={projects}
                onChange={(e) => {
                  const value = e.target.value;
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
              {mentorToEdit ? "Update" : "Submit"}
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
    </>
  );
};

export default AddMentor;
