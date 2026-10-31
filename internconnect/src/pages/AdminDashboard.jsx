
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [internships, setInternships] = useState([]);

  // Load all portal data
  const loadData = () => {
    try {
      const savedUsers = JSON.parse(
        localStorage.getItem("users") || "[]"
      );

      const savedApplications = JSON.parse(
        localStorage.getItem("applications") || "[]"
      );

      const savedInternships = JSON.parse(
        localStorage.getItem("internships") || "[]"
      );

      setUsers(Array.isArray(savedUsers) ? savedUsers : []);
      setApplications(
        Array.isArray(savedApplications) ? savedApplications : []
      );
      setInternships(
        Array.isArray(savedInternships) ? savedInternships : []
      );
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  useEffect(() => {
    loadData();

    const events = [
      "storage",
      "userRegistered",
      "usersUpdated",
      "applicationsUpdated",
      "internshipsUpdated",
    ];

    events.forEach((event) => {
      window.addEventListener(event, loadData);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, loadData);
      });
    };
  }, []);

  // User statistics
  const students = users.filter(
    (user) => !user.role || user.role === "student"
  );

  const companies = users.filter(
    (user) => user.role === "company"
  );

  // Application statistics
  const pending = applications.filter(
    (app) => app.status === "Pending"
  ).length;

  const accepted = applications.filter(
    (app) => app.status === "Accepted"
  ).length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  // Application status styling
  const getStatusStyle = (status) => {
    if (status === "Accepted") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Rejected") {
      return "bg-red-100 text-red-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Dashboard Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 p-6 text-white shadow-lg sm:flex-row sm:items-center md:p-8">

          <div>
            <p className="mb-2 text-sm font-semibold tracking-wider text-blue-100">
              INTERNCONNECT ADMIN PANEL
            </p>

            <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm text-blue-100 sm:text-base">
              Monitor students, companies, internships and portal activities.
            </p>
          </div>

          <button
            onClick={loadData}
            className="rounded-lg bg-white px-5 py-3 font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
          >
            ↻ Refresh Data
          </button>

        </div>

        {/* Statistics Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total Students"
            value={students.length}
            icon="🎓"
            color="blue"
          />

          <StatCard
            title="Total Companies"
            value={companies.length}
            icon="🏢"
            color="purple"
          />

          <StatCard
            title="Total Internships"
            value={internships.length}
            icon="💼"
            color="orange"
          />

          <StatCard
            title="Total Applications"
            value={applications.length}
            icon="📄"
            color="green"
          />

        </div>

        {/* Application Overview */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Application Overview
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Track the status of internship applications.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

            <StatusCard
              title="Pending Applications"
              value={pending}
              color="yellow"
            />

            <StatusCard
              title="Accepted Applications"
              value={accepted}
              color="green"
            />

            <StatusCard
              title="Rejected Applications"
              value={rejected}
              color="red"
            />

          </div>

        </div>

        {/* Recent Applications */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-100 p-5 sm:p-6">

            <h2 className="text-xl font-bold text-gray-800">
              Recent Applications
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Monitor application activities across the portal.
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[750px] text-left">

              <thead className="bg-gray-50 text-sm text-gray-600">
                <tr>
                  <th className="px-5 py-4">Student</th>
                  <th className="px-5 py-4">Internship</th>
                  <th className="px-5 py-4">Company</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {applications.length > 0 ? (
                  [...applications]
                    .reverse()
                    .slice(0, 8)
                    .map((app) => (

                      <tr
                        key={app.id}
                        className="transition hover:bg-gray-50"
                      >

                        <td className="px-5 py-4">
                          <p className="font-medium text-gray-800">
                            {app.name || "N/A"}
                          </p>

                          <p className="text-xs text-gray-500">
                            {app.email || ""}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-gray-700">
                          {app.title || "N/A"}
                        </td>

                        <td className="px-5 py-4 text-gray-700">
                          {app.company || "N/A"}
                        </td>

                        <td className="px-5 py-4 text-gray-600">
                          {app.date || "N/A"}
                        </td>

                        <td className="px-5 py-4">

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                              app.status
                            )}`}
                          >
                            {app.status || "Pending"}
                          </span>

                        </td>

                      </tr>

                    ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-5 py-12 text-center text-gray-500"
                    >
                      No applications available yet.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};


// Statistics Card
const StatCard = ({ title, value, icon, color }) => {

  const colorStyles = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
    green: "bg-green-50 text-green-600",
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="flex items-center justify-between gap-3">

        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-gray-800">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${colorStyles[color]}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
};


// Application Status Card
const StatusCard = ({ title, value, color }) => {

  const styles = {
    yellow: "bg-yellow-50 text-yellow-800 border-yellow-100",
    green: "bg-green-50 text-green-800 border-green-100",
    red: "bg-red-50 text-red-800 border-red-100",
  };

  return (
    <div className={`rounded-xl border p-5 ${styles[color]}`}>

      <p className="text-sm font-medium">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold">
        {value}
      </h3>

    </div>
  );
};

export default AdminDashboard;
