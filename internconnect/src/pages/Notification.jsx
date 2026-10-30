import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const Notification = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  const userEmail = (currentUser?.email || "").toLowerCase().trim();

  // Separate notification storage for each student
  const readKey = `readNotifications_${userEmail}`;
  const clearedKey = `clearedNotifications_${userEmail}`;

  const [applications, setApplications] = useState([]);
  const [readNotifications, setReadNotifications] = useState([]);
  const [clearedNotifications, setClearedNotifications] = useState([]);

  // Load student's applications
  const loadApplications = useCallback(() => {
    try {
      const savedApplications = JSON.parse(
        localStorage.getItem("applications") || "[]",
      );

      const studentApplications = Array.isArray(savedApplications)
        ? savedApplications.filter(
            (app) => (app.email || "").toLowerCase().trim() === userEmail,
          )
        : [];

      setApplications(studentApplications);

      const savedRead = JSON.parse(localStorage.getItem(readKey) || "[]");

      const savedCleared = JSON.parse(localStorage.getItem(clearedKey) || "[]");

      setReadNotifications(Array.isArray(savedRead) ? savedRead : []);
      setClearedNotifications(Array.isArray(savedCleared) ? savedCleared : []);
    } catch (error) {
      console.error("Error loading notifications:", error);
      setApplications([]);
      setReadNotifications([]);
      setClearedNotifications([]);
    }
  }, [userEmail, readKey, clearedKey]);

  useEffect(() => {
    loadApplications();

    const handleStorageChange = (event) => {
      if (
        event.key === "applications" ||
        event.key === readKey ||
        event.key === clearedKey ||
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
  }, [loadApplications, readKey, clearedKey]);

  // Create notifications from application status
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
    (notification) => !readNotifications.includes(notification.id),
  ).length;

  // Save read notifications
  const saveReadNotifications = (updatedRead) => {
    setReadNotifications(updatedRead);
    localStorage.setItem(readKey, JSON.stringify(updatedRead));
  };

  // Mark one notification as read
  const markAsRead = (id) => {
    const updatedRead = [...new Set([...readNotifications, id])];
    saveReadNotifications(updatedRead);
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    const allIds = notifications.map((notification) => notification.id);

    const updatedRead = [...new Set([...readNotifications, ...allIds])];

    saveReadNotifications(updatedRead);
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    const allIds = notifications.map((notification) => notification.id);

    const updatedCleared = [...new Set([...clearedNotifications, ...allIds])];

    setClearedNotifications(updatedCleared);
    localStorage.setItem(clearedKey, JSON.stringify(updatedCleared));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white md:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-blue-100">Stay Updated</p>

              <h1 className="text-3xl font-bold md:text-4xl">Notifications</h1>

              <p className="mt-2 text-blue-100">
                Hello {currentUser?.name || "Student"}, stay updated about your
                internship applications.
              </p>
            </div>

            <div className="text-5xl">🔔</div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Notifications</p>

            <h2 className="mt-2 text-3xl font-bold text-gray-800">
              {notifications.length}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Unread Notifications</p>

            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {unreadCount}
            </h2>
          </div>
        </div>

        {/* Notification Actions */}
        {notifications.length > 0 && (
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              Recent Notifications
            </h2>

            <div className="flex flex-wrap gap-4">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                  Mark All as Read
                </button>
              )}

              <button
                onClick={clearAllNotifications}
                className="text-sm font-semibold text-red-600 hover:text-red-800"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="rounded-2xl border bg-white p-8 text-center shadow-sm md:p-12">
              <div className="mb-4 text-6xl">🔔</div>

              <h2 className="text-2xl font-bold text-gray-800">
                No Notifications Yet
              </h2>

              <p className="mt-2 text-gray-500">
                Apply for an internship to receive updates here.
              </p>

              <Link
                to="/internships"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
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
                  className={`flex gap-4 rounded-xl border p-5 shadow-sm transition md:p-6 ${
                    isRead
                      ? "border-gray-200 bg-white"
                      : "border-blue-300 bg-blue-50/40"
                  }`}
                >
                  {/* Icon */}
                  <div className="shrink-0 text-3xl">
                    {notification.status === "Accepted"
                      ? "✅"
                      : notification.status === "Rejected"
                        ? "❌"
                        : "📩"}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-gray-800">
                        {notification.title}
                      </h3>

                      {!isRead && (
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                          New
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-gray-600 md:text-base">
                      {notification.message}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
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

                    {!isRead ? (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="mt-4 text-sm font-semibold text-blue-600 hover:underline"
                      >
                        Mark as Read
                      </button>
                    ) : (
                      <p className="mt-4 text-xs text-gray-400">✓ Read</p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Back to Dashboard */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <Link
            to="/studentdashboard"
            className="inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-800"
          >
            ← Back to Student Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Notification;
