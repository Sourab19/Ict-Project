const mongoose = require("mongoose");
const mentorSchema = mongoose.Schema({
  name: String,
  email: String,
  number: Number,
  password: String,
  projects: Array,
});

const mentorData = mongoose.model("mentor", mentorSchema);
module.exports = mentorData;
