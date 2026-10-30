
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  // Load applications
  const loadApplications = useCallback(() => {
    try {
      const savedApplications = JSON.parse(
        localStorage.getItem("applications") || "[]"
      );

      setApplications(
        Array.isArray(savedApplications) ? savedApplications : []
      );
    } catch (error) {
      console.error("Error loading applications:", error);
      setApplications([]);
    }
  }, []);

  // Listen for application updates
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

    window.addEventListener(
      "applicationsUpdated",
      handleApplicationsUpdated
    );

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(
        "applicationsUpdated",
        handleApplicationsUpdated
      );

      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadApplications]);

  // Statistics
  const pendingCount = applications.filter(
    (app) => (app.status || "Pending") === "Pending"
  ).length;

  const acceptedCount = applications.filter(
    (app) => app.status === "Accepted"
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const status = app.status || "Pending";

    return statusFilter === "All" || status === statusFilter;
  });

  // Status styles
  const statusStyle = {
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Accepted: "bg-green-50 text-green-700 border-green-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
  };

  const statusDot = {
    Pending: "bg-amber-500",
    Accepted: "bg-green-500",
    Rejected: "bg-red-500",
  };

  const statistics = [
    {
      title: "Total Applications",
      count: applications.length,
      icon: "📄",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Pending",
      count: pendingCount,
      icon: "⏳",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Accepted",
      count: acceptedCount,
      icon: "✓",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Rejected",
      count: rejectedCount,
      icon: "✕",
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-8 sm:px-6 sm:py-10">

      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Student Dashboard
            </p>

            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              My Applications
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Manage and track all your internship applications in one place.
            </p>
          </div>

          <Link
            to="/internships"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            + Explore Internships
          </Link>

        </div>

        {/* Statistics Cards */}
        <div className="mb-9 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">

          {statistics.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6"
            >
              <div className="flex items-center justify-between gap-2">

                <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl sm:h-12 sm:w-12 ${item.bg}`}>
                  {item.icon}
                </div>

                <span className={`text-2xl font-bold sm:text-3xl ${item.color}`}>
                  {item.count}
                </span>

              </div>

              <p className="mt-4 text-xs font-medium text-gray-500 sm:text-sm">
                {item.title}
              </p>
            </div>
          ))}

        </div>

        {/* Applications Section */}
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Your Applications
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredApplications.length} application(s) found
            </p>
          </div>

          {/* Status Filter */}
          <div className="w-full sm:w-56">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All Applications</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

        </div>

        {/* Empty State */}
        {filteredApplications.length === 0 ? (

          <div className="rounded-2xl border border-gray-100 bg-white px-5 py-12 text-center shadow-sm sm:py-16">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
              📄
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-800">
              {applications.length === 0
                ? "No Applications Yet"
                : "No Applications Found"}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {applications.length === 0
                ? "You haven't applied for any internships yet. Explore available opportunities and take the first step towards your career."
                : "There are no applications available with the selected status."}
            </p>

            {applications.length === 0 && (
              <Link
                to="/internships"
                className="mt-6 inline-flex rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Explore Internships
              </Link>
            )}

          </div>

        ) : (

          /* Application Cards */
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

            {filteredApplications.map((app) => {
              const currentStatus = app.status || "Pending";

              return (
                <div
                  key={app.id}
                  className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                >

                  {/* Card Header */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                    <div className="min-w-0">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
                        Internship Application
                      </p>

                      <h3 className="break-words text-lg font-bold text-gray-900 sm:text-xl">
                        {app.title || "Internship"}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {app.company || "Company"}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                        statusStyle[currentStatus] ||
                        "bg-gray-50 text-gray-700 border-gray-200"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          statusDot[currentStatus] || "bg-gray-500"
                        }`}
                      ></span>

                      {currentStatus}
                    </span>

                  </div>

                  {/* Application Details */}
                  <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">

                    <div className="flex flex-col gap-1 text-sm sm:flex-row sm:justify-between">
                      <span className="font-medium text-gray-500">
                        Application Date
                      </span>

                      <span className="text-gray-800">
                        {app.date || "Not available"}
                      </span>
                    </div>

                    {app.name && (
                      <div className="flex flex-col gap-1 text-sm sm:flex-row sm:justify-between">
                        <span className="font-medium text-gray-500">
                          Applicant
                        </span>

                        <span className="text-gray-800">
                          {app.name}
                        </span>
                      </div>
                    )}

                    {app.email && (
                      <div className="flex flex-col gap-1 text-sm sm:flex-row sm:justify-between">
                        <span className="font-medium text-gray-500">
                          Email Address
                        </span>

                        <span className="break-all text-gray-800 sm:text-right">
                          {app.email}
                        </span>
                      </div>
                    )}

                  </div>

                  {/* Status Message */}
                  <div className="mt-5">

                    {currentStatus === "Accepted" && (
                      <div className="rounded-lg border border-green-100 bg-green-50 p-3 text-sm leading-6 text-green-700">
                        Congratulations! Your application has been accepted.
                      </div>
                    )}

                    {currentStatus === "Rejected" && (
                      <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm leading-6 text-red-700">
                        Your application was not selected this time. Keep exploring new opportunities.
                      </div>
                    )}

                    {currentStatus === "Pending" && (
                      <div className="rounded-lg border border-amber-100 bg-amber-50 p-3 text-sm leading-6 text-amber-700">
                        Your application is awaiting review. Please check back for updates.
                      </div>
                    )}

                  </div>

                  {/* Card Footer */}
                  <div className="mt-5 border-t border-gray-100 pt-4">
                    <Link
                      to="/internships"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                    >
                      Explore More Internships
                      <span>→</span>
                    </Link>
                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* Footer */}
        <div className="mt-9 border-t border-gray-200 pt-6">
          <Link
            to="/studentdashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-blue-600"
          >
            ← Back to Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
};

export default MyApplications;
