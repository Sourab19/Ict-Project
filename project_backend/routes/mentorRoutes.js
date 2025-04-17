const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));



const mentorModel = require("../model/mentorData");
router.post('/login', async (req, res) => {
  try {
    const mentor = await mentorModel.findOne({ email: req.body.email });
    if (!mentor) {
      res.status(404).send("Mentor not found");
    } else {
      if (mentor.password == req.body.password) {
        res.status(200).send({message:'Mentor Login Successful'})
      } else {
        res.status(404).send({message:'Invalid credentials'});
      }
    }
  } catch (error) {
    res.status(404).send("Error");
  }


});

module.exports = router;
