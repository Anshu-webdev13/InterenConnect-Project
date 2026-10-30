
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const Notification = () => {
  const [applications, setApplications] = useState([]);
  const [readNotifications, setReadNotifications] = useState(
    JSON.parse(localStorage.getItem("readNotifications") || "[]")
  );
  const [clearedNotifications, setClearedNotifications] = useState(
    JSON.parse(localStorage.getItem("clearedNotifications") || "[]")
  );

  // Load Applications
  const loadApplications = useCallback(() => {
    try {
      const savedApplications = JSON.parse(
        localStorage.getItem("applications") || "[]"
      );

      setApplications(
        Array.isArray(savedApplications) ? savedApplications : []
      );
    } catch (error) {
      console.error("Error loading notifications:", error);
      setApplications([]);
    }
  }, []);

  useEffect(() => {
    loadApplications();

    window.addEventListener("applicationsUpdated", loadApplications);
    window.addEventListener("storage", loadApplications);

    return () => {
      window.removeEventListener("applicationsUpdated", loadApplications);
      window.removeEventListener("storage", loadApplications);
    };
  }, [loadApplications]);

  // Create Notifications
  const notifications = [...applications]
    .reverse()
    .map((app) => {
      const status = app.status || "Pending";
      const id = `${app.id}-${status}`;

      return {
        id,
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
        date: app.date || "Date not available",
      };
    })
    .filter((notification) => !clearedNotifications.includes(notification.id));

  const unreadCount = notifications.filter(
    (notification) => !readNotifications.includes(notification.id)
  ).length;

  // Mark as Read
  const markAsRead = (id) => {
    const updatedRead = [...new Set([...readNotifications, id])];

    setReadNotifications(updatedRead);
    localStorage.setItem(
      "readNotifications",
      JSON.stringify(updatedRead)
    );
  };

  // Mark All as Read
  const markAllAsRead = () => {
    const allIds = notifications.map((notification) => notification.id);

    const updatedRead = [
      ...new Set([...readNotifications, ...allIds]),
    ];

    setReadNotifications(updatedRead);
    localStorage.setItem(
      "readNotifications",
      JSON.stringify(updatedRead)
    );
  };

  // Clear All Notifications
  const clearAllNotifications = () => {
    const allIds = notifications.map((notification) => notification.id);

    const updatedCleared = [
      ...new Set([...clearedNotifications, ...allIds]),
    ];

    setClearedNotifications(updatedCleared);
    localStorage.setItem(
      "clearedNotifications",
      JSON.stringify(updatedCleared)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 md:p-8 text-white mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-blue-100 mb-2">
                Stay Updated
              </p>

              <h1 className="text-3xl md:text-4xl font-bold">
                Notifications
              </h1>

              <p className="text-blue-100 mt-2">
                Get the latest updates about your internship applications.
              </p>
            </div>

            <div className="text-5xl">
              🔔
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

          <div className="bg-white rounded-xl shadow-sm border p-5">
            <p className="text-gray-500 text-sm">
              Total Notifications
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              {notifications.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-5">
            <p className="text-gray-500 text-sm">
              Unread Notifications
            </p>

            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {unreadCount}
            </h2>
          </div>

        </div>

        {/* Notification Actions */}
        {notifications.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

            <h2 className="text-xl font-bold text-gray-800">
              Recent Notifications
            </h2>

            <div className="flex flex-wrap gap-3">

              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-blue-600 font-medium hover:text-blue-800"
                >
                  Mark All as Read
                </button>
              )}

              <button
                onClick={clearAllNotifications}
                className="text-red-600 font-medium hover:text-red-800"
              >
                Clear All
              </button>

            </div>
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-4">

          {notifications.length === 0 ? (

            <div className="bg-white rounded-2xl shadow-sm border p-8 md:p-12 text-center">

              <div className="text-6xl mb-4">
                🔔
              </div>

              <h2 className="text-2xl font-bold text-gray-800">
                No Notifications Yet
              </h2>

              <p className="text-gray-500 mt-2">
                Apply for an internship to receive updates here.
              </p>

              <Link
                to="/internships"
                className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Explore Internships
              </Link>

            </div>

          ) : (

            notifications.map((notification) => {
              const isRead = readNotifications.includes(notification.id);

              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-xl border shadow-sm p-5 md:p-6 flex gap-4 transition ${
                    isRead
                      ? "border-gray-200"
                      : "border-blue-300 bg-blue-50/40"
                  }`}
                >

                  {/* Icon */}
                  <div className="text-3xl shrink-0">
                    {notification.status === "Accepted"
                      ? "✅"
                      : notification.status === "Rejected"
                      ? "❌"
                      : "📩"}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="font-bold text-gray-800">
                        {notification.title}
                      </h3>

                      {!isRead && (
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                          New
                        </span>
                      )}

                    </div>

                    <p className="text-gray-600 text-sm md:text-base mt-2 leading-relaxed">
                      {notification.message}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-4">

                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          notification.status === "Accepted"
                            ? "bg-green-100 text-green-700"
                            : notification.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {notification.status}
                      </span>

                      <span className="text-sm text-gray-400">
                        📅 {notification.date}
                      </span>

                    </div>

                    {!isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-sm text-blue-600 font-semibold mt-4 hover:underline"
                      >
                        Mark as Read
                      </button>
                    )}

                    {isRead && (
                      <p className="text-xs text-gray-400 mt-4">
                        ✓ Read
                      </p>
                    )}

                  </div>

                </div>
              );
            })

          )}

        </div>

        {/* Back to Dashboard */}
        <div className="mt-8">
          <Link
            to="/studentdashboard"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition"
          >
            ← Back to Student Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Notification;