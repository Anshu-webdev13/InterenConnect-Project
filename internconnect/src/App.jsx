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
import EditProfile from "./pages/EditProfile.jsx";
import Notification from "./pages/Notification.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import HowItWorks from "./pages/HowItWorks.jsx";
import ManageInternships from "./pages/ManageInternships.jsx";

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
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/manage-internships" element={<ManageInternships />} />
      </Routes>
    </div>
  );
};

export default App;
