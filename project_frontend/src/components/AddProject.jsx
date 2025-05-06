import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import logo from "../images/logo.jpg";
import project from "../images/project.avif";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axiosInterceptor";
import Navbar from "./Navbar";

const AddProject = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const projectToEdit = location.state?.project;

  const [projectName, setProjectName] = useState(projectToEdit ? projectToEdit.projectName : "");
  const [projectDesc, setProjectDesc] = useState(projectToEdit ? projectToEdit.projectDescription : "");
  const [srsFile, setSrsFile] = useState(null);

  const isEditMode = Boolean(projectToEdit);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("projectName", projectName);
    formData.append("projectDescription", projectDesc);

    if (srsFile) {
      formData.append("srsFile", srsFile);
    }

    try {
      if (isEditMode) {
        await axiosInstance.put(`http://localhost:3000/project/edit/${projectToEdit._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Project updated successfully");
      } else {
        await axiosInstance.post(`http://localhost:3000/project`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Project added successfully");
      }

      navigate('/projects');
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  return (
    <>
    <Navbar />
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, minHeight: "100vh" }}>
      
      {/* Right - Image */}
      <Box sx={{ width: { xs: "100%", md: "50%" }, height: { xs: "300px", md: "100vh" }, overflow: "hidden" }}>
        <img src={project} alt="Project Illustration" style={{ marginTop: "60px", width: "100%", height: "90%", objectFit: "cover" }} />
      </Box>

      {/* Left - Form */}
      <Box sx={{ width: { xs: "100%", md: "50%" }, backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center", p: 4 }}>
        <Paper elevation={0} sx={{ width: "100%", maxWidth: 400, p: 3, textAlign: "center", boxShadow: "none" }}>
          
          <Box sx={{ mb: 2 }}>
            <img src={logo} alt="ICT Logo" style={{ width: "100px", marginBottom: 10 }} />
            <Typography variant="h4" sx={{ color: "text.secondary" }}>
              {isEditMode ? "Edit Project" : "Add Project"}
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            
            <TextField
              label="Project Name"
              variant="outlined"
              fullWidth
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />

            <TextField
              label="Project Description"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={3}
              value={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
            />

            <Button variant="outlined" component="label" fullWidth>
              Upload SRS File
              <input type="file" hidden accept=".pdf,.doc,.docx" onChange={(e) => setSrsFile(e.target.files[0])} />
            </Button>

            {srsFile && (
              <Typography variant="body2" sx={{ textAlign: "left", mt: -1 }}>
                Selected: {srsFile.name}
              </Typography>
            )}

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
                "&:hover": { backgroundColor: "#303f9f" },
              }}
            >
              {isEditMode ? "Update" : "Submit"}
            </Button>

          </Box>

          <Typography variant="caption" display="block" sx={{ mt: 4, color: "text.secondary" }}>
            © 2025 Internship Portal by ICT
          </Typography>

        </Paper>
      </Box>

    </Box>
    </>
  );
};

export default AddProject;
