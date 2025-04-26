import { Routes, Route, useLocation } from "react-router-dom";

import Mentors from "./components/Mentors";
import Submissions from "./components/Submissions";
import LoginPage from "./components/LoginPage";
import AddMentor from "./components/AddMentor";
import AddProject from "./components/AddProject";

import Projects from "./components/Projects";
import AdminDashboard from "./components/AdminDashboard";
import MentorDashboard from "./components/MentorDashboard";
import RefMaterials from "./components/RefMaterials";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const hideNavbarOn = ["/"]; // paths where navbar should not appear

  return (
    <>
     

      <Routes>
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/mentordashboard" element={<MentorDashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/ref" element={<RefMaterials />} />
        <Route path="/addmentor" element={<AddMentor />} />
        <Route path="/addproject" element={<AddProject />} />
       
        <Route path="/" element={<LoginPage />} />
      </Routes>
      {!hideNavbarOn.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
