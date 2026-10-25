import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    course: "",
    year: "",
    skills: "",
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem("studentProfile");

    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (error) {
        console.error("Unable to load student profile:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-600 text-white px-8 py-10">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="w-24 h-24 rounded-full bg-white text-blue-600 flex items-center justify-center text-4xl font-bold">
                {profile.name ? profile.name.charAt(0).toUpperCase() : "S"}
              </div>

              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold">
                  {profile.name || "Student Name"}
                </h1>

                <p className="mt-2 text-blue-100">
                  {profile.course || "Your Course / Branch"}
                </p>

                <p className="text-blue-100">
                  {profile.college || "Your College"}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Personal Profile
                </h2>

                <p className="text-gray-500 mt-1">
                  View and manage your student information.
                </p>
              </div>

              {/* Edit Profile Link */}
              <Link
                to="/editprofile"
                className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 text-center"
              >
                Edit Profile
              </Link>
            </div>

            {/* Student Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm mb-1">Full Name</p>
                <p className="font-medium text-gray-800">
                  {profile.name || "Not added yet"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm mb-1">Email Address</p>
                <p className="font-medium text-gray-800 break-words">
                  {profile.email || "Not added yet"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm mb-1">Phone Number</p>
                <p className="font-medium text-gray-800">
                  {profile.phone || "Not added yet"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm mb-1">College Name</p>
                <p className="font-medium text-gray-800">
                  {profile.college || "Not added yet"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm mb-1">Course / Branch</p>
                <p className="font-medium text-gray-800">
                  {profile.course || "Not added yet"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm mb-1">Year of Study</p>
                <p className="font-medium text-gray-800">
                  {profile.year || "Not selected"}
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="text-gray-500 text-sm mb-1">Skills</p>
                <p className="font-medium text-gray-800 whitespace-pre-wrap">
                  {profile.skills || "No skills added yet"}
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
              <Link
                to="/studentdashboard"
                className="text-blue-600 font-medium hover:underline"
              >
                ← Back to Student Dashboard
              </Link>

              <Link
                to="/editprofile"
                className="text-blue-600 font-medium hover:underline sm:ml-auto"
              >
                Update My Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
