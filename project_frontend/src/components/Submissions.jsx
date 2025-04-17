import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';

const initialData = [
  {
    id: 1,
    projectName: "E-commerce website",
    batch: "Batch A",
    topic: "Web Development",
    status: "Pending",
    marks: "",
    comments: ""
  },
  {
    id: 2,
    projectName: "Chat App",
    batch: "Batch B",
    topic: "Mobile Apps",
    status: "Completed",
    marks: "90",
    comments: "Well done!"
  }
];

const Submissions = () => {
  const [submissions, setSubmissions] = useState(initialData);
  const [filterBatch, setFilterBatch] = useState("");
  const [filterTopic, setFilterTopic] = useState("");
  const navigate=useNavigate();

  const handleInputChange = (id, field, value) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id ? { ...sub, [field]: value } : sub
      )
    );
  };

  const handleDelete = (id) => {
    setSubmissions(prev => prev.filter(sub => sub.id !== id));
  };

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/');
  };

  const filteredSubmissions = submissions.filter(sub => {
    return (
      (!filterBatch || sub.batch === filterBatch) &&
      (!filterTopic || sub.topic === filterTopic)
    );
  });

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
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
     
        <Box sx={{ p: 7, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
        </Box>
        <Divider />
        <List>
        <ListItem button component={Link} to="/mentordashboard">
            <ListItemText primary="Home" sx={{ color: 'white' }} />
          </ListItem>
          <ListItem button component={Link} to="/ref">
            <ListItemText primary="Reference Materials" sx={{ color: 'white' }} />
          </ListItem>
        </List>
      </Drawer>

      {/* Main content */}
      <Box sx={{ flexGrow: 1, bgcolor: 'white', minHeight: '100vh' }}>
        {/* Top AppBar */}
        <AppBar position="fixed" sx={{ backgroundColor: 'black', zIndex: 1201 }}>
          <Toolbar>
          
            <AccountCircleIcon sx={{ fontSize: 40,paddingLeft:8,paddingTop:3 }} />
         
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              MENTOR DASHBOARD
            </Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>

        {/* Page content */}
        <Box sx={{ p: 4, marginTop: '64px' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Submissions
          </Typography>

          {/* Filters */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Batch</InputLabel>
              <Select
                value={filterBatch}
                onChange={(e) => setFilterBatch(e.target.value)}
                label="Batch"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Batch A">Batch A</MenuItem>
                <MenuItem value="Batch B">Batch B</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Topic</InputLabel>
              <Select
                value={filterTopic}
                onChange={(e) => setFilterTopic(e.target.value)}
                label="Topic"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Web Development">Web Development</MenuItem>
                <MenuItem value="Mobile Apps">Mobile Apps</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Table */}
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
            <Table>
              <TableHead sx={{ bgcolor: 'black' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}><strong>Project</strong></TableCell>
                  <TableCell sx={{ color: 'white' }}><strong>Batch</strong></TableCell>
                  <TableCell sx={{ color: 'white' }}><strong>Topic</strong></TableCell>
                  <TableCell sx={{ color: 'white' }}><strong>Status</strong></TableCell>
                  <TableCell sx={{ color: 'white' }}><strong>Marks</strong></TableCell>
                  <TableCell sx={{ color: 'white' }}><strong>Comments</strong></TableCell>
                  <TableCell sx={{ color: 'white' }}><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSubmissions.map(sub => (
                  <TableRow key={sub.id} hover sx={{ transition: '0.3s', '&:hover': { bgcolor: '#f0f0f0' } }}>
                    <TableCell>{sub.projectName}</TableCell>
                    <TableCell>{sub.batch}</TableCell>
                    <TableCell>{sub.topic}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'inline-block',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '10px',
                          bgcolor: sub.status === 'Completed' ? 'success.light' : 'warning.light',
                          color: sub.status === 'Completed' ? 'success.dark' : 'warning.dark',
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          textAlign: 'center'
                        }}
                      >
                        {sub.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={sub.marks}
                        onChange={(e) => handleInputChange(sub.id, "marks", e.target.value)}
                        size="small"
                        type="number"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={sub.comments}
                        onChange={(e) => handleInputChange(sub.id, "comments", e.target.value)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(sub.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => console.log('Marking as done')}
                        >
                          Done
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredSubmissions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No submissions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Submissions;
