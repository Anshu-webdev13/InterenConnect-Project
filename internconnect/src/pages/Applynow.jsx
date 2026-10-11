import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Applynow = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [coverMessage, setCoverMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newApplication = {
      id: Date.now(),
      title: "Web Development Intern",
      company: "Tech Solution",
      date: new Date().toLocaleDateString("en-IN"),
      name,
      email,
      phone,
      college,
      course,
      coverMessage,
      status: "Pending",
    };

    const savedApplications = JSON.parse(
      localStorage.getItem("applications") || "[]",
    );

    savedApplications.push(newApplication);

    localStorage.setItem("applications", JSON.stringify(savedApplications));

    navigate("/applicationsuccess");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800">
            Apply For Internship
          </h1>

          <p className="text-gray-600 mt-2">
            Web Development Intern at Tech Solution
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                College Name
              </label>

              <input
                type="text"
                placeholder="Enter your college name"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Course / Branch
              </label>

              <input
                type="text"
                placeholder="e.g. B.Tech CSE"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Resume
              </label>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="w-full border border-gray-300 rounded-md px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Cover Message
              </label>

              <textarea
                rows="5"
                placeholder="Why are you interested in this internship?"
                value={coverMessage}
                onChange={(e) => setCoverMessage(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
            >
              Apply Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Applynow;
