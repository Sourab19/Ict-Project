import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';

const MotionPaper = motion.create(Paper);


const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({ email: '', password: '' });

  function handleAdminLogin() {
    axios.post('http://localhost:3000/admin/login', adminData)
      .then((res) => {
        alert(res.data.message);
        navigate('/admindashboard');
      })
      .catch((err) => {
        console.error(err);
        alert('Admin login failed');
      });
  }
  

  return (
    <Box
      flex={1}
      sx={{
        backgroundColor: '#fce4ec',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box textAlign="center">
        <Typography
          variant="h3"
          gutterBottom
          style={{ marginBottom: '7%', fontFamily: 'serif' }}
          color="darkblue"
        >
          Are U an AdMiN?
        </Typography>

        <MotionPaper
          elevation={3}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{
            scale: 1.04,
            boxShadow: '0px 10px 30px rgba(0,0,0,0.2)',
          }}
          sx={{
            p: 4,
            width: { xs: '80%', sm: '60%', md: '100%' },
            maxWidth: 400,
            border: '2px solid rgb(184, 12, 214)',
            backgroundColor:'ButtonHighlight', // light purple
            transition: '0.3s ease',
          }}
        >
          <Typography variant="h5" align="center" color="purple" style={{fontFamily:'cursive'}} sx={{ mb: 2 }}>
            Admin Login
          </Typography>

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
          />

          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleAdminLogin}
          >
            Login
          </Button>
        </MotionPaper>
      </Box>
    </Box>
  );
};

export default AdminLogin;

