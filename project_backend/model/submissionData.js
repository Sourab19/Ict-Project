const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  studentName: String,
  studentId: String,
  projectId: String,
  submissions: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // ✅ Add this
      week: String,
      marks: Number,
      comment: String,
      status: String,
    },
  ],
});

const submissionData = mongoose.model("submission", SubmissionSchema);
module.exports = submissionData;
