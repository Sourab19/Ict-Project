import React, { useEffect, useState } from "react";
import Navbar2 from "./Navbar2";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import axios from "axios";

const MentorProjects = () => {
  const navigate = useNavigate();
  const [mentor, setMentor] = useState(null); // store mentor details
  const mentorId = sessionStorage.getItem("mentorId"); // get mentorId

  useEffect(() => {
    if (mentorId) {
      axios
        .get(`http://localhost:3000/mentor/${mentorId}`)
        .then((res) => {
          setMentor(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch mentor:", err);
          alert("Failed to load mentor data");
        });
    }
  }, [mentorId]);
  useEffect(() => {
    if (mentor) {
      console.log("Mentor fetched:", mentor);
      console.log("Mentor projects:", mentor.projects);
    }
  }, [mentor]);

  return (
    <>
      <Navbar2 />
      <Typography variant="h5" gutterBottom>
        {mentor ? `Hi ${mentor.name}` : "Loading..."}
      </Typography>

      <h3>Allocated Projects:</h3>
      <ul>
        {mentor && mentor.projects && mentor.projects.length > 0 ? (
          mentor.projects.map((project) => (
            <p key={project._id}>{project.projectName}</p>
          ))
        ) : mentor && mentor.projects && mentor.projects.length === 0 ? (
          <p>No projects assigned</p>
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </>
  );
};

export default MentorProjects;
