import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Box,
  Avatar,
  Stack,
} from "@mui/material";
import { Email, Phone, Assignment } from "@mui/icons-material";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", number: "", projects: "" });
  const navigate = useNavigate();

  const fetchMentors = async () => {
    try {
      const res = await axios.get("http://localhost:3000/mentor");
      setMentors(res.data);
    } catch (err) {
      console.error("Error fetching mentors:", err);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/mentor/delete/${id}`);
      fetchMentors();
    } catch (err) {
      console.error("Error deleting mentor:", err);
    }
  };
  const handleEdit = (mentor) => {
    // Navigate to the AddMentor page with the mentor data as state
    navigate("/addmentor", { state: { mentor } });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/mentor/update/${editingId}`, {
        ...formData,
        projects: formData.projects.split(",").map((p) => ({
          projectName: p.trim(),
        })),
      });
      setEditingId(null);
      setFormData({ name: "", email: "", number: "", projects: "" });
      fetchMentors();
    } catch (err) {
      console.error("Error updating mentor:", err);
    }
  };
  

  return (
    <>
    <Navbar />
    <Box
    display="flex"
    flexDirection="column"
    minHeight="100vh"
    sx={{
      backgroundImage: "url('https://img.freepik.com/premium-vector/abstract-white-monochrome-vector-background-design-brochure-website-flyer-geometric-white-wallpaper-certificate-presentation-landing-page_249611-5964.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: 4,
    }}
  >
  <Box flex='1'>

      {/* Heading Banner */}
      <Box sx={{ position: "relative", mb: 4 }}>
      <motion.img
  src="https://infostride.com/wp-content/uploads/2023/07/cost-to-build-mvp.png?w=1024.jpg"
  alt="Mentors Banner"
  style={{
    width: "80%",
    borderRadius: 16,
    height: "450px",
    objectFit: "cover",
    marginLeft:'140px'
  }}
  initial={{ scale: 1 }}
  animate={{ scale: 1.05 }}
  transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
/>

        <Button
          variant="contained"
          sx={{
            position: "absolute",
            top: 20,
            right: 160,
            backgroundColor: "#673ab7",
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: 3,
            px: 3,
          }}
          onClick={() => navigate("/addmentor")}
        >
          + Add Mentor
        </Button>
      </Box>

      <Typography variant="h4" fontWeight="bold" gutterBottom style={{textAlign:'center'}} p={4}>
       MentorList
      </Typography>

      <Grid container spacing={3}>
        {mentors.map((mentor) => (
          <Grid item xs={12} md={6} lg={4} key={mentor._id}>
           <motion.div
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >

             <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",  // Align content vertically
                  alignItems: "center",
                  p: 2,
                  width:'450px',
                  borderRadius: 4,
                  boxShadow: 3,
                  backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/011/565/072/original/abstract-modern-white-and-gray-stripes-light-and-shade-pattern-background-and-texture-vector.jpg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "#fff", // Makes text visible over image
                  position: "relative",
                  overflow: "hidden",
                  marginLeft:'140px',
                  height:'380px'
                }}
              >

                <Avatar
                  alt={mentor.name}
                  src="https://clipground.com/images/admin-logo-3.png"
                  sx={{ width: 120, height: 120, mb: 3 }} 
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" color="black" fontWeight="bold" paddingBottom={2}>
                    {mentor.name}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Email fontSize="small" color="action" />
                    <Typography  color="black">{mentor.email}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Phone fontSize="small" color="action" />
                    <Typography  color="black">{mentor.number}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Assignment fontSize="small" color="action" />
                    <Typography  color="black">
                      {mentor.projects.map((p) => p.projectName).join(", ")}
                    </Typography>
                  </Stack>
                  <Box mt={1}>
                    <Button
                      variant="contained"
                      onClick={() => handleEdit(mentor)}
                      sx={{ mr: 1, borderRadius: 2 }}
                    >
                      ✏️ Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(mentor._id)}
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

      {editingId && (
        <Box mt={5} p={3} bgcolor="#fff" borderRadius={4} boxShadow={2}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            ✍️ Edit Mentor
          </Typography>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
          />
          <TextField
            label="Projects (comma separated)"
            fullWidth
            margin="normal"
            value={formData.projects}
            onChange={(e) => setFormData({ ...formData, projects: e.target.value })}
          />
          <Button variant="contained" onClick={handleUpdate} sx={{ mt: 2, borderRadius: 2 }}>
             Update
          </Button>
        </Box>
      )}
      </Box>
     
    </Box>
    </>
  );
};

export default Mentors;