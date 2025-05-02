// App.js
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Mentors from "./components/Mentors";
import Submissions from "./components/Submissions";
import LoginPage from "./components/LoginPage";
import AddMentor from "./components/AddMentor";
import AddProject from "./components/AddProject";
import Projects from "./components/Projects";
import AdminDashboard from "./components/AdminDashboard";
import MentorDashboard from "./components/MentorDashboard";
import RefMaterials from "./components/RefMaterials";
import AddSubmission from "./components/AddSubmission";
import MentorProjects from "./components/MentorProjects";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      {/* All routes that need Layout */}
      <Route
        path="/"
        element={<Layout />}
      >
        <Route path="admindashboard" element={<AdminDashboard />} />
        <Route path="mentordashboard" element={<MentorDashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="submissions" element={<Submissions />} />
        <Route path="mentors" element={<Mentors />} />
        <Route path="ref" element={<RefMaterials />} />
        <Route path="addmentor" element={<AddMentor />} />
        <Route path="addproject" element={<AddProject />} />
        <Route path="addsubmission" element={<AddSubmission />} />
        <Route path="mentorprojects" element={<MentorProjects />} />
      </Route>
    </Routes>
  );
}

export default App;
