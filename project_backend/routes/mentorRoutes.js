const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const jwt =require('jsonwebtoken');
const mongoose = require("mongoose");

const mentorModel = require("../model/mentorData");
const Project = require("../model/projectData");
const submissionData = require("../model/submissionData");

function verifytoken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Unauthorized access: No token provided");
  }

  const token = authHeader.split(" ")[1]; 

  try {
    const payload = jwt.verify(token, "ict");
    if (!payload) throw "Unauthorized access";
    req.user = payload; 
    next();
  } catch (error) {
    return res.status(403).send("Unauthorized access: Invalid token");
  }
}

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the mentor by email 
    const mentor = await mentorModel.findOne({ email });

    if (!mentor) {
      return res.status(404).send({ message: "Invalid email" });
    }

    // Check if the password matches
    if (mentor.password !== password) {
      return res.status(404).send({ message: "Invalid password" });
    }

    // Send the role along with the login success message
    const payload = { email: mentor.email, password: mentor.password }; // optional: don't include password in production
    const token = jwt.sign(payload, "ict"); 

    return res.status(200).send({
      message: `${mentor.role.charAt(0).toUpperCase() + mentor.role.slice(1)} Login Successful`,
      role: mentor.role, // Send the role in the response
      mentorId: mentor._id,
      token,
    });
  } catch (error) {
    res.status(500).send({ message: "Error" });
  }
});

// Route: GET /mentor/submissions?mentorId=xyz
// Fetch submissions of the logged-in mentor
// Route: GET /mentor/submission?mentorId=xyz
router.get("/submission", verifytoken , async (req, res) => {
  try {
    const { mentorId, projectId } = req.query;
    if (!mentorId) return res.status(400).send({ message: "mentorId is required" });

    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
      return res.status(400).send({ message: "Invalid mentorId" });
    }

    const mentorObjectId = new mongoose.Types.ObjectId(mentorId);
    let query = { mentor: mentorObjectId };

    if (projectId && mongoose.Types.ObjectId.isValid(projectId)) {
      query.projects = new mongoose.Types.ObjectId(projectId); // works even if it's an array
    }

    const submissions = await submissionData
      .find(query)
      .populate("projects")
      .populate("mentor");

    if (submissions.length === 0) {
      return res.status(404).json({ message: "No submissions found for this mentor" });
    }

    res.json(submissions);
  } catch (err) {
    console.error("Error fetching submissions:", err);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});


// Route: POST /mentor/submission
// Add a new submission for a mentor
router.post("/submission", verifytoken , async (req, res) => {
  try {
    const { name, status, marks, comments, projects, mentorId } = req.body;


    const newSubmission = new submissionData({
      name,
      status,
      marks,
      comments,
      projects, // array of ObjectId
      mentor: new mongoose.Types.ObjectId(mentorId),
      // ✅ force ObjectId type
    });

    const saved = await newSubmission.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving submission:", err);
    res.status(500).json({ error: "Failed to save submission" });
  }
});

// Route: PUT /mentor/submission/:id
// Update a submission
router.put("/submission/:id",verifytoken , async (req, res) => {
  try {
    const updated = await submissionData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update submission" });
  }
});

// Route: DELETE /mentor/submission/:id
// Delete a submission
router.delete("/submission/:id",verifytoken , async (req, res) => {
  try {
    await submissionData.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Submission deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete submission" });
  }
});



// Route: POST /mentor/add
// Add a new mentor
router.post("/add",verifytoken , async (req, res) => {
  try {
    const { name, email, number, password, projects } = req.body;

    const newMentor = new mentorModel({
      name,
      email,
      number,
      password,
      projects,
      role: "mentor",
    });

    const savedMentor = await newMentor.save();
    res.status(201).json(savedMentor);
  } catch (error) {
    console.error("Error adding mentor:", error);
    res.status(500).json({ message: "Error adding mentor", error });
  }
});

// Route: GET /mentor/
// Get all mentors
router.get("/",verifytoken , async (req, res) => {
  try {
    const mentors = await mentorModel
      .find({ role: "mentor" })
      .populate("projects");
    res.status(200).json(mentors);
  } catch (error) {
    console.error("Error fetching mentors:", error);
    res.status(500).json({ message: "Error fetching mentors", error });
  }
});

// Route: PUT /mentor/update/:id
// Update mentor information
router.put("/update/:id",verifytoken , async (req, res) => {
  try {
    const existingMentor = await mentorModel.findById(req.params.id);
    if (!existingMentor) return res.status(404).json({ message: "Mentor not found" });

    const oldProjects = existingMentor.projects.map((p) => p.toString());
    const newProjects = req.body.projects;

    const removed = oldProjects.filter((id) => !newProjects.includes(id));
    const added = newProjects.filter((id) => !oldProjects.includes(id));

    await Project.updateMany(
      { _id: { $in: removed } },
      { $set: { assigned: false } }
    );
    await Project.updateMany(
      { _id: { $in: added } },
      { $set: { assigned: true } }
    );

    const updatedMentor = await mentorModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedMentor);
  } catch (error) {
    console.error("Error updating mentor:", error);
    res.status(500).json({ message: "Failed to update mentor" });
  }
});

// Route: DELETE /mentor/delete/:id
// Delete a mentor
router.delete("/delete/:id",verifytoken , async (req, res) => {
  try {
    const mentor = await mentorModel.findById(req.params.id);
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    await Project.updateMany(
      { _id: { $in: mentor.projects } },
      { $set: { assigned: false } }
    );

    await mentorModel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Mentor and project links removed" });
  } catch (error) {
    console.error("Error deleting mentor:", error);
    res.status(500).json({ message: "Failed to delete mentor" });
  }
});

// ... all the other routes above ...

// Route: PUT /mentor/update/:id
// Route: DELETE /mentor/delete/:id

// 🔻 MOVE THIS TO THE VERY END
router.get("/:id",verifytoken , async (req, res) => {
  try {
    const mentorId = req.params.id;
    const mentor = await mentorModel.findById(mentorId).populate("projects");

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    res.json(mentor);
  } catch (error) {
    console.error("Error fetching mentor:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

