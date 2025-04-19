
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';

const MotionPaper = motion.create(Paper);



const MentorLogin = () => {
  const navigate = useNavigate();
  const [mentorData, setMentorData] = useState({ email: '', password: '' });

  function handleMentorLogin() {
    if (!mentorData.email || !mentorData.password) {
      alert("Please enter both email and password.");
      return;
    }
    axios.post('http://localhost:3000/mentor/login', mentorData)
      .then((res) => {
        alert(res.data.message);
        navigate('/mentordashboard');
      })
      .catch((err) => {
        if (err.response.data.message) {
          alert(err.response.data.message); 
        } else {
          alert('Mentor login failed');
        }
        console.error(err);
      });
  }
  

  return (
    <Box
        flex={1}
        sx={{
          backgroundColor: '#e0f7fa',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box textAlign="center">
          <Typography variant="h3" gutterBottom style={{marginBottom:'7%',fontFamily:'serif'}} color='darkblue'>
            Are  U  a Mentor?
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
              border: '2px solid rgb(12, 46, 214)',
              backgroundColor:'whitesmoke',
              transition: '0.3s ease',
            }}
          >
            <Typography variant="h5" align="center" color="blue" style={{fontFamily:'cursive'}} sx={{ mb: 2 }}>
              Mentor Login
            </Typography>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        onChange={(e) => setMentorData({ ...mentorData, email: e.target.value })}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        onChange={(e) => setMentorData({ ...mentorData, password: e.target.value })}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleMentorLogin}
      >
        Login
      </Button>
    </MotionPaper>
    </Box>
    </Box>
  );
};

export default MentorLogin;
