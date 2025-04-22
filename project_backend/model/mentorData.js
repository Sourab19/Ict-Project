const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: Number,
  password: String,
  
  // Reference to project(s)
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "project", 
  }],
  role: {
    type: String,
    default: "mentor",
  },
});

const mentorData = mongoose.model("mentor", mentorSchema);
module.exports = mentorData;
