
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const CompanyDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [companyInternships, setCompanyInternships] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const getCurrentUser = () => {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "null");
    } catch {
      return null;
    }
  };

  // Load company internships and related applications
  const loadCompanyData = useCallback(() => {
    try {
      const currentUser = getCurrentUser();

      if (!currentUser) {
        setCompanyInternships([]);
        setApplications([]);
        return;
      }

      const savedInternships = JSON.parse(
        localStorage.getItem("internships") || "[]"
      );

      const savedApplications = JSON.parse(
        localStorage.getItem("applications") || "[]"
      );

      const allInternships = Array.isArray(savedInternships)
        ? savedInternships
        : [];

      const allApplications = Array.isArray(savedApplications)
        ? savedApplications
        : [];

      const ownedInternships = allInternships.filter((internship) => {
        const sameId =
          internship.companyId != null &&
          String(internship.companyId) === String(currentUser.id);

        const sameEmail =
          internship.companyEmail &&
          internship.companyEmail.toLowerCase() ===
            (currentUser.email || "").toLowerCase();

        return sameId || sameEmail;
      });

      const ownedInternshipIds = ownedInternships.map((internship) =>
        String(internship.id)
      );

      const companyApplications = allApplications.filter((application) =>
        ownedInternshipIds.includes(String(application.internshipId))
      );

      setCompanyInternships(ownedInternships);
      setApplications(companyApplications);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error loading company data:", error);
      setCompanyInternships([]);
      setApplications([]);
    }
  }, []);

  useEffect(() => {
    loadCompanyData();

    const handleUpdate = () => loadCompanyData();

    const handleStorage = (event) => {
      if (
        event.key === "internships" ||
        event.key === "applications" ||
        event.key === null
      ) {
        loadCompanyData();
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("applicationsUpdated", handleUpdate);
    window.addEventListener("internshipsUpdated", handleUpdate);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("applicationsUpdated", handleUpdate);
      window.removeEventListener("internshipsUpdated", handleUpdate);
    };
  }, [loadCompanyData]);

  // Accept or reject application
  const updateStatus = (id, newStatus) => {
    try {
      const currentUser = getCurrentUser();

      if (!currentUser) {
        alert("Please login first.");
        return;
      }

      const savedInternships = JSON.parse(
        localStorage.getItem("internships") || "[]"
      );

      const savedApplications = JSON.parse(
        localStorage.getItem("applications") || "[]"
      );

      if (
        !Array.isArray(savedInternships) ||
        !Array.isArray(savedApplications)
      ) {
        alert("Application data is invalid.");
        return;
      }

      // Verify company ownership
      const ownedIds = savedInternships
        .filter((internship) => {
          const sameId =
            internship.companyId != null &&
            String(internship.companyId) === String(currentUser.id);

          const sameEmail =
            internship.companyEmail &&
            internship.companyEmail.toLowerCase() ===
              (currentUser.email || "").toLowerCase();

          return sameId || sameEmail;
        })
        .map((internship) => String(internship.id));

      const targetApplication = savedApplications.find(
        (app) => String(app.id) === String(id)
      );

      if (
        !targetApplication ||
        !ownedIds.includes(String(targetApplication.internshipId))
      ) {
        alert("You cannot update this application.");
        loadCompanyData();
        return;
      }

      const updatedApplications = savedApplications.map((app) =>
        String(app.id) === String(id)
          ? { ...app, status: newStatus }
          : app
      );

      localStorage.setItem(
        "applications",
        JSON.stringify(updatedApplications)
      );

      setApplications(
        updatedApplications.filter((app) =>
          ownedIds.includes(String(app.internshipId))
        )
      );

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

      alert(`Application ${newStatus.toLowerCase()} successfully!`);
    } catch (error) {
      console.error("Error updating application:", error);
      alert("Unable to update application status.");
    }
  };

  // Dashboard statistics
  const stats = [
    {
      title: "My Internships",
      count: companyInternships.length,
      icon: "💼",
      color: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Total Applications",
      count: applications.length,
      icon: "📋",
      color: "bg-indigo-50",
      text: "text-indigo-600",
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
  ];

  // Search and filter
  const filteredApplications = applications.filter((app) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch = [
      app.name,
      app.email,
      app.title,
      app.phone,
    ].some((value) =>
      String(value || "").toLowerCase().includes(searchText)
    );

    const currentStatus = app.status || "Pending";

    const matchesStatus =
      statusFilter === "All" || currentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const currentUser = getCurrentUser();
  const companyName =
    currentUser?.companyName || currentUser?.name || "Company";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:py-10">
      <div className="mx-auto max-w-7xl">

        {/* Welcome Header */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-md md:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium text-blue-100">
                InternConnect Recruiter Portal
              </p>

              <h1 className="text-3xl font-bold md:text-4xl">
                Company Dashboard
              </h1>

              <p className="mt-2 text-lg font-semibold">
                Welcome, {companyName}
              </p>

              <p className="mt-2 text-sm text-blue-100 md:text-base">
                Manage your internships and review student applications.
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
              onClick={loadCompanyData}
              className="rounded-lg bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              ↻ Refresh Dashboard
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

        {/* Quick Actions */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            to="/manage-internships"
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <span className="text-3xl">💼</span>

            <h3 className="mt-3 text-lg font-bold text-gray-800">
              Manage Internships
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Add, edit and manage your internship opportunities.
            </p>
          </Link>

          <a
            href="#applications"
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <span className="text-3xl">📨</span>

            <h3 className="mt-3 text-lg font-bold text-gray-800">
              View Applications
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Review applications submitted by students.
            </p>
          </a>
        </div>

        {/* Manage Applications */}
        <div
          id="applications"
          className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-7"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Student Applications
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Review applications for your internships and update their status.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student, email or internship..."
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

          {/* Application List */}
          {filteredApplications.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mb-4 text-5xl">📂</div>

              <h3 className="text-xl font-bold text-gray-800">
                No Applications Found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Applications for your internships will appear here.
              </p>

              <Link
                to="/manage-internships"
                className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
              >
                Manage Internships
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

                    <div className="mt-5 grid grid-cols-1 gap-4 rounded-lg bg-gray-50 p-4 sm:grid-cols-3">
                      <div>
                        <p className="text-xs text-gray-500">Internship</p>
                        <p className="mt-1 font-semibold text-gray-800">
                          {app.title || "Internship"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Applied On</p>
                        <p className="mt-1 font-semibold text-gray-800">
                          {app.date || "Not available"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="mt-1 font-semibold text-gray-800">
                          {app.phone || "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedApplication(app)}
                        className="rounded-lg border border-blue-600 px-5 py-2.5 font-medium text-blue-600 transition hover:bg-blue-50"
                      >
                        View Details
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

          <p className="mt-6 border-t border-gray-100 pt-4 text-sm text-gray-500">
            Showing {filteredApplications.length} of {applications.length}{" "}
            applications
          </p>
        </div>
      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
          onClick={() => setSelectedApplication(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-gray-200 pb-5">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  InternConnect Recruiter Portal
                </p>

                <h2 className="mt-1 text-2xl font-bold text-gray-800">
                  Application Details
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedApplication(null)}
                className="rounded-lg px-3 py-1 text-2xl text-gray-500 transition hover:bg-gray-100"
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
                {selectedApplication.coverLetter ||
                  "No cover letter provided."}
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
                onClick={() =>
                  updateStatus(selectedApplication.id, "Accepted")
                }
                disabled={
                  (selectedApplication.status || "Pending") === "Accepted"
                }
                className="rounded-lg bg-green-600 px-5 py-2.5 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ✓ Accept
              </button>

              <button
                type="button"
                onClick={() =>
                  updateStatus(selectedApplication.id, "Rejected")
                }
                disabled={
                  (selectedApplication.status || "Pending") === "Rejected"
                }
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

export default CompanyDashboard;
