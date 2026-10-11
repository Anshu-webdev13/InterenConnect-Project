import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

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
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    localStorage.setItem("studentProfile", JSON.stringify(profile));
    setIsEditing(false);

    alert("Profile saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
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

          <div className="p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Personal Profile
                </h2>

                <p className="text-gray-500 mt-1">
                  Manage your student information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                {isEditing ? "Cancel Editing" : "Edit Profile"}
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter your phone number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    College Name
                  </label>

                  <input
                    type="text"
                    name="college"
                    value={profile.college}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter your college name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Course / Branch
                  </label>

                  <input
                    type="text"
                    name="course"
                    value={profile.course}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="e.g. B.Tech CSE"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Year of Study
                  </label>

                  <select
                    name="year"
                    value={profile.year}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 disabled:bg-gray-100"
                  >
                    <option value="">Select year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    Skills
                  </label>

                  <textarea
                    name="skills"
                    value={profile.skills}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows="3"
                    placeholder="e.g. HTML, CSS, JavaScript, React"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 disabled:bg-gray-100"
                  />
                </div>
              </div>

              {isEditing && (
                <button
                  type="submit"
                  className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                >
                  Save Profile
                </button>
              )}
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                to="/studentdashboard"
                className="text-blue-600 font-medium hover:underline"
              >
                ← Back to Student Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
