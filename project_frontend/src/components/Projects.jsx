import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Stack,
  Avatar,
} from "@mui/material";
import projectBanner from "../images/project.avif";
import { Description, Folder, InsertDriveFile } from "@mui/icons-material";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import axiosInstance from "../axiosInterceptor";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await axiosInstance.get("http://localhost:3000/project/get");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`http://localhost:3000/project/delete/${id}`);
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (project) => {
    navigate("/addproject", { state: { project } });
  };

  return (
    <>
      <Navbar />
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        sx={{
          backgroundImage:
            "url('https://img.freepik.com/premium-vector/abstract-white-monochrome-vector-background-design-brochure-website-flyer-geometric-white-wallpaper-certificate-presentation-landing-page_249611-5964.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: { xs: 2, sm: 4 },
          py: 4,
        }}
      >
        <Box flex="1">
          <Box
            sx={{
              position: "relative",
              mb: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <motion.img
              src={projectBanner}
              alt="Projects Banner"
              style={{
                width: "100%",
                maxWidth: "1000px",
                height: "500px",
                borderRadius: 16,
              }}
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
            <Button
              variant="contained"
              onClick={() => navigate("/addproject")}
              sx={{
                position: "absolute",
                top: 20,
                right: 160,
                backgroundColor: "#3f51b5",
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: 3,
                px: 3,
              }}
            >
              + Add Project
            </Button>
          </Box>

          <Typography variant="h4" fontWeight="bold" textAlign="center" p={4}>
            Project List
          </Typography>

          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid item xs={12} md={6} lg={4} key={project._id}>
                <motion.div
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Card
                    sx={{
                      marginLeft: "140px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 2,

                      width: { xs: "100%", sm: 350, md: 400, lg: 480 },
                      height: { xs: "auto", sm: 400, md: 450, lg: 500 },
                      borderRadius: 4,
                      boxShadow: 3,
                      backgroundImage:
                        "url('https://static.vecteezy.com/system/resources/previews/011/565/072/original/abstract-modern-white-and-gray-stripes-light-and-shade-pattern-background-and-texture-vector.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Avatar
                      alt={project.projectName}
                      src="https://cdn-icons-png.flaticon.com/512/889/889648.png"
                      sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <CardContent
                      sx={{
                        flex: 1,
                        overflowY: "auto",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        color="black"
                        fontWeight="bold"
                        pb={2}
                        textAlign="center"
                      >
                        {project.projectName}
                      </Typography>
                      <Stack direction="column" spacing={1} alignItems="center">
                        <Description fontSize="small" color="action" />
                        <Typography color="black" textAlign="center">
                          {project.projectDescription}
                        </Typography>
                      </Stack>
                      {project.srsFile && (
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          mt={1}
                        >
                          <InsertDriveFile fontSize="small" color="action" />
                          <Typography color="black">
                            <a
                              href={project.srsFile}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "blue",
                                textDecoration: "underline",
                              }}
                            >
                              View SRS
                            </a>
                          </Typography>
                        </Stack>
                      )}
                      <Box mt={2}>
                        <Button
                          variant="contained"
                          onClick={() => handleEdit(project)}
                          sx={{ mr: 1, borderRadius: 2 }}
                        >
                          ✏ Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(project._id)}
                          sx={{ borderRadius: 2 }}
                        >
                          🗑 Delete
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Projects;
