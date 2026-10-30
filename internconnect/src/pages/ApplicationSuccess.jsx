
import React from "react";
import { Link } from "react-router-dom";

const Applicationsuccess = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 sm:px-6">

      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">

        {/* Top Success Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-8 text-center text-white sm:px-8 sm:py-10">

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 ring-4 ring-white/20">
            <svg
              className="h-11 w-11"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-100">
            InternConnect
          </p>

          <h1 className="text-2xl font-bold sm:text-3xl">
            Application Submitted!
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-blue-100 sm:text-base">
            Your application has been successfully received.
          </p>
        </div>

        {/* Main Content */}
        <div className="px-5 py-7 text-center sm:px-8 sm:py-9">

          <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
            Thank You for Applying!
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
            We appreciate your interest. Your application is now submitted
            and will be reviewed by the internship team.
          </p>

          {/* Application Status */}
          <div className="mt-7 rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5">

            <div className="flex items-center justify-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>

              <span className="font-semibold text-amber-800">
                Application Status: Pending
              </span>
            </div>

            <p className="mt-2 text-sm text-amber-700">
              You can track your application status from My Applications.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

            <Link
              to="/myapplications"
              className="w-full rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto sm:text-base"
            >
              Track Application
            </Link>

            <Link
              to="/internships"
              className="w-full rounded-lg border border-gray-300 px-5 py-3 text-center text-sm font-semibold text-gray-700 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 sm:w-auto sm:text-base"
            >
              Explore More Internships
            </Link>
          </div>

          <div className="mt-7 border-t border-gray-100 pt-5">
            <Link
              to="/"
              className="text-sm font-medium text-gray-500 transition hover:text-blue-600"
            >
              ← Back to Home
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Applicationsuccess;
