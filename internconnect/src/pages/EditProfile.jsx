
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const savedProfile = JSON.parse(
    localStorage.getItem("studentProfile") || "{}"
  );

  const [formData, setFormData] = useState({
    name: savedProfile.name || "",
    email: savedProfile.email || "",
    phone: savedProfile.phone || "",
    college: savedProfile.college || "",
    course: savedProfile.course || "",
    year: savedProfile.year || "",
    skills: savedProfile.skills || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "studentProfile",
      JSON.stringify(formData)
    );

    alert("Profile updated successfully!");
    navigate("/studentdashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Edit Profile
        </h1>

        <p className="text-gray-600 mb-6">
          Update your personal and academic details.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-8 rounded-xl shadow-md space-y-5"
        >
          {/* Full Name */}
          <div>
            <label className="block font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* College */}
          <div>
            <label className="block font-medium mb-2">
              College Name
            </label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              placeholder="Enter your college name"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Course */}
          <div>
            <label className="block font-medium mb-2">
              Course
            </label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="e.g. B.Tech CSE"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Year */}
          <div>
            <label className="block font-medium mb-2">
              Academic Year
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Your Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          {/* Skills */}
          <div>
            <label className="block font-medium mb-2">
              Skills
            </label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g. HTML, CSS, JavaScript, React"
              rows="3"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => navigate("/studentdashboard")}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
