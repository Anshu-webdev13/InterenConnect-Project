import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users,
  FileText,
  UserCheck,
  Eye,
  X,
  Mail,
  CalendarDays,
  Building2,
  GraduationCap,
  RefreshCw,
  ClipboardList,
} from "lucide-react";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadData = () => {
    setLoading(true);

    try {
      const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const savedApplications = JSON.parse(
        localStorage.getItem("applications") || "[]",
      );

      const studentUsers = savedUsers.filter(
        (user) => !user.role || user.role === "student",
      );

      setStudents(studentUsers);
      setApplications(savedApplications);
    } catch (error) {
      console.error("Error loading student data:", error);
      setStudents([]);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => loadData();

    window.addEventListener("storage", handleUpdate);
    window.addEventListener("applicationsUpdated", handleUpdate);
    window.addEventListener("userLogin", handleUpdate);
    window.addEventListener("userRegistered", handleUpdate);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("applicationsUpdated", handleUpdate);
      window.removeEventListener("userLogin", handleUpdate);
      window.removeEventListener("userRegistered", handleUpdate);
    };
  }, []);

  const getStudentApplications = (email) => {
    return applications.filter(
      (app) => (app.email || "").toLowerCase() === (email || "").toLowerCase(),
    );
  };

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const name = (student.name || "").toLowerCase();
      const email = (student.email || "").toLowerCase();

      return (
        name.includes(search.toLowerCase()) ||
        email.includes(search.toLowerCase())
      );
    });
  }, [students, search]);

  const studentsWithApplications = students.filter(
    (student) => getStudentApplications(student.email).length > 0,
  ).length;

  const stats = [
    {
      title: "Total Students",
      value: students.length,
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Students Applied",
      value: studentsWithApplications,
      icon: UserCheck,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Total Applications",
      value: applications.length,
      icon: FileText,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  const closeModal = () => setSelectedStudent(null);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Admin Panel / Students
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
              Manage Students
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              View registered students and monitor their internship
              applications.
            </p>
          </div>

          <button
            onClick={loadData}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            <RefreshCw size={17} />
            Refresh Data
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {item.title}
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-slate-800">
                      {item.value}
                    </h2>
                  </div>

                  <div className={`rounded-xl p-4 ${item.iconBg}`}>
                    <Icon size={25} className={item.iconColor} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Student Table Section */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Registered Students
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                A list of all registered student accounts.
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="py-16 text-center text-slate-500">
              Loading students...
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <Users size={30} className="text-slate-400" />
              </div>

              <h3 className="text-lg font-semibold text-slate-800">
                No Students Found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {search
                  ? "Try searching with another name or email."
                  : "No student accounts are registered yet."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left">
                <thead className="bg-slate-50">
                  <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Email Address</th>
                    <th className="px-6 py-4">Applications</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((student) => {
                    const count = getStudentApplications(student.email).length;

                    return (
                      <tr
                        key={student.id || student.email}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                              {(student.name || "S").charAt(0).toUpperCase()}
                            </div>

                            <div>
                              <p className="font-semibold text-slate-800">
                                {student.name || "Student"}
                              </p>
                              <p className="mt-1 text-xs text-slate-400">
                                Student Account
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {student.email}
                        </td>

                        <td className="px-6 py-4">
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                            {count} Applications
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedStudent(student)}
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            <Eye size={16} />
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 text-sm text-slate-500">
            Showing {filteredStudents.length} of {students.length} students
          </div>
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Student Details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Student information and application history.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-red-500"
                aria-label="Close modal"
              >
                <X size={22} />
              </button>
            </div>

            {/* Student Information */}
            <div className="p-5 sm:p-6">
              <div className="flex flex-col gap-4 rounded-xl bg-blue-50 p-5 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                  {(selectedStudent.name || "S").charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {selectedStudent.name || "Student"}
                  </h3>

                  <p className="mt-1 break-all text-sm text-slate-600">
                    {selectedStudent.email}
                  </p>

                  <span className="mt-3 inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700">
                    Student Account
                  </span>
                </div>
              </div>

              {/* Application Summary */}
              <div className="mb-6 mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <ClipboardList size={18} />
                    <span className="text-sm">Total Applications</span>
                  </div>

                  <p className="mt-2 text-2xl font-bold text-slate-800">
                    {getStudentApplications(selectedStudent.email).length}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <GraduationCap size={18} />
                    <span className="text-sm">Account Role</span>
                  </div>

                  <p className="mt-2 text-lg font-bold text-slate-800">
                    Student
                  </p>
                </div>
              </div>

              {/* Application History */}
              <h3 className="mb-4 text-lg font-bold text-slate-800">
                Internship Applications
              </h3>

              {getStudentApplications(selectedStudent.email).length === 0 ? (
                <div className="rounded-xl bg-slate-50 px-4 py-10 text-center">
                  <FileText size={30} className="mx-auto mb-3 text-slate-400" />
                  <p className="font-medium text-slate-700">
                    No Applications Yet
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    This student has not applied for any internship.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {getStudentApplications(selectedStudent.email).map((app) => (
                    <div
                      key={app.id}
                      className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-200"
                    >
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                        <div>
                          <h4 className="font-semibold text-slate-800">
                            {app.title || "Internship"}
                          </h4>

                          <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                            <Building2 size={15} />
                            {app.company || "Company"}
                          </p>

                          <p className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                            <CalendarDays size={14} />
                            Applied on: {app.date || "Not available"}
                          </p>
                        </div>

                        <span
                          className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                            app.status === "Accepted"
                              ? "bg-green-100 text-green-700"
                              : app.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {app.status || "Pending"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={closeModal}
                className="mt-6 w-full rounded-xl bg-slate-800 py-3 font-semibold text-white transition hover:bg-slate-900"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;
