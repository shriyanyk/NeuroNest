// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./components/Home";
import SelectCondition from "./pages/SelectCondition";
import Welcome from "./components/Welcome";
import AutismTasks from "./components/tasks/AutismTasks";
import ADHDTasks from "./components/tasks/ADHDTasks";
import DyslexiaTasks from "./components/tasks/DyslexiaTasks";
import AnxietyTasks from "./components/tasks/AnxietyTasks";
import OCDTasks from "./components/tasks/OCDTasks";
import DepressionTasks from "./components/tasks/DepressionTasks";
import TouretteTasks from "./components/tasks/TouretteTasks";
import SensoryTasks from "./components/tasks/SensoryTasks";
import BipolarTasks from "./components/tasks/BipolarTasks";
import PTSDTasks from "./components/tasks/PTSDTasks";
import MainLayout from "./pages/MainLayout";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/select-condition" element={<SelectCondition />} />
          <Route path="/tasks/autism" element={<AutismTasks />} />
          <Route path="/tasks/adhd" element={<ADHDTasks />} />
          <Route path="/tasks/dyslexia" element={<DyslexiaTasks />} />
          <Route path="/tasks/anxiety" element={<AnxietyTasks />} />
          <Route path="/tasks/ocd" element={<OCDTasks />} />
          <Route path="/tasks/depression" element={<DepressionTasks />} />
          <Route path="/tasks/tourette" element={<TouretteTasks />} />
          <Route path="/tasks/spd" element={<SensoryTasks />} />
          <Route path="/tasks/bipolar" element={<BipolarTasks />} />
          <Route path="/tasks/ptsd" element={<PTSDTasks />} />

          {/* Pages with Bottom Navbar */}
          <Route path="/chatbot/:condition" element={<MainLayout />} />
          <Route path="/planner/:condition" element={<MainLayout />} />
          <Route path="/community/:condition" element={<MainLayout />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
