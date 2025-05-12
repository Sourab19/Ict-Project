import React, { useEffect, useState } from "react";
import Navbar2 from "./Navbar2";
import {
  Button,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import img from "../images/img5.avif";

const Submissions = () => {
  const location = useLocation();
  const [projects, setProjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [flatSubmissions, setFlatSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editSubmission, setEditSubmission] = useState(null);

  const token = sessionStorage.getItem("token");
  const mentorId = sessionStorage.getItem("mentorId");

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/mentor/${mentorId}`,
        authHeader
      );
      setProjects(res.data.projects);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  };

  const fetchSubmissions = async (
    projectId = "",
    studentId = "",
    projectsList = projects
  ) => {
    try {
      const queryParams = new URLSearchParams();
      if (mentorId) queryParams.append("mentorId", mentorId);
      if (projectId) queryParams.append("projectId", projectId);

      const res = await axios.get(
        `http://localhost:3000/mentor/submission?${queryParams.toString()}`,
        authHeader
      );

      const studentMap = new Map();
      res.data.forEach((item) => {
        if (!studentMap.has(item.studentId)) {
          studentMap.set(item.studentId, item.studentName);
        }
      });

      const studentList = Array.from(studentMap.entries()).map(
        ([id, name]) => ({
          studentId: id,
          studentName: name,
        })
      );
      setStudents(studentList);

      const flattened = res.data.flatMap((submission) => {
        const project = projectsList.find(
          (p) => p._id === submission.projectId
        );
        if (!project) return [];

        return submission.submissions.map((weekData) => ({
          ...weekData,
          _id: weekData._id.toString(),
          studentName: submission.studentName,
          studentId: submission.studentId,
          projectId: submission.projectId,
          projectName: project.projectName,
          parentId: submission._id.toString(),
        }));
      });

      const finalData = studentId
        ? flattened.filter((item) => item.studentId === studentId)
        : flattened;

      setFlatSubmissions(finalData);
    } catch (err) {
      console.error("Failed to fetch submissions", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("Current submissions state:", {
      flatSubmissions,
      studentSubmissions: flatSubmissions.filter(
        (s) => s.studentId === selectedStudentId
      ),
    });
  }, [flatSubmissions, selectedStudentId]);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/mentor/${mentorId}`,
          authHeader
        );
        const fetchedProjects = res.data.projects;
        setProjects(fetchedProjects);

        // Get project ID from navigation state if available
        const initialProjectId = location.state?.selectedProjectId || "";
        setSelectedProjectId(initialProjectId);

        await fetchSubmissions(initialProjectId, "", fetchedProjects);
      } catch (err) {
        console.error("Init error", err);
      }
    };
    init();
  }, [location.state]);

  const handleProjectChange = (e) => {
    const value = e.target.value;
    setSelectedProjectId(value);
    fetchSubmissions(value, selectedStudentId, projects);
  };

  const handleStudentChange = (e) => {
    const value = e.target.value;
    setSelectedStudentId(value);
    fetchSubmissions(selectedProjectId, value, projects);
  };

  const handleEdit = (submission) => {
    setEditSubmission(submission);
  };

  const handleEditSave = async () => {
    const { studentId, _id, week, marks, comment, status } = editSubmission; // Changed from parentId to studentId
    try {
      await axios.put(
        `http://localhost:3000/mentor/submission/${studentId}/${_id}`,
        { week, marks, comment, status },
        authHeader
      );
      setEditSubmission(null);
      fetchSubmissions(selectedProjectId, selectedStudentId, projects);
    } catch (err) {
      console.error("Edit error", err);
      // Add error notification to user
    }
  };

  const handleDeleteWeek = async (studentId, submissionId) => {
    if (!window.confirm("Are you sure you want to delete this submission?"))
      return;

    try {
      // Find the full submission details
      const submissionToDelete = flatSubmissions.find(
        (s) =>
          s.studentId === studentId &&
          (s._id === submissionId || s._id?.$oid === submissionId)
      );

      if (!submissionToDelete) {
        alert("Submission not found in local data");
        return;
      }

      console.log("Attempting to delete:", {
        studentId,
        submissionId,
        projectId: submissionToDelete.projectId,
        parentId: submissionToDelete.parentId,
      });

      const response = await axios.delete(
        `http://localhost:3000/mentor/submission/${studentId}/${submissionId}`,
        authHeader
      );

      if (response.data.message.includes("deleted successfully")) {
        await fetchSubmissions(selectedProjectId, selectedStudentId, projects);
        alert("Submission deleted successfully");
      } else {
        alert("Delete operation completed but may not have worked as expected");
      }
    } catch (err) {
      console.error("Delete error:", {
        request: err.config,
        response: err.response?.data,
        message: err.message,
      });
      alert(err.response?.data?.error || "Failed to delete submission");
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Navbar2 />

      <Box sx={{ position: "relative", mt: 2 }}>
        <Box
          component="img"
          src={img}
          alt="Submissions Banner"
          sx={{
            width: { xs: "90%", sm: "80%" },
            height: { xs: "250px", sm: "500px" },
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            borderRadius: 4,
            marginLeft: "145px",
            transition: "transform 0.6s ease",
            animation: "zoomIn 1s ease",
            "&:hover": { transform: "scale(1.03)" },
            "@keyframes zoomIn": {
              "0%": { transform: "scale(0.95)", opacity: 0 },
              "100%": { transform: "scale(1)", opacity: 1 },
            },
          }}
        />
      </Box>

      <Box sx={{ mt: 4, ml: 4, display: "flex", gap: 4 }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Project</InputLabel>
          <Select value={selectedProjectId} onChange={handleProjectChange}>
            <MenuItem value="">All</MenuItem>
            {projects.map((p) => (
              <MenuItem key={p._id} value={p._id}>
                {p.projectName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Student</InputLabel>
          <Select value={selectedStudentId} onChange={handleStudentChange}>
            <MenuItem value="">All</MenuItem>
            {students.map((s) => (
              <MenuItem key={s.studentId} value={s.studentId}>
                {s.studentName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : flatSubmissions.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No submissions found.
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ mt: 4, mx: 4, borderRadius: 2 }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "grey" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Student
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Week
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Marks
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Comments
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Status
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Project Name
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flatSubmissions.map((s, index) => {
                const rowStyle = {
                  backgroundColor:
                    s.status === "completed"
                      ? "whitesmoke" // light red
                      : s.status === "pending"
                      ? "white" // light yellow
                      : "inherit",
                };

                return (
                  <TableRow key={index} sx={rowStyle}>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "grey",
                        backgroundColor: "whitesmoke",
                      }}
                    >
                      {s.studentName}
                    </TableCell>
                    <TableCell>{s.week}</TableCell>
                    <TableCell>{s.marks}</TableCell>
                    <TableCell>{s.comment}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          backgroundColor:
                            s.status.toLowerCase() === "completed"
                              ? "#c8e6c9"
                              : "#fff9c4",
                          px: 2,
                          py: 0.5,
                          borderRadius: 1,
                          display: "inline-block",
                          fontWeight: 500,
                        }}
                      >
                        {s.status}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 120, fontSize: "0.85rem" }}>
                      {s.projectName}
                    </TableCell>
                    <TableCell>
                      <Stack spacing={1} direction="column">
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleEdit(s)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() =>
                            handleDeleteWeek(s.studentId, s._id, s.projectId)
                          }
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={!!editSubmission} onClose={() => setEditSubmission(null)}>
        <DialogTitle>Edit Submission</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Marks"
            type="number"
            fullWidth
            value={editSubmission?.marks || ""}
            onChange={(e) =>
              setEditSubmission({ ...editSubmission, marks: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Comments"
            fullWidth
            multiline
            rows={4}
            value={editSubmission?.comment || ""}
            onChange={(e) =>
              setEditSubmission({ ...editSubmission, comment: e.target.value })
            }
          />
          <FormControl margin="dense" fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={editSubmission?.status || ""}
              onChange={(e) =>
                setEditSubmission({ ...editSubmission, status: e.target.value })
              }
              label="Status"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditSubmission(null)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Submissions;
