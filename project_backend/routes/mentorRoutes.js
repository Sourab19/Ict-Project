const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


const mentorModel = require("../model/mentorData");
const Project = require("../model/projectData"); 

// Login

router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;


    const mentor = await mentorModel.findOne({ email, role });


    if (!mentor) {
      return res.status(404).send({ message: `Invalid email or Invalid user role` });
    }

    if (mentor.password !== password) {
      return res.status(404).send({ message: 'Invalid password' });
    }

    if (role === 'admin') {
      return res.status(200).send({ message: 'Admin Login Successful' });
    } else if (role === 'mentor') {
      return res.status(200).send({ message: 'Mentor Login Successful' });
    } else {
      return res.status(400).send({ message: 'Invalid role' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error' });
  }

});

// Add mentor

router.post('/add', async (req, res) => {
  try {
    const { name, email, number, password, projects } = req.body;

    const newMentor = new mentorModel({
      name,
      email,
      number,
      password,
      projects,

      role: "mentor"

    });

    const savedMentor = await newMentor.save();
    res.status(201).json(savedMentor);
  } catch (error) {
    console.error("Error adding mentor:", error);
    res.status(500).json({ message: "Error adding mentor", error });
  }
});


// Get all mentors
router.get("/", async (req, res) => {
  try {
    const mentors = await mentorModel.find({ role: "mentor" }).populate("projects");
    res.status(200).json(mentors);
  } catch (error) {
    console.error("Error fetching mentors:", error);
    res.status(500).json({ message: "Error fetching mentors", error });
  }
});

// Update mentor
router.put("/update/:id", async (req, res) => {
  try {
    const existingMentor = await mentorModel.findById(req.params.id);
    if (!existingMentor) return res.status(404).json({ message: "Mentor not found" });

    const oldProjects = existingMentor.projects.map(p => p.toString());
    const newProjects = req.body.projects;

    const removed = oldProjects.filter(id => !newProjects.includes(id));
    const added = newProjects.filter(id => !oldProjects.includes(id));

    await Project.updateMany({ _id: { $in: removed } }, { $set: { assigned: false } });
    await Project.updateMany({ _id: { $in: added } }, { $set: { assigned: true } });

    const updatedMentor = await mentorModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedMentor);
  } catch (error) {
    console.error("Error updating mentor:", error);
    res.status(500).json({ message: "Failed to update mentor" });
  }
});

// Delete mentor
router.delete("/delete/:id", async (req, res) => {
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


module.exports = router;
