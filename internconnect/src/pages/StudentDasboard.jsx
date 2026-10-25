import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const savedApplications = JSON.parse(
      localStorage.getItem("applications") || "[]",
    );

    setApplications(savedApplications);
  }, []);

  const totalApplications = applications.length;

  const pendingApplications = applications.filter(
    (app) => app.status === "Pending",
  ).length;

  const acceptedApplications = applications.filter(
    (app) => app.status === "Accepted",
  ).length;

  const rejectedApplications = applications.filter(
    (app) => app.status === "Rejected",
  ).length;

  const stats = [
    {
      title: "Total Applications",
      count: totalApplications,
      color: "border-blue-500",
      textColor: "text-blue-600",
    },
    {
      title: "Pending",
      count: pendingApplications,
      color: "border-yellow-500",
      textColor: "text-yellow-600",
    },
    {
      title: "Accepted",
      count: acceptedApplications,
      color: "border-green-500",
      textColor: "text-green-600",
    },
    {
      title: "Rejected",
      count: rejectedApplications,
      color: "border-red-500",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Student Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome to InternConnect! Track your internship applications here.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${stat.color}`}
            >
              <p className="text-gray-500 text-sm">{stat.title}</p>

              <h2 className={`text-3xl font-bold mt-3 ${stat.textColor}`}>
                {stat.count}
              </h2>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Quick Actions
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/internships"
              className="bg-blue-600 text-white text-center px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Explore Internships
            </Link>

            <Link
              to="/myapplications"
              className="bg-white text-blue-600 border border-blue-600 text-center px-6 py-3 rounded-lg hover:bg-blue-50"
            >
              View My Applications
            </Link>

            <Link
              to="/editprofile"
              className="bg-green-600 text-white text-center px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Edit Profile
            </Link>

            <Link
              to="/notifications"
              className="bg-purple-600 text-white text-center px-6 py-3 rounded-lg hover:bg-purple-700"
            >
              🔔 Notifications
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recent Applications
          </h2>

          {applications.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                You have not applied for any internships yet.
              </p>

              <Link
                to="/internships"
                className="inline-block mt-4 text-blue-600 font-semibold hover:underline"
              >
                Apply for an Internship
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {applications
                .slice(-3)
                .reverse()
                .map((app) => (
                  <div
                    key={app.id}
                    className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {app.title || "Internship"}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        {app.company || "Company not specified"}
                      </p>

                      <p className="text-gray-400 text-sm mt-1">
                        Applied on: {app.date || "Date not available"}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm w-fit ${
                        app.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : app.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {app.status || "Pending"}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/studentprofile"
            className="text-blue-600 font-medium hover:underline"
          >
            View Student Profile →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
