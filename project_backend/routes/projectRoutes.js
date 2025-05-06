const express = require("express");
const router = express.Router();
const multer = require("multer");
const Project = require("../model/projectData");
const jwt=require('jsonwebtoken');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const uploadToCloudinary = require('../utils/uploadToCloudinary');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


function verifytoken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Unauthorized access: No token provided");
  }

  const token = authHeader.split(" ")[1]; // Remove 'Bearer'

  try {
    const payload = jwt.verify(token, "ict");
    if (!payload) throw "Unauthorized access";
    req.user = payload; // optional, attach user data
    next();
  } catch (error) {
    return res.status(403).send("Unauthorized access: Invalid token");
  }
}



router.post("/", verifytoken,upload.single("srsFile"), async (req, res) => {
  try {
    const { projectName, projectDescription } = req.body;
    let uploadedFileUrl = null;

    if (req.file) {
      const cloudinaryResponse = await uploadToCloudinary(req.file.buffer, req.file.originalname);

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

router.get("/get",verifytoken, async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
 } catch (err) {
   res.status(500).json({ error: "Failed to fetch projects" });
  } });



//    Get only unassigned projects
router.get("/unassigned", verifytoken,async (req, res) => {
  try {
    const unassigned = await Project.find({ assigned: false });
    res.json(unassigned);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch unassigned projects" });
  }
});

//    Convert unassigned projects from false to true 
router.patch("/update/:id",verifytoken, async (req, res) => {
  await Project.findByIdAndUpdate(req.params.id, { assigned: true });
  res.send("Updated");
});

router.put("/edit/:id", verifytoken, upload.single("srsFile"), async (req, res) => {
  try {
    const { projectName, projectDescription } = req.body;

    const updatedData = {
      projectName,
      projectDescription,
    };

    if (req.file) {
      const cloudinaryResponse = await uploadToCloudinary(req.file.buffer, req.file.originalname);
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


// upload files to a project
router.post("/upload/:projectId", verifytoken, upload.single("srsFile"), async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload to Cloudinary
    const cloudinaryResponse = await uploadToCloudinary(
      req.file.buffer,
      req.file.originalname
    );

    const uploadedFileUrl = cloudinaryResponse.secure_url;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $push: { srsFile: uploadedFileUrl } },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({
      message: "File uploaded successfully",
      fileUrl: uploadedFileUrl,
      project: updatedProject,
    });
  } catch (err) {
    console.error("Error uploading file to project:", err);
    res.status(500).json({ error: "Failed to upload file", details: err });
  }
});

// DELETE a file from a project
router.delete("/:projectId/file", verifytoken, async (req, res) => {
  try {
    const { projectId } = req.params;
    const { fileUrl } = req.body;

    if (!fileUrl) {
      return res.status(400).json({ error: "Missing file URL" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Ensure srsFile is an array
    if (!Array.isArray(project.srsFile)) {
      return res.status(400).json({ error: "srsFile is not an array" });
    }

    project.srsFile = project.srsFile.filter((url) => url !== fileUrl);
    await project.save();

    res.status(200).json({ message: "File deleted successfully", project });
  } catch (err) {
    console.error("Error deleting file:", err);
    res.status(500).json({ error: "Failed to delete file" });
  }
});




router.delete("/delete/:id", verifytoken,async (req, res) => {
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
