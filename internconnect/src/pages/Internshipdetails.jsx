import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Internshipdetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Selected internship from Internship page
  const internship = location.state?.internship;

  // If no internship is selected
  if (!internship) {
    return (
      <div className="min-h-screen bg-gray-50 p-10 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Please select an internship first.
        </h1>

        <Link
          to="/internships"
          className="mt-5 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Browse Internships
        </Link>
      </div>
    );
  }

  const skills = internship.skills
    ? internship.skills.split(",").map((skill) => skill.trim())
    : [];

  const handleApply = () => {
    navigate("/applynow", {
      state: { internship: internship },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-6">
        {/* Internship Header */}
        <div className="rounded-xl bg-white p-8 shadow-md">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700">
            {internship.category}
          </span>

          <h1 className="mt-4 text-3xl font-bold text-gray-800">
            {internship.title}
          </h1>

          <p className="mt-2 text-lg text-blue-600">{internship.company}</p>

          <div className="mt-6 flex flex-wrap gap-6 text-gray-600">
            <p>📍 {internship.location}</p>
            <p>💼 Internship</p>
            <p>⏳ {internship.duration}</p>
            <p>💰 {internship.salary}</p>
          </div>
        </div>

        {/* About Internship */}
        <div className="mt-6 rounded-xl bg-white p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">
            About The Internship
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            {internship.description}
          </p>
        </div>

        {/* Required Skills */}
        <div className="mt-6 rounded-xl bg-white p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">Required Skills</h2>

          <div className="mt-4 flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-blue-100 px-4 py-2 text-blue-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Responsibilities */}
        <div className="mt-6 rounded-xl bg-white p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">Responsibilities</h2>

          <ul className="mt-4 list-inside list-disc space-y-2 text-gray-600">
            <li>Work on tasks related to {internship.category}.</li>
            <li>Write clean and maintainable code.</li>
            <li>Collaborate with the team and learn new skills.</li>
            <li>Complete assigned tasks on time.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={handleApply}
            className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Apply Now
          </button>

          <Link
            to="/internships"
            className="rounded-lg border border-blue-600 px-8 py-3 text-blue-600 hover:bg-blue-50"
          >
            Back to Internships
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Internshipdetails;
