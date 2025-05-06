const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: String,
  projectDescription: String,
  srsFile: [{
    type: String,
    required: false,
  }],
  assigned: {
    type: Boolean,
    default: false,
  },
});

const ProjectData = mongoose.model("project", projectSchema);
module.exports = ProjectData;
