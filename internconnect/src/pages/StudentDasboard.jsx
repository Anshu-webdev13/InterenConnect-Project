
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Get logged-in student
  const getCurrentUser = () => {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "null");
    } catch {
      return null;
    }
  };

  // Load only logged-in student's applications
  const loadApplications = useCallback(() => {
    try {
      const currentUser = getCurrentUser();

      if (!currentUser?.email) {
        setApplications([]);
        return;
      }

      const savedApplications = JSON.parse(
        localStorage.getItem("applications") || "[]"
      );

      const allApplications = Array.isArray(savedApplications)
        ? savedApplications
        : [];

      const studentApplications = allApplications.filter(
        (app) =>
          (app.email || "").toLowerCase() ===
          currentUser.email.toLowerCase()
      );

      setApplications(studentApplications);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error loading applications:", error);
      setApplications([]);
    }
  }, []);

  // Listen for application updates
  useEffect(() => {
    loadApplications();

    const handleStorageChange = (event) => {
      if (
        event.key === "applications" ||
        event.key === "currentUser" ||
        event.key === null
      ) {
        loadApplications();
      }
    };

    window.addEventListener("applicationsUpdated", loadApplications);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("applicationsUpdated", loadApplications);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadApplications]);

  // Application Statistics
  const totalApplications = applications.length;

  const pendingApplications = applications.filter(
    (app) => (app.status || "Pending") === "Pending"
  ).length;

  const acceptedApplications = applications.filter(
    (app) => app.status === "Accepted"
  ).length;

  const rejectedApplications = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  // Statistics Cards
  const stats = [
    {
      title: "Total Applications",
      count: totalApplications,
      icon: "📄",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Pending",
      count: pendingApplications,
      icon: "⏳",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Accepted",
      count: acceptedApplications,
      icon: "✓",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Rejected",
      count: rejectedApplications,
      icon: "✕",
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  // Recent Applications
  const recentApplications = [...applications]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 3);

  // Quick Actions
  const quickActions = [
    {
      title: "Explore Internships",
      description: "Discover new internship opportunities.",
      icon: "🔍",
      link: "/internships",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "My Applications",
      description: "Track your submitted applications.",
      icon: "📋",
      link: "/myapplications",
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Edit Profile",
      description: "Update your personal information.",
      icon: "👤",
      link: "/editprofile",
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Notifications",
      description: "Check your latest application updates.",
      icon: "🔔",
      link: "/notifications",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  // Status Styles
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

  const currentUser = getCurrentUser();
  const studentName = currentUser?.name || "Student";

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">

        {/* Welcome Header */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-600 px-5 py-8 text-white shadow-md sm:px-8 sm:py-10">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">
            InternConnect
          </p>

          <h1 className="mt-3 text-2xl font-bold sm:text-3xl md:text-4xl">
            Student Dashboard
          </h1>

          <p className="mt-2 text-lg font-semibold">
            Welcome, {studentName}!
          </p>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
            Manage your internship applications, explore new opportunities
            and take the next step towards your career.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Link
              to="/internships"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Explore Internships →
            </Link>

            <button
              type="button"
              onClick={loadApplications}
              className="rounded-lg border border-white/50 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              ↻ Refresh Dashboard
            </button>
          </div>

          <p className="mt-4 text-xs text-blue-100">
            Last refreshed:{" "}
            {lastUpdated
              ? lastUpdated.toLocaleTimeString()
              : "Loading..."}
          </p>
        </div>

        {/* Statistics Section */}
        <div className="mb-9">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Application Overview
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              A quick summary of your internship applications.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6"
              >
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl sm:h-12 sm:w-12 ${stat.bg}`}
                  >
                    {stat.icon}
                  </div>

                  <span
                    className={`text-2xl font-bold sm:text-3xl ${stat.color}`}
                  >
                    {stat.count}
                  </span>
                </div>

                <p className="mt-4 text-xs font-medium text-gray-500 sm:text-sm">
                  {stat.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-9">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Access your important student activities.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.link}
                className="group rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md sm:p-6"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${action.color}`}
                >
                  {action.icon}
                </div>

                <h3 className="mt-4 font-bold text-gray-800 transition group-hover:text-blue-600">
                  {action.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {action.description}
                </p>

                <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                  Open Page →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Recent Applications
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your latest internship application activity.
              </p>
            </div>

            {applications.length > 0 && (
              <Link
                to="/myapplications"
                className="text-sm font-semibold text-blue-600 transition hover:text-blue-800"
              >
                View All Applications →
              </Link>
            )}
          </div>

          {/* Empty State */}
          {applications.length === 0 ? (
            <div className="rounded-xl bg-slate-50 px-4 py-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
                📄
              </div>

              <h3 className="mt-4 text-lg font-bold text-gray-800">
                No Applications Yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                You haven't applied for any internships yet. Explore
                opportunities and start your career journey today.
              </p>

              <Link
                to="/internships"
                className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Apply for an Internship
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentApplications.map((app) => {
                const currentStatus = app.status || "Pending";

                return (
                  <div
                    key={app.id}
                    className="flex flex-col gap-4 rounded-xl border border-gray-100 p-4 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                  >
                    <div className="min-w-0">
                      <h3 className="break-words font-bold text-gray-800">
                        {app.title || "Internship"}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {app.company || "Company not specified"}
                      </p>

                      <p className="mt-2 text-xs text-gray-400">
                        Applied on: {app.date || "Date not available"}
                      </p>
                    </div>

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
                );
              })}
            </div>
          )}
        </div>

        {/* Student Profile Link */}
        <div className="mt-8 flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h3 className="font-bold text-gray-800">
              Manage Your Student Profile
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Keep your profile information up to date.
            </p>
          </div>

          <Link
            to="/studentprofile"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-blue-600 px-5 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            View Profile →
          </Link>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
