
import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar";

// Public Pages
import Home from "./pages/Home";
import Interenship from "./pages/Internship";
import Internshipdetails from "./pages/Internshipdetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HowItWorks from "./pages/HowItWorks";

// Student Pages
import Applynow from "./pages/Applynow";
import Applicationsuccess from "./pages/Applicationsuccess";
import MyApplications from "./pages/MyApplications";
import StudentDashboard from "./pages/StudentDasboard";
import StudentProfile from "./pages/StudentProfile";
import EditProfile from "./pages/EditProfile";
import Notification from "./pages/Notification";

// Company Pages
import CompanyDashboard from "./pages/CompanyDashboard";
import ManageInternships from "./pages/ManageInternships";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import ManageStudents from "./pages/ManageStudents";
import ManageCompanies from "./pages/ManageCompanies";
import AdminManageInternships from "./pages/AdminManageInternships";

// Protected Route
const ProtectedRoute = ({ allowedRole, children }) => {
  const location = useLocation();

  let currentUser = null;

  try {
    currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );
  } catch (error) {
    console.error("User data error:", error);
    localStorage.removeItem("currentUser");
  }

  // Check login
  if (!currentUser) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Check user role
  if (currentUser.role !== allowedRole) {
    if (currentUser.role === "admin") {
      return <Navigate to="/admindashboard" replace />;
    }

    if (currentUser.role === "company") {
      return <Navigate to="/companydashboard" replace />;
    }

    if (currentUser.role === "student") {
      return <Navigate to="/studentdashboard" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route
          path="/internships"
          element={<Interenship />}
        />

        <Route
          path="/internshipdetails"
          element={<Internshipdetails />}
        />

        <Route
          path="/howitworks"
          element={<HowItWorks />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Student Routes */}
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

        {/* Company Routes */}
        <Route
          path="/companydashboard"
          element={
            <ProtectedRoute allowedRole="company">
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-internships"
          element={
            <ProtectedRoute allowedRole="company">
              <ManageInternships />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
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

        <Route
          path="/manage-companies"
          element={
            <ProtectedRoute allowedRole="admin">
              <ManageCompanies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adminmanageinternships"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminManageInternships />
            </ProtectedRoute>
          }
        />

        {/* Page Not Found */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
};

export default App;
