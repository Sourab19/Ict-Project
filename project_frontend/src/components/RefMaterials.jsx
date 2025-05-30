import React, { useEffect, useState } from "react";
import Navbar2 from "./Navbar2";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import img from "../images/img7.avif";
import axiosInstance from "../axiosInterceptor";

const ProjectCard = ({ project }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState(project.srsFile || []); // updated local state

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setUploading(true);

    const formData = new FormData();
    formData.append("srsFile", file);

    try {
      const response = await axiosInstance.post(
        `/project/upload/${project._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("File uploaded successfully:", response.data);
      setFile(null);

      // ✅ Update files state with newly uploaded file URL
      const uploadedFileUrl = response.data.fileUrl; // adjust this if backend returns a different key
      setFiles((prev) => [...prev, uploadedFileUrl]);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed.");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleDeleteFile = async (projectId, fileUrl) => {
    try {
      await axiosInstance.delete(`/project/${projectId}/file`, {
        data: { fileUrl },
      });
      alert("File deleted successfully!");

      // ✅ Remove deleted file from state
      setFiles((prev) => prev.filter((url) => url !== fileUrl));
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file.");
    }
  };

  return (
    <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6">
          {project.projectName || "Untitled Project"}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Description: {project.projectDescription}
        </Typography>

        <Typography sx={{ mt: 2 }} variant="subtitle1">
          Files:
        </Typography>
        <List dense>
          {Array.isArray(files) && files.length > 0 ? (
            files.map((url, index) => (
              <ListItem key={index}>
                <InsertDriveFileIcon sx={{ mr: 1 }} />
                <ListItemText
                  primary={
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      File {index + 1}
                    </a>
                  }
                />
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  sx={{ ml: 2 }}
                  onClick={() => handleDeleteFile(project._id, url)}
                >
                  <DeleteIcon fontSize="small" />
                </Button>
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              No files uploaded yet.
            </Typography>
          )}
        </List>
      </CardContent>
      <CardActions>
        <Button
          component="label"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Add File"
          )}
          <input
            type="file"
            hidden
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </Button>
        {file && (
          <>
            <Typography sx={{ ml: 2 }}>{file.name}</Typography>
            <Button
              onClick={handleUpload}
              variant="outlined"
              disabled={loading || uploading}
              sx={{ ml: 2 }}
            >
              Upload
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

const RefMaterials = () => {
  const [mentor, setMentor] = useState(null);
  const mentorId = sessionStorage.getItem("mentorId");

  useEffect(() => {
    if (mentorId) {
      axiosInstance
        .get(`https://ict-project-beta.vercel.app/mentor/${mentorId}`)
        .then((res) => {
          setMentor(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch mentor:", err);
          alert("Failed to load mentor data");
        });
    }
  }, [mentorId]);

  return (
    <div>
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
            marginBottom: "40px",
            transition: "transform 0.6s ease",
            animation: "zoomIn 1s ease",
            "&:hover": { transform: "scale(1.03)" },
            "@keyframes zoomIn": {
              "0%": { transform: "scale(0.95)", opacity: 0 },
              "100%": { transform: "scale(1)", opacity: 1 },
            },
          }}
        />

        <Box sx={{ px: 4 }}>
          <Typography variant="h5" gutterBottom>
            Mentor Projects
          </Typography>

          {mentor?.projects?.length > 0 ? (
            mentor.projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))
          ) : (
            <Typography>No projects found for this mentor.</Typography>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default RefMaterials;
