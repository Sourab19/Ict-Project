const mongoose = require("mongoose");

const getDummySubmissions = (projectId) => [
  {
    studentName: "Student 1",
    studentId: "S1",
    projectId,
    submissions: [
      { _id: new mongoose.Types.ObjectId(), week: "Week 1", marks: null, comment: "", status: "Pending" },
      { _id: new mongoose.Types.ObjectId(), week: "Week 2", marks: null, comment: "", status: "Pending" },
      { _id: new mongoose.Types.ObjectId(), week: "Week 3", marks: null, comment: "", status: "Pending" },
      { _id: new mongoose.Types.ObjectId(), week: "Week 4", marks: null, comment: "", status: "Pending" },
      { _id: new mongoose.Types.ObjectId(), week: "Project Report", marks: null, comment: "", status: "Pending" }
    ]
  },
  {
    studentName: "Student 2",
    studentId: "S2",
    projectId,
    submissions: [
      { _id: new mongoose.Types.ObjectId(), week: "Week 1", marks: null, comment: "", status: "Pending" },
      { _id: new mongoose.Types.ObjectId(), week: "Week 2", marks: null, comment: "", status: "Pending" },
      { _id: new mongoose.Types.ObjectId(), week: "Week 3", marks: null, comment: "", status: "Pending" },
      { _id: new mongoose.Types.ObjectId(), week: "Week 4", marks: null, comment: "", status: "Pending" },
      { _id: new mongoose.Types.ObjectId(), week: "Project Report", marks: null, comment: "", status: "Pending" }
    ]
  }
];

module.exports = getDummySubmissions;
