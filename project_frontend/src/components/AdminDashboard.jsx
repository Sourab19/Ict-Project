import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [mentors, setMentors] = React.useState([]);
  const navigate=useNavigate();

  const handleLogout = () => {
    // Add logout functionality
    console.log('Logging out...');
    navigate('/');

  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar Drawer (Always visible) */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: 'purple',
            color: 'white',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* Profile Icon */}
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <IconButton sx={{ color: 'white' }}>
            <AccountCircleIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Box>
        
        <Divider />

        {/* Sidebar Menu Items */}
        <List>
          <ListItem button component={Link} to="/projects">
            <ListItemText primary="Projects" sx={{ color: 'white' }} />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/mentors">
            <ListItemText primary="Mentors" sx={{ color: 'white' }} />
          </ListItem>
          <Divider />
        </List>
      </Drawer>

      {/* Content Area */}
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginTop: '64px', width: '100%' }}>
        {/* AppBar (Navbar) */}
        <AppBar position="fixed" sx={{ backgroundColor: 'purple' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              ADMIN DASHBOARD
            </Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>

        {/* Mentor List Table */}
        <Box sx={{ marginTop: '64px' }}>
          <Typography variant="h5" gutterBottom>Mentor List</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Mentor Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Phone</strong></TableCell>
                  <TableCell><strong>Project Name</strong></TableCell>
                  <TableCell><strong>Batch</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Rows will be dynamically added when data is fetched */}
                {/* Example row: */}
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>johndoe@example.com</TableCell>
                  <TableCell>(123) 456-7890</TableCell>
                  <TableCell>Web Development</TableCell>
                  <TableCell>Batch A</TableCell>

                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
