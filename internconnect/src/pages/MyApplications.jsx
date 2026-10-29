import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  // Applications load karna
  const loadApplications = useCallback(() => {
    try {
      const savedApplications = JSON.parse(
        localStorage.getItem("applications") || "[]",
      );

      setApplications(
        Array.isArray(savedApplications) ? savedApplications : [],
      );
    } catch (error) {
      console.error("Error loading applications:", error);
      setApplications([]);
    }
  }, []);

  // Initial load aur status changes listen karna
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
        handleApplicationsUpdated,
      );
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadApplications]);

  const statusStyle = {
    Pending: "bg-yellow-100 text-yellow-700",
    Accepted: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  // Statistics
  const pendingCount = applications.filter(
    (app) => (app.status || "Pending") === "Pending",
  ).length;

  const acceptedCount = applications.filter(
    (app) => app.status === "Accepted",
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === "Rejected",
  ).length;

  // Status filter
  const filteredApplications = applications.filter((app) => {
    const status = app.status || "Pending";

    return statusFilter === "All" || status === statusFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
            My Applications
          </h1>

          <p className="mt-3 text-gray-600">
            Track your internship applications and their latest status.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-gray-500">Total Applications</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {applications.length}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-gray-500">Pending</p>
            <h2 className="mt-2 text-3xl font-bold text-yellow-600">
              {pendingCount}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-gray-500">Accepted</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {acceptedCount}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-gray-500">Rejected</p>
            <h2 className="mt-2 text-3xl font-bold text-red-600">
              {rejectedCount}
            </h2>
          </div>
        </div>

        {/* Applications and Filter */}
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Your Applications
          </h2>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="All">All Applications</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Empty State */}
        {filteredApplications.length === 0 ? (
          <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
            <div className="mb-4 text-5xl">📄</div>

            <h3 className="text-xl font-semibold text-gray-800">
              {applications.length === 0
                ? "No Applications Yet"
                : "No Applications Found"}
            </h3>

            <p className="mb-6 mt-3 text-gray-500">
              {applications.length === 0
                ? "Explore internships and start your career journey!"
                : "There are no applications with this status."}
            </p>

            {applications.length === 0 && (
              <Link
                to="/internships"
                className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                Explore Internships
              </Link>
            )}
          </div>
        ) : (
          /* Application Cards */
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredApplications.map((app) => {
              const currentStatus = app.status || "Pending";

              return (
                <div
                  key={app.id}
                  className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {app.title || "Internship"}
                      </h3>

                      <p className="mt-2 text-gray-600">
                        {app.company || "Company"}
                      </p>
                    </div>

                    <span
                      className={`whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium ${
                        statusStyle[currentStatus] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {currentStatus}
                    </span>
                  </div>

                  <div className="mt-5 space-y-2 border-t pt-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-800">
                        Application Date:
                      </span>{" "}
                      {app.date || "Not available"}
                    </p>

                    {app.name && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-800">
                          Applicant:
                        </span>{" "}
                        {app.name}
                      </p>
                    )}

                    {app.email && (
                      <p className="break-all text-sm text-gray-600">
                        <span className="font-medium text-gray-800">
                          Email:
                        </span>{" "}
                        {app.email}
                      </p>
                    )}
                  </div>

                  <div className="mt-5">
                    {currentStatus === "Accepted" && (
                      <p className="mb-3 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                        Congratulations! Your application has been accepted.
                      </p>
                    )}

                    {currentStatus === "Rejected" && (
                      <p className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                        Your application was not selected this time.
                      </p>
                    )}

                    {currentStatus === "Pending" && (
                      <p className="mb-3 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-700">
                        Your application is awaiting review.
                      </p>
                    )}

                    <Link
                      to="/internships"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Explore More Internships →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8">
          <Link
            to="/"
            className="font-medium text-gray-600 hover:text-blue-600"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
