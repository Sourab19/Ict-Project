const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: String,
  projectDescription: String,
  srsFile: {
    type: String,
    required: false,
  },
  assigned: {
    type: Boolean,
    default: false,
  },
});

const Project = mongoose.model("project", projectSchema);
module.exports = Project;
