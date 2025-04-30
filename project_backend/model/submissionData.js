const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  name: String,
  status: String,
  marks: String,
  comments: String,
  
  // Reference to project(s)
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "project", 
  }],
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "mentor",
    required: true
  },
});

const submissionData = mongoose.model("submission", submissionSchema);
module.exports = submissionData;
