import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [lastUpdated, setLastUpdated] = useState(null);

  // Load applications from localStorage
  const loadApplications = useCallback(() => {
    try {
      const savedData = JSON.parse(
        localStorage.getItem("applications") || "[]",
      );

      setApplications(Array.isArray(savedData) ? savedData : []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error loading applications:", error);
      setApplications([]);
    }
  }, []);

  // Load initially and listen for changes from other tabs
  useEffect(() => {
    loadApplications();

    const handleStorageChange = (event) => {
      if (event.key === "applications" || event.key === null) {
        loadApplications();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadApplications]);

  // Update application status
  const updateStatus = (id, newStatus) => {
    try {
      const savedData = JSON.parse(
        localStorage.getItem("applications") || "[]",
      );

      const updatedApplications = savedData.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app,
      );

      localStorage.setItem("applications", JSON.stringify(updatedApplications));

      setApplications(updatedApplications);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error updating application:", error);
      alert("Unable to update application status.");
    }
  };

  // Dashboard statistics
  const stats = [
    {
      title: "Total Applications",
      count: applications.length,
      color: "border-blue-500",
      text: "text-blue-600",
    },
    {
      title: "Pending",
      count: applications.filter(
        (app) => (app.status || "Pending") === "Pending",
      ).length,
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

  // Search and status filter
  const filteredApplications = applications.filter((app) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch = [app.name, app.email, app.title, app.company].some(
      (value) =>
        String(value || "")
          .toLowerCase()
          .includes(searchText),
    );

    const currentStatus = app.status || "Pending";

    const matchesStatus =
      statusFilter === "All" || currentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div
          className="mb-8 flex flex-col gap-4 sm:flex-row
          sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-gray-600">
              Manage internship applications on InternConnect.
            </p>

            <p className="mt-2 text-xs text-gray-400">
              Last refreshed:{" "}
              {lastUpdated ? lastUpdated.toLocaleTimeString() : "Loading..."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={loadApplications}
              className="rounded-lg border border-blue-600
                px-4 py-3 font-medium text-blue-600
                transition hover:bg-blue-50"
            >
              ↻ Refresh Applications
            </button>

            <Link
              to="/manage-internships"
              className="rounded-lg bg-green-600 px-5 py-3
                text-center text-white hover:bg-green-700"
            >
              Manage Internships
            </Link>

            <Link
              to="/studentdashboard"
              className="rounded-lg bg-blue-600 px-5 py-3
                text-center text-white hover:bg-blue-700"
            >
              Student Dashboard
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2
          lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.title}
              className={`rounded-xl border-l-4 bg-white
                p-6 shadow-sm ${stat.color}`}
            >
              <p className="text-gray-500">{stat.title}</p>

              <h2 className={`mt-3 text-3xl font-bold ${stat.text}`}>
                {stat.count}
              </h2>
            </div>
          ))}
        </div>

        {/* Manage Applications */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Manage Applications
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Search applications and update their status.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student, email, internship..."
              className="w-full rounded-lg border border-gray-300
                px-4 py-3 outline-none focus:border-blue-500
                focus:ring-2 focus:ring-blue-100"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-gray-300
                bg-white px-4 py-3 outline-none
                focus:border-blue-500"
            >
              <option value="All">All Applications</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Applications Table */}
          {filteredApplications.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-4xl">📂</p>

              <h3 className="mt-3 font-semibold text-gray-700">
                No applications found
              </h3>

              <p className="mt-2 text-gray-500">
                Try another search or status filter.
              </p>

              <Link
                to="/internships"
                className="mt-4 inline-block text-blue-600
                  hover:underline"
              >
                View Internships
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="p-4">Student</th>
                    <th className="p-4">Internship</th>
                    <th className="p-4">Company</th>
                    <th className="p-4">Applied On</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredApplications.map((app) => {
                    const currentStatus = app.status || "Pending";

                    return (
                      <tr
                        key={app.id}
                        className="border-b border-gray-100
                          transition hover:bg-gray-50"
                      >
                        <td className="p-4">
                          <p className="font-semibold text-gray-800">
                            {app.name || "Student"}
                          </p>

                          <p className="text-sm text-gray-500">
                            {app.email || "No email"}
                          </p>
                        </td>

                        <td className="p-4 text-gray-700">
                          {app.title || "Internship"}
                        </td>

                        <td className="p-4 text-gray-700">
                          {app.company || "Not specified"}
                        </td>

                        <td className="p-4 text-gray-600">{app.date || "—"}</td>

                        <td className="p-4">
                          <span
                            className={`rounded-full px-3 py-1
                              text-sm font-medium ${
                                currentStatus === "Accepted"
                                  ? "bg-green-100 text-green-700"
                                  : currentStatus === "Rejected"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                              }`}
                          >
                            {currentStatus}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => updateStatus(app.id, "Accepted")}
                              disabled={currentStatus === "Accepted"}
                              className="rounded-lg bg-green-600
                                px-3 py-2 text-white
                                hover:bg-green-700
                                disabled:cursor-not-allowed
                                disabled:opacity-50"
                            >
                              Accept
                            </button>

                            <button
                              onClick={() => updateStatus(app.id, "Rejected")}
                              disabled={currentStatus === "Rejected"}
                              className="rounded-lg bg-red-600
                                px-3 py-2 text-white
                                hover:bg-red-700
                                disabled:cursor-not-allowed
                                disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <p className="mt-4 text-sm text-gray-500">
            Showing {filteredApplications.length} of {applications.length}{" "}
            applications
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-wrap gap-5">
          <Link to="/internships" className="text-blue-600 hover:underline">
            View Internships
          </Link>

          <Link to="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
