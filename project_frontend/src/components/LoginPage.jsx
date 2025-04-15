
import React from 'react';
import { Box, Typography } from '@mui/material';
import MentorLogin from './MentorLogin';
import AdminLogin from './AdminLogin';

const LoginPage = () => {
  return (
    <Box display="flex" height="100vh">

          <MentorLogin />
          <AdminLogin />
    </Box>
  );
};

export default LoginPage;
