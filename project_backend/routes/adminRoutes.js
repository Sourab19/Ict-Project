const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));



const adminModel = require("../model/adminData");
router.post('/login', async (req, res) => {
  try {
    const admin = await adminModel.findOne({ email: req.body.email });
    if (!admin) {
      res.status(404).send("Admin not found");
    } else {
      if (admin.password == req.body.password) {
        res.status(200).send({message:'Admin Login Successful'})
      } else {
        res.status(404).send({message:'Invalid credentials'});
      }
    }
  } catch (error) {
    res.status(404).send("Error");
  }


});

module.exports = router;
