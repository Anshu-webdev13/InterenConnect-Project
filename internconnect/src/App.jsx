import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
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
import ManageStudents from "./pages/ManageStudents.jsx";

// Protected Route Component
const ProtectedRoute = ({ allowedRole, children }) => {
  const location = useLocation();

  let currentUser = null;

  try {
    currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  } catch (error) {
    currentUser = null;
  }

  // If user is not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Check user role
  const userRole = currentUser.role || "student";

  // If user tries to access another role's page
  if (userRole !== allowedRole) {
    if (userRole === "admin") {
      return <Navigate to="/admindashboard" replace />;
    }

    if (userRole === "student") {
      return <Navigate to="/studentdashboard" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/internships" element={<Interenship />} />
        <Route path="/internshipdetails" element={<Internshipdetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/howitworks" element={<HowItWorks />} />

        {/* Student Protected Routes */}
        <Route
          path="/studentdashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applynow"
          element={
            <ProtectedRoute allowedRole="student">
              <Applynow />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applicationsuccess"
          element={
            <ProtectedRoute allowedRole="student">
              <Applicationsuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/myapplications"
          element={
            <ProtectedRoute allowedRole="student">
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/studentprofile"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editprofile"
          element={
            <ProtectedRoute allowedRole="student">
              <EditProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute allowedRole="student">
              <Notification />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected Routes */}
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-internships"
          element={
            <ProtectedRoute allowedRole="admin">
              <ManageInternships />
            </ProtectedRoute>
          }
        />

        <Route
          path="/managestudents"
          element={
            <ProtectedRoute allowedRole="admin">
              <ManageStudents />
            </ProtectedRoute>
          }
        />

        {/* Unknown Routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
