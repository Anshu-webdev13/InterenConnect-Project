import React from "react";

const Internshipdetails = () => {
  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800">
            Web Development Intern
          </h1>
          <p className="text-blue-600 text-lg mt-2"> Tech Solution</p>
          <div className="flex flex-wrap gap-6 mt-6 text-gray-600">
            <p>📍 Remote</p>
            <p>💼 Full Time</p>
            <p>⏳ 2 Months</p>
            <p>💰 ₹10,000 / Month</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold text-gray-800">
            About The Internship
          </h2>
          <p className="text-gray-600 mt-4 leading-7">
            We are looking for a motivated Web Development Intern who is the
            interested in the building modern and responsive website. You will
            get an opportunity to work on real-world projects and improve your
            development skills.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold text-gray-800">Required Skills</h2>
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">
              HTML
            </span>
            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">
              CSS
            </span>
            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">
              Javascript
            </span>
            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">
              React
            </span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold text-gray-800">Responsibilities</h2>
          <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
            <li>Build responsive web page</li>
            <li>Write clean and reusable code</li>
            <li>Work with the development team</li>
            <li>Fix bugs and improve websites performance</li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Internshipdetails;
