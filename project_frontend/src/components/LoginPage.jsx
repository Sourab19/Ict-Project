
import React from 'react';
import { Box, Typography } from '@mui/material';
import MentorLogin from './MentorLogin';
import AdminLogin from './AdminLogin';

const LoginPage = () => {
  return (
    <Box display="flex" 
    flexDirection={{ xs: 'column', md: 'row' }}  // Stack vertically on mobile and row on larger screens
    height="100vh"
    >

          <MentorLogin />
          <AdminLogin />
    </Box>
  );
};

export default LoginPage;
