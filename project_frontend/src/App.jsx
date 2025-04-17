

import './App.css'
import AdminDashboard from './components/AdminDashboard';
import MentorDashboard from './components/MentorDashboard';
import RefMaterials from './components/RefMaterials';
import { Route, Routes } from 'react-router-dom';
import Projects from './components/Projects';
import Mentors from './components/Mentors';
import Submissions from './components/Submissions';
import LoginPage from './components/LoginPage';

function App() {
  

  return (
    <>
    <Routes>
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/mentordashboard" element={<MentorDashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/submissions" element={<Submissions />} />
      <Route path="/mentors" element={<Mentors/>} />
      <Route path="/ref" element={<RefMaterials/>} />
      <Route path="/" element={<LoginPage/>}/>
    </Routes>
    </>
  )
}

export default App
