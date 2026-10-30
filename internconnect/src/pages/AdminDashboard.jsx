
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Load Applications
  const loadApplications = useCallback(() => {
    try {
      const savedData = JSON.parse(
        localStorage.getItem("applications") || "[]"
      );

      setApplications(Array.isArray(savedData) ? savedData : []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error loading applications:", error);
      setApplications([]);
    }
  }, []);

  useEffect(() => {
    loadApplications();

    const handleApplicationsUpdated = () => {
      loadApplications();
    };

    const handleStorageChange = (event) => {
      if (event.key === "applications" || event.key === null) {
        loadApplications();
      }
    };

    window.addEventListener("applicationsUpdated", handleApplicationsUpdated);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(
        "applicationsUpdated",
        handleApplicationsUpdated
      );
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadApplications]);

  // Update Application Status
  const updateStatus = (id, newStatus) => {
    try {
      const savedData = JSON.parse(
        localStorage.getItem("applications") || "[]"
      );

      if (!Array.isArray(savedData)) {
        alert("Application data is invalid.");
        return;
      }

      const applicationExists = savedData.some(
        (app) => String(app.id) === String(id)
      );

      if (!applicationExists) {
        alert("Application not found. Please refresh the dashboard.");
        loadApplications();
        return;
      }

      const updatedApplications = savedData.map((app) =>
        String(app.id) === String(id)
          ? { ...app, status: newStatus }
          : app
      );

      localStorage.setItem(
        "applications",
        JSON.stringify(updatedApplications)
      );

      setApplications(updatedApplications);

      // Update selected application in modal
      if (
        selectedApplication &&
        String(selectedApplication.id) === String(id)
      ) {
        setSelectedApplication({
          ...selectedApplication,
          status: newStatus,
        });
      }

      setLastUpdated(new Date());

      window.dispatchEvent(new Event("applicationsUpdated"));
    } catch (error) {
      console.error("Error updating application:", error);
      alert("Unable to update application status.");
    }
  };

  // Statistics
  const stats = [
    {
      title: "Total Applications",
      count: applications.length,
      icon: "📋",
      color: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Pending",
      count: applications.filter(
        (app) => (app.status || "Pending") === "Pending"
      ).length,
      icon: "⏳",
      color: "bg-yellow-50",
      text: "text-yellow-600",
    },
    {
      title: "Accepted",
      count: applications.filter((app) => app.status === "Accepted").length,
      icon: "✅",
      color: "bg-green-50",
      text: "text-green-600",
    },
    {
      title: "Rejected",
      count: applications.filter((app) => app.status === "Rejected").length,
      icon: "❌",
      color: "bg-red-50",
      text: "text-red-600",
    },
  ];

  // Search and Filter
  const filteredApplications = applications.filter((app) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch = [
      app.name,
      app.email,
      app.title,
      app.company,
      app.phone,
    ].some((value) =>
      String(value || "").toLowerCase().includes(searchText)
    );

    const currentStatus = app.status || "Pending";

    const matchesStatus =
      statusFilter === "All" || currentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:py-10">
      <div className="mx-auto max-w-7xl">

        {/* Welcome Header */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-md md:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="mb-2 text-sm font-medium text-blue-100">
                InternConnect Administration
              </p>

              <h1 className="text-3xl font-bold md:text-4xl">
                Admin Dashboard
              </h1>

              <p className="mt-3 text-sm text-blue-100 md:text-base">
                Manage internship applications and track student progress.
              </p>

              <p className="mt-3 text-xs text-blue-100">
                Last refreshed:{" "}
                {lastUpdated
                  ? lastUpdated.toLocaleTimeString()
                  : "Loading..."}
              </p>
            </div>

            <button
              type="button"
              onClick={loadApplications}
              className="rounded-lg bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              ↻ Refresh Applications
            </button>

          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className={`mt-3 text-3xl font-bold ${stat.text}`}>
                    {stat.count}
                  </h2>
                </div>

                <div className={`rounded-xl p-4 text-2xl ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Manage Applications */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-7">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Manage Applications
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Review student applications and update their status.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Search student, email, internship..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="All">All Applications</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>

          </div>

          {/* Applications */}
          {filteredApplications.length === 0 ? (

            <div className="py-12 text-center">
              <div className="mb-4 text-5xl">📂</div>

              <h3 className="text-xl font-bold text-gray-800">
                No Applications Found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Try another search or status filter.
              </p>

              <Link
                to="/internships"
                className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
              >
                View Internships
              </Link>
            </div>

          ) : (

            <div className="space-y-4">
              {filteredApplications.map((app) => {
                const currentStatus = app.status || "Pending";

                return (
                  <div
                    key={app.id}
                    className="rounded-xl border border-gray-200 p-5 transition hover:border-blue-200 hover:shadow-sm"
                  >

                    {/* Application Header */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {app.name || "Student"}
                        </h3>

                        <p className="mt-1 break-all text-sm text-gray-500">
                          {app.email || "No email"}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full px-4 py-1.5 text-sm font-semibold ${
                          currentStatus === "Accepted"
                            ? "bg-green-100 text-green-700"
                            : currentStatus === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {currentStatus}
                      </span>

                    </div>

                    {/* Internship Details */}
                    <div className="mt-5 grid grid-cols-1 gap-4 rounded-lg bg-gray-50 p-4 sm:grid-cols-3">

                      <div>
                        <p className="text-xs text-gray-500">
                          Internship
                        </p>

                        <p className="mt-1 font-semibold text-gray-800">
                          {app.title || "Internship"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Company
                        </p>

                        <p className="mt-1 font-semibold text-gray-800">
                          {app.company || "Not specified"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Applied On
                        </p>

                        <p className="mt-1 font-semibold text-gray-800">
                          {app.date || "Not available"}
                        </p>
                      </div>

                    </div>

                    {/* Action Buttons */}
                    <div className="mt-5 flex flex-wrap gap-3">

                      <button
                        type="button"
                        onClick={() => setSelectedApplication(app)}
                        className="rounded-lg border border-blue-600 px-5 py-2.5 font-medium text-blue-600 transition hover:bg-blue-50"
                      >
                        👁 View Details
                      </button>

                      <button
                        type="button"
                        onClick={() => updateStatus(app.id, "Accepted")}
                        disabled={currentStatus === "Accepted"}
                        className="rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        ✓ Accept
                      </button>

                      <button
                        type="button"
                        onClick={() => updateStatus(app.id, "Rejected")}
                        disabled={currentStatus === "Rejected"}
                        className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        ✕ Reject
                      </button>

                    </div>

                  </div>
                );
              })}
            </div>

          )}

          {/* Results Count */}
          <p className="mt-6 border-t border-gray-100 pt-4 text-sm text-gray-500">
            Showing {filteredApplications.length} of {applications.length} applications
          </p>

        </div>

        {/* Quick Links */}
        <div className="mt-7 flex flex-wrap gap-5">
          <Link
            to="/internships"
            className="font-medium text-blue-600 hover:underline"
          >
            View Internships →
          </Link>

          <Link
            to="/"
            className="font-medium text-blue-600 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>

      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
          onClick={() => setSelectedApplication(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-gray-200 pb-5">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  InternConnect
                </p>

                <h2 className="mt-1 text-2xl font-bold text-gray-800">
                  Application Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Complete student application information
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedApplication(null)}
                className="rounded-lg px-3 py-1 text-2xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                aria-label="Close details"
              >
                ×
              </button>
            </div>

            {/* Student Information */}
            <div className="mt-6">
              <h3 className="mb-4 text-lg font-bold text-gray-800">
                Student Information
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Full Name</p>
                  <p className="mt-1 break-words font-semibold text-gray-800">
                    {selectedApplication.name || "Not provided"}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Email Address</p>
                  <p className="mt-1 break-all font-semibold text-gray-800">
                    {selectedApplication.email || "Not provided"}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4 sm:col-span-2">
                  <p className="text-xs text-gray-500">Phone Number</p>
                  <p className="mt-1 font-semibold text-gray-800">
                    {selectedApplication.phone || "Not provided"}
                  </p>
                </div>

              </div>
            </div>

            {/* Internship Information */}
            <div className="mt-7">
              <h3 className="mb-4 text-lg font-bold text-gray-800">
                Internship Information
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-xs text-gray-500">Internship</p>
                  <p className="mt-1 font-semibold text-gray-800">
                    {selectedApplication.title || "Not provided"}
                  </p>
                </div>

                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-xs text-gray-500">Company</p>
                  <p className="mt-1 font-semibold text-gray-800">
                    {selectedApplication.company || "Not provided"}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Applied On</p>
                  <p className="mt-1 font-semibold text-gray-800">
                    {selectedApplication.date || "Not available"}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Application Status</p>
                  <p className="mt-1 font-semibold text-gray-800">
                    {selectedApplication.status || "Pending"}
                  </p>
                </div>

              </div>
            </div>

            {/* Cover Letter */}
            <div className="mt-7">
              <h3 className="mb-3 text-lg font-bold text-gray-800">
                Student Cover Letter
              </h3>

              <div className="whitespace-pre-wrap break-words rounded-xl border border-gray-200 bg-gray-50 p-5 text-sm leading-7 text-gray-700">
                {selectedApplication.coverLetter || "No cover letter provided."}
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="mt-7 flex flex-wrap justify-end gap-3 border-t border-gray-200 pt-5">

              <button
                type="button"
                onClick={() => setSelectedApplication(null)}
                className="rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => updateStatus(selectedApplication.id, "Accepted")}
                disabled={(selectedApplication.status || "Pending") === "Accepted"}
                className="rounded-lg bg-green-600 px-5 py-2.5 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ✓ Accept
              </button>

              <button
                type="button"
                onClick={() => updateStatus(selectedApplication.id, "Rejected")}
                disabled={(selectedApplication.status || "Pending") === "Rejected"}
                className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ✕ Reject
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
