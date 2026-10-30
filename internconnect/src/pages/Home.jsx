
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="min-h-screen bg-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">

        <div className="flex flex-col items-center justify-between gap-16 lg:flex-row">

          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">

            <p className="text-blue-600 font-semibold mb-4 text-sm sm:text-base">
              Your Career • Your Future
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              Find The Right Internship
              <span className="text-blue-600 block mt-2">
                Build Your Future
              </span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg mt-6 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Discover internships that match your skills, interests and
              career goals.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-8">

              <Link
                to="/internships"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-center"
              >
                Explore Internships
              </Link>

              <Link
                to="/register"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition font-semibold text-center"
              >
                Get Started
              </Link>

            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-8 mt-12 max-w-md mx-auto lg:mx-0">

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-blue-600">
                  100+
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Opportunities
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-blue-600">
                  50+
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Companies
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-blue-600">
                  500+
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Students
                </p>
              </div>

            </div>
          </div>

          {/* Right Featured Internship Card */}
          <div className="w-full lg:w-1/2 flex justify-center">

            <div className="relative w-full max-w-md">

              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 border border-blue-100">

                <div className="flex items-center justify-between gap-3 mb-6">

                  <div>
                    <p className="text-sm text-gray-500">
                      Featured Opportunity
                    </p>

                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                      Frontend Developer
                    </h2>
                  </div>

                  <div className="bg-blue-100 p-3 rounded-xl text-2xl">
                    💻
                  </div>

                </div>

                {/* Company Details */}
                <div className="flex items-center gap-3 mb-6">

                  <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center text-xl shrink-0">
                    🏢
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      Tech Company
                    </p>

                    <p className="text-sm text-gray-500">
                      Remote • 3 Months
                    </p>
                  </div>

                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">

                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                    React
                  </span>

                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                    JavaScript
                  </span>

                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                    HTML/CSS
                  </span>

                </div>

                {/* Stipend and Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                  <div>
                    <p className="text-sm text-gray-500">
                      Stipend
                    </p>

                    <p className="font-bold text-gray-900">
                      ₹10,000 / month
                    </p>
                  </div>

                  <Link
                    to="/internships"
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition text-center font-medium"
                  >
                    View Details
                  </Link>

                </div>
              </div>

              {/* Application Status */}
              <div className="relative sm:absolute sm:-bottom-6 sm:-left-6 mt-4 sm:mt-0 bg-white rounded-xl shadow-lg px-5 py-4 border border-gray-100">

                <p className="text-sm text-gray-500">
                  Application Status
                </p>

                <p className="text-green-600 font-semibold">
                  ✓ Open for Applications
                </p>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Home;

