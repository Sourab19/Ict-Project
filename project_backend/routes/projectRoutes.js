const express = require("express");
const router = express.Router();
const multer = require("multer");
const Project = require("../model/projectData");
const uploadToCloudinary = require('../utils/uploadToCloudinary');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



router.post("/", upload.single("srsFile"), async (req, res) => {
  try {
    const { projectName, projectDescription } = req.body;
    let uploadedFileUrl = null;

    if (req.file) {
      const cloudinaryResponse = await uploadToCloudinary(req.file.buffer);
      uploadedFileUrl = cloudinaryResponse.secure_url;
    }

    const newProject = new Project({
      projectName,
      projectDescription,
      srsFile: uploadedFileUrl,
    });

    await newProject.save();
    res.status(201).json(newProject);

  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ error: "Error creating project", details: err });
  }
});

router.get("/get", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
 } catch (err) {
   res.status(500).json({ error: "Failed to fetch projects" });
  } });



//    Get only unassigned projects
router.get("/unassigned", async (req, res) => {
  try {
    const unassigned = await Project.find({ assigned: false });
    res.json(unassigned);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch unassigned projects" });
  }
});

//    Convert unassigned projects from false to true 
router.patch("/update/:id", async (req, res) => {
  await Project.findByIdAndUpdate(req.params.id, { assigned: true });
  res.send("Updated");
});

router.put("/edit/:id", upload.single("srsFile"), async (req, res) => {
  try {
    const { projectName, projectDescription } = req.body;

    const updatedData = {
      projectName,
      projectDescription,
    };

    if (req.file) {
      const cloudinaryResponse = await uploadToCloudinary(req.file.buffer);
      updatedData.srsFile = cloudinaryResponse.secure_url;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(updatedProject);
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ error: "Failed to update project", details: err });
  }
});



router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete project", details: err });
  }
});



// // @route   PUT /api/projects/:id/assign
// // @desc    Mark a project as assigned
// router.put("/:id/assign", async (req, res) => {
//   try {
//     const updated = await Project.findByIdAndUpdate(
//       req.params.id,
//       { assigned: true },
//       { new: true }
//     );

//     if (!updated) return res.status(404).json({ error: "Project not found" });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to update project" });
//   }
// });

module.exports = router;
