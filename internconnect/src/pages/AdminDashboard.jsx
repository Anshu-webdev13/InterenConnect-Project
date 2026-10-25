import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);

  const loadApplications = () => {
    const savedApplications = JSON.parse(
      localStorage.getItem("applications") || "[]",
    );
    setApplications(savedApplications);
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const updateStatus = (id, newStatus) => {
    const updatedApplications = applications.map((app) =>
      app.id === id ? { ...app, status: newStatus } : app,
    );

    localStorage.setItem("applications", JSON.stringify(updatedApplications));

    setApplications(updatedApplications);
    alert(`Application status updated to ${newStatus}.`);
  };

  const stats = [
    {
      title: "Total Applications",
      count: applications.length,
      color: "border-blue-500",
      text: "text-blue-600",
    },
    {
      title: "Pending",
      count: applications.filter((app) => app.status === "Pending").length,
      color: "border-yellow-500",
      text: "text-yellow-600",
    },
    {
      title: "Accepted",
      count: applications.filter((app) => app.status === "Accepted").length,
      color: "border-green-500",
      text: "text-green-600",
    },
    {
      title: "Rejected",
      count: applications.filter((app) => app.status === "Rejected").length,
      color: "border-red-500",
      text: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage internship applications on InternConnect.
            </p>
          </div>

          <Link
            to="/studentdashboard"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 text-center"
          >
            Student Dashboard
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${stat.color}`}
            >
              <p className="text-gray-500">{stat.title}</p>
              <h2 className={`text-3xl font-bold mt-3 ${stat.text}`}>
                {stat.count}
              </h2>
            </div>
          ))}
        </div>

        {/* Applications */}
        <div className="bg-white rounded-xl shadow-sm mt-8 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Manage Applications
          </h2>

          {applications.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No applications found yet.</p>
              <Link
                to="/internships"
                className="inline-block mt-4 text-blue-600 hover:underline"
              >
                View Internships
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="p-3">Student</th>
                    <th className="p-3">Internship</th>
                    <th className="p-3">Company</th>
                    <th className="p-3">Applied On</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b">
                      <td className="p-3">
                        {app.name || "Student"}
                        <p className="text-sm text-gray-500">
                          {app.email || "No email"}
                        </p>
                      </td>

                      <td className="p-3">{app.title || "Internship"}</td>

                      <td className="p-3">{app.company || "Not specified"}</td>

                      <td className="p-3">{app.date || "—"}</td>

                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            app.status === "Accepted"
                              ? "bg-green-100 text-green-700"
                              : app.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {app.status || "Pending"}
                        </span>
                      </td>

                      <td className="p-3">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => updateStatus(app.id, "Accepted")}
                            disabled={app.status === "Accepted"}
                            className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Accept
                          </button>

                          <button
                            onClick={() => updateStatus(app.id, "Rejected")}
                            disabled={app.status === "Rejected"}
                            className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6">
          <Link to="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
