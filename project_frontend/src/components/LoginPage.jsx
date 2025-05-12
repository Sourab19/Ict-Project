import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Container,
} from "@mui/material";

import logo from "../images/logo.jpg";
import img from "../images/img.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    const loginData = { email, password };

    axios
      .post("https://ict-project-beta.vercel.app/mentor/login", loginData)
      .then((res) => {
        alert(res.data.message);
        const { role, mentorId, token } = res.data;
        if (token) {
          sessionStorage.setItem("token", token);
        }

        if (role === "admin") {
          navigate("/admindashboard");
        } else if (role === "mentor") {
          if (mentorId) {
            sessionStorage.setItem("mentorId", mentorId); // **SAVE mentorId in sessionStorage**
            navigate("/mentordashboard");
          } else {
            alert("Mentor ID missing. Please contact admin.");
          }
        }
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          alert(err.response.data.message);
        } else {
          alert("Login failed");
        }
        console.error(err);
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Left Design Section */}
      <Box
        sx={{
          width: { xs: "100%", md: "70%" },
          height: { xs: 250, md: "auto" }, // Give height on mobile
          backgroundColor: "#0081A0",
          backgroundImage: ` url(${img})`,
          backgroundSize: "contain", // Shrinks the image to fit inside box
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          p: 4,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "white",
            fontFamily: "Times New Roman, serif",
            marginTop: "60%",
            textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.6rem" },
            display: {
              xs: "none",
              sm: "none",
              md: "block",
            },
          }}
        >
          Build Your Future with ICT Academy
        </Typography>
      </Box>

      {/* Right Login Section */}
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
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
              style={{ width: "150px", marginBottom: 10 }}
            />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Sign in to continue to ICT Internship portal.
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {/* <FormControl fullWidth required>
              <InputLabel>Select User</InputLabel>
              <Select
                value={role}
                label="Select User"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="mentor">Mentor</MenuItem>
              </Select>
            </FormControl> */}

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              onChange={(e) => setPassword(e.target.value)}
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
    </Box>
  );
};

export default LoginPage;
