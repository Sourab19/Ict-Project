const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));



const mentorModel = require("../model/mentorData");
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

router.post('/add', async (req, res) => {
  try {
    const { name, email, number, password, projects } = req.body;

    const newMentor = new mentorModel({
      name,
      email,
      number,
      password,
      projects,
    });

    const savedMentor = await newMentor.save();
    res.status(201).json(savedMentor);
  } catch (error) {
    console.error("Error adding mentor:", error);
    res.status(500).json({ message: "Error adding mentor", error });
  }
});


module.exports = router;
