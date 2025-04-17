import React from 'react';
import {
  AppBar, Box, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText,
  Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';

const MentorDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const handleViewClick = () => {
    navigate('/submissions');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: 'black',
            color: 'white',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <IconButton sx={{ color: 'white' }}>
            <AccountCircleIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Box>

        <Divider />

        <List>
          <ListItem button component={Link} to="/ref">
            <ListItemText primary="Reference Materials" sx={{ color: 'white' }} />
          </ListItem>
        </List>
      </Drawer>

      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginTop: '64px', width: '100%' }}>
        <AppBar position="fixed" sx={{ backgroundColor: 'black' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              MENTOR DASHBOARD
            </Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>

        <Box sx={{ marginTop: '64px' }}>
          <Typography variant="h5" gutterBottom>Projects List</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Project Name</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>E-commerce website</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={handleViewClick}
                    >
                      View Submissions
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default MentorDashboard;
