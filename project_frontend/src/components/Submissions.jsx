import React from "react";
import Navbar2 from "./Navbar2";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Submissions = () => {
  const navigate=useNavigate();
  const handlesubmit =()=>{
      navigate('/addsubmission');
  }
  return (
    <>
      <Navbar2 />
      
      <Button
        type="submit"
        variant="contained"
        color="inherit"
        
        sx={{
          mt: 1,
          backgroundColor: "#3f51b5",
          textTransform: "none",
          fontWeight: "bold",
          color: "white",
          borderRadius: 1,
          "&:hover": {
            backgroundColor: "#303f9f",
          },
        }}
        onClick={handlesubmit}
      >
        
        Add Submission
      </Button>
      <br />
      Submissions
    </>
  );
};

export default Submissions;
