import React from "react";
import { Link } from "react-router-dom";

const Applicationsuccess = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-lg text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
          ✓
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Application Submitted!
        </h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Congratulations! Your internship application has been submitted
          successfully. Best of luck for your future!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/internships"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Explore More Internships
          </Link>

          <Link
            to="/"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Applicationsuccess;
