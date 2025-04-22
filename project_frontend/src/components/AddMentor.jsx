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
  import React, { useState } from "react";
  import logo from "../images/logo.jpg";
  import mentor from "../images/mentor.jpg"; // Make sure this image exists
  
  const AddMentor = () => {
    // Temporary states for form inputs
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [projects, setProjects] = useState("");
  
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
            >
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControl fullWidth required>
                <InputLabel>Select Projects</InputLabel>
                <Select
                  label="Select Projects"
                  onChange={(e) => setProjects(e.target.value)}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="mentor">Mentor</MenuItem>
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
  