import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import Interenship from "./pages/Internship.jsx";
import Internshipdetails from "./pages/Internshipdetails.jsx";
import Applynow from "./pages/Applynow.jsx";
import Applicationsuccess from "./pages/ApplicationSuccess.jsx";
import MyApplications from "./pages/MyApplications.jsx";
import StudentDashboard from "./pages/StudentDasboard.jsx";
import StudentProfile from "./pages/StudentProfile";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/internships" element={<Interenship />} />
        <Route path="/internshipdetails" element={<Internshipdetails />} />
        <Route path="/applynow" element={<Applynow />} />
        <Route path="/applicationsuccess" element={<Applicationsuccess />} />
        <Route path="/myapplications" element={<MyApplications />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/studentprofile" element={<StudentProfile />} />
      </Routes>
    </div>
  );
};

export default App;
