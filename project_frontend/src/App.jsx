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
import MentorProjects from "./components/MentorProjects";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      {/* All routes that need Layout */}
      <Route path="/" element={<Layout />}>
        <Route
          path="/admindashboard"
          element={
            <PrivateRoutes>
              <AdminDashboard />
            </PrivateRoutes>
          }
        />
        <Route
          path="/mentordashboard"
          element={
            <PrivateRoutes>
              <MentorDashboard />
            </PrivateRoutes>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateRoutes>
              <Projects />
            </PrivateRoutes>
          }
        />
        <Route
          path="/submissions"
          element={
            <PrivateRoutes>
              <Submissions />
            </PrivateRoutes>
          }
        />
        <Route
          path="/mentors"
          element={
            <PrivateRoutes>
              <Mentors />
            </PrivateRoutes>
          }
        />
        <Route
          path="/ref"
          element={
            <PrivateRoutes>
              <RefMaterials />
            </PrivateRoutes>
          }
        />
        <Route
          path="/addmentor"
          element={
            <PrivateRoutes>
              <AddMentor />
            </PrivateRoutes>
          }
        />
        <Route
          path="/addproject"
          element={
            <PrivateRoutes>
              <AddProject />
            </PrivateRoutes>
          }
        />
        <Route
          path="/mentorprojects"
          element={
            <PrivateRoutes>
              <MentorProjects />
            </PrivateRoutes>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
