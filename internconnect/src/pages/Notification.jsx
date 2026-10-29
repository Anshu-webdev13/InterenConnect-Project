import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const Notification = () => {
  const [applications, setApplications] = useState([]);

  // Load applications from localStorage
  const loadApplications = useCallback(() => {
    try {
      const savedApplications = JSON.parse(
        localStorage.getItem("applications") || "[]",
      );

      setApplications(
        Array.isArray(savedApplications) ? savedApplications : [],
      );
    } catch (error) {
      console.error("Error loading notifications:", error);
      setApplications([]);
    }
  }, []);

  useEffect(() => {
    loadApplications();

    // Update notifications when Admin changes application status
    window.addEventListener("applicationsUpdated", loadApplications);

    // Update when localStorage changes in another tab
    window.addEventListener("storage", loadApplications);

    return () => {
      window.removeEventListener("applicationsUpdated", loadApplications);
      window.removeEventListener("storage", loadApplications);
    };
  }, [loadApplications]);

  const notifications = [...applications].reverse().map((app) => {
    const status = app.status || "Pending";

    return {
      id: app.id,
      title:
        status === "Accepted"
          ? "Application Accepted!"
          : status === "Rejected"
            ? "Application Rejected"
            : "Application Submitted",
      message:
        status === "Accepted"
          ? `Congratulations! Your application for ${app.title || "Internship"} at ${app.company || "the company"} has been accepted.`
          : status === "Rejected"
            ? `Your application for ${app.title || "Internship"} at ${app.company || "the company"} was rejected.`
            : `Your application for ${app.title || "Internship"} at ${app.company || "the company"} is currently pending.`,
      status,
      date: app.date,
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>

          <p className="text-gray-600 mt-2">
            Stay updated on your internship applications.
          </p>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🔔</div>

              <h2 className="text-xl font-semibold text-gray-800">
                No Notifications Yet
              </h2>

              <p className="text-gray-500 mt-2">
                Apply for an internship to see updates here.
              </p>

              <Link
                to="/internships"
                className="inline-block mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Explore Internships
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="border border-gray-200 rounded-lg p-5 flex gap-4"
                >
                  <div className="text-2xl">
                    {notification.status === "Accepted"
                      ? "✅"
                      : notification.status === "Rejected"
                        ? "❌"
                        : "🔔"}
                  </div>

                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-800">
                      {notification.title}
                    </h2>

                    <p className="text-gray-600 mt-1">{notification.message}</p>

                    <p className="text-sm text-gray-400 mt-3">
                      {notification.date || "Date not available"}
                    </p>

                    <span
                      className={`inline-block mt-3 px-3 py-1 rounded-full text-sm ${
                        notification.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : notification.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {notification.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back to Dashboard */}
        <div className="mt-6">
          <Link
            to="/studentdashboard"
            className="text-blue-600 font-medium hover:underline"
          >
            ← Back to Student Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Notification;
