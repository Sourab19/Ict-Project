const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const jwt =require('jsonwebtoken');
const mongoose = require("mongoose");

const mentorModel = require("../model/mentorData");
const Project = require("../model/projectData");
const submissionData = require("../model/submissionData");
const getDummySubmissions = require("../data/dummySubmissions");


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
router.get("/submission", verifytoken, async (req, res) => {
  try {
    const { projectId } = req.query;

    let query = {};
    if (projectId) {
      query.projectId = projectId;
    }

    let submissions = await submissionData.find(query);

    if (submissions.length === 0) {
      const dummy = getDummySubmissions(projectId || "P101");
      await submissionData.insertMany(dummy);
      submissions = await submissionData.find(query);
    }

    res.json(submissions);
  } catch (err) {
    console.error("Error fetching/inserting submissions:", err);
    res.status(500).json({ error: "Failed to fetch or insert submissions" });
  }
});


// Route: POST /mentor/submission
// Add a new submission for a mentor
// 🔐 PUT: Update a specific week submission for a student

router.put("/submission/:studentId/:submissionId", verifytoken, async (req, res) => {
  try {
    const { studentId, submissionId } = req.params;
    const { week, marks, comment, status } = req.body;

    // Add validation
    if (!mongoose.Types.ObjectId.isValid(submissionId)) {
      return res.status(400).json({ error: "Invalid submission ID" });
    }

    const updated = await submissionData.findOneAndUpdate(
      { studentId, "submissions._id": new mongoose.Types.ObjectId(submissionId) },
      {
        $set: {
          "submissions.$.week": week,
          "submissions.$.marks": marks,
          "submissions.$.comment": comment,
          "submissions.$.status": status,
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update submission" });
  }
});

// DELETE: Delete full student submission record
// DELETE: Remove one week's submission from a student


router.delete("/submission/:studentId/:submissionId", verifytoken, async (req, res) => {
  try {
    const { studentId, submissionId } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(submissionId)) {
      return res.status(400).json({ error: "Invalid submission ID format" });
    }

    const submissionObjectId = new mongoose.Types.ObjectId(submissionId);

    // Find the document that contains this specific submission
    const studentDoc = await submissionData.findOne({
      studentId,
      "submissions._id": submissionObjectId
    });

    if (!studentDoc) {
      return res.status(404).json({ 
        message: "Submission not found for this student",
        suggestion: "There may be multiple documents for this studentId"
      });
    }

    // Perform the deletion
    const result = await submissionData.updateOne(
      { _id: studentDoc._id }, // Be specific - use the parent document's _id
      { $pull: { submissions: { _id: submissionObjectId } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "No documents modified" });
    }

    res.status(200).json({ 
      message: "Submission deleted successfully",
      parentDocumentId: studentDoc._id,
      deletedSubmissionId: submissionId
    });

  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ 
      error: "Failed to delete submission",
      details: err.message 
    });
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

