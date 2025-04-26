const express = require("express");
const router = express.Router();
const multer = require("multer");
const Project = require("../model/projectData");

// Storage config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`);
  },
});

const upload = multer({ storage });


router.post("/", upload.single("srsFile"), async (req, res) => {
  try {
    const { projectName, projectDescription } = req.body;

    const newProject = new Project({
      projectName,
      projectDescription,
      srsFile: req.file?.path || null,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
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
      updatedData.srsFile = req.file.path;
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
