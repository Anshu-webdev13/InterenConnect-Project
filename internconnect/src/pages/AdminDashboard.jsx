 
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [internships, setInternships] = useState([]);

  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");

  // Load all portal data
  const loadData = () => {
    try {
      const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
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

    window.addEventListener("storage", loadData);
    window.addEventListener("userRegistered", loadData);
    window.addEventListener("applicationsUpdated", loadData);
    window.addEventListener("internshipsUpdated", loadData);

    return () => {
      window.removeEventListener("storage", loadData);
      window.removeEventListener("userRegistered", loadData);
      window.removeEventListener("applicationsUpdated", loadData);
      window.removeEventListener("internshipsUpdated", loadData);
    };
  }, []);

  const students = users.filter(
    (user) => !user.role || user.role === "student"
  );

  const companies = users.filter(
    (user) => user.role === "company"
  );

  const pending = applications.filter(
    (app) => app.status === "Pending"
  ).length;

  const accepted = applications.filter(
    (app) => app.status === "Accepted"
  ).length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  // Search students and companies
  const filteredUsers = users.filter((user) => {
    const matchesRole =
      activeTab === "students"
        ? !user.role || user.role === "student"
        : user.role === "company";

    const searchText = search.toLowerCase();

    return (
      matchesRole &&
      (
        user.name?.toLowerCase().includes(searchText) ||
        user.companyName?.toLowerCase().includes(searchText) ||
        user.email?.toLowerCase().includes(searchText)
      )
    );
  });

  // Delete student or company account
  const deleteUser = (userId) => {
    const userToDelete = users.find(
      (user) => String(user.id) === String(userId)
    );

    if (!userToDelete) return;

    const roleName =
      userToDelete.role === "company" ? "company" : "student";

    const confirmDelete = window.confirm(
      `Are you sure you want to remove this ${roleName} account?`
    );

    if (!confirmDelete) return;

    const updatedUsers = users.filter(
      (user) => String(user.id) !== String(userId)
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setUsers(updatedUsers);
    window.dispatchEvent(new Event("usersUpdated"));

    alert("Account removed successfully.");
  };

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

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-sm font-semibold text-blue-600">
              INTERNCONNECT ADMIN
            </p>

            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage students, companies and monitor portal activities.
            </p>
          </div>

          <button
            onClick={loadData}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-100"
          >
            Refresh Data
          </button>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

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

        {/* Application Statistics */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 text-xl font-bold text-gray-800">
            Application Overview
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

            <div className="rounded-lg bg-yellow-50 p-5">
              <p className="text-sm text-yellow-700">Pending</p>
              <h3 className="mt-2 text-3xl font-bold text-yellow-800">
                {pending}
              </h3>
            </div>

            <div className="rounded-lg bg-green-50 p-5">
              <p className="text-sm text-green-700">Accepted</p>
              <h3 className="mt-2 text-3xl font-bold text-green-800">
                {accepted}
              </h3>
            </div>

            <div className="rounded-lg bg-red-50 p-5">
              <p className="text-sm text-red-700">Rejected</p>
              <h3 className="mt-2 text-3xl font-bold text-red-800">
                {rejected}
              </h3>
            </div>

          </div>
        </div>

        {/* Management Tabs */}
        <div className="mb-6 flex flex-wrap gap-3">
          {[
            { id: "overview", label: "Overview" },
            { id: "students", label: "Manage Students" },
            { id: "companies", label: "Manage Companies" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSearch("");
              }}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow"
                  : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Students / Companies Management */}
        {(activeTab === "students" || activeTab === "companies") && (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            <div className="flex flex-col justify-between gap-4 border-b p-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {activeTab === "students"
                    ? "Manage Students"
                    : "Manage Companies"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {filteredUsers.length} records found
                </p>
              </div>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 sm:max-w-xs"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left">
                <thead className="bg-gray-50 text-sm text-gray-600">
                  <tr>
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Role</th>
                    <th className="px-5 py-4">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-5 py-4 font-medium text-gray-800">
                          {user.role === "company"
                            ? user.companyName || user.name
                            : user.name}
                        </td>

                        <td className="px-5 py-4 text-gray-600">
                          {user.email}
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                            {user.role || "student"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-5 py-10 text-center text-gray-500"
                      >
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recent Applications */}
        {activeTab === "overview" && (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b p-5">
              <h2 className="text-xl font-bold text-gray-800">
                Recent Applications
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Monitor application activity across the portal.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left">
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
                        <tr key={app.id} className="hover:bg-gray-50">
                          <td className="px-5 py-4">
                            <p className="font-medium text-gray-800">
                              {app.name || "N/A"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {app.email}
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
                        className="px-5 py-10 text-center text-gray-500"
                      >
                        No applications available yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

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
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-gray-800">
            {value}
          </h3>
        </div>

        <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${colorStyles[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

