
import React, { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Search,
  Trash2,
  MapPin,
  Building2,
  IndianRupee,
  Clock,
  X,
} from "lucide-react";

const AdminManageInternships = () => {
  const [internships, setInternships] = useState([]);
  const [search, setSearch] = useState("");

  // Load all internships
  const loadInternships = () => {
    const savedInternships =
      JSON.parse(localStorage.getItem("internships")) || [];

    setInternships(savedInternships);
  };

  useEffect(() => {
    loadInternships();

    window.addEventListener("storage", loadInternships);
    window.addEventListener("internshipsUpdated", loadInternships);

    return () => {
      window.removeEventListener("storage", loadInternships);
      window.removeEventListener("internshipsUpdated", loadInternships);
    };
  }, []);

  // Delete internship
  const handleDelete = (internshipId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this internship?"
    );

    if (!confirmDelete) return;

    const updatedInternships = internships.filter(
      (internship) => internship.id !== internshipId
    );

    localStorage.setItem(
      "internships",
      JSON.stringify(updatedInternships)
    );

    setInternships(updatedInternships);

    window.dispatchEvent(new Event("internshipsUpdated"));

    alert("Internship deleted successfully!");
  };

  // Search internships
  const filteredInternships = internships.filter((internship) => {
    const title = (internship.title || "").toLowerCase();
    const company = (internship.company || "").toLowerCase();
    const location = (internship.location || "").toLowerCase();

    const searchValue = search.toLowerCase();

    return (
      title.includes(searchValue) ||
      company.includes(searchValue) ||
      location.includes(searchValue)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-5 sm:px-5 lg:px-6">
      <div className="mx-auto w-full max-w-7xl">

        {/* Header */}
        <div className="mb-6">
          <div className="mb-1 flex items-center gap-2 text-sm text-blue-600">
            <BriefcaseBusiness size={17} />
            <span className="font-medium">
              Admin / Internships
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Manage Internships
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View and manage all internships posted by companies.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Total Internships
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-800">
                  {internships.length}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  All posted internships
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3">
                <BriefcaseBusiness
                  size={25}
                  className="text-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Search Results
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-800">
                  {filteredInternships.length}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Matching internships
                </p>
              </div>

              <div className="rounded-xl bg-indigo-50 p-3">
                <Search size={25} className="text-indigo-600" />
              </div>
            </div>
          </div>

        </div>

        {/* Main Section */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          {/* Search */}
          <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                All Internships
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Manage internship listings from one place.
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search internships..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-10 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}
            </div>

          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">

              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-500">
                    Internship
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-500">
                    Company
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-500">
                    Location
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase text-slate-500">
                    Stipend
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredInternships.length > 0 ? (
                  filteredInternships.map((internship) => (
                    <tr
                      key={internship.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                            <BriefcaseBusiness
                              size={19}
                              className="text-blue-600"
                            />
                          </div>

                          <div>
                            <p className="font-semibold text-slate-800">
                              {internship.title || "Untitled Internship"}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {internship.type || "Internship"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <Building2 size={15} className="text-slate-400" />
                          {internship.company || "N/A"}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <MapPin size={15} className="text-slate-400" />
                          {internship.location || "Not specified"}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-slate-700">
                        <div className="flex items-center gap-1">
                          <IndianRupee size={14} />
                          {internship.stipend ||
                            internship.salary ||
                            "Not specified"}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => handleDelete(internship.id)}
                          className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <BriefcaseBusiness
                        size={35}
                        className="mx-auto mb-3 text-slate-300"
                      />

                      <p className="font-semibold text-slate-700">
                        No internships found
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        Try another search.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid gap-3 p-3 md:hidden">
            {filteredInternships.length > 0 ? (
              filteredInternships.map((internship) => (
                <div
                  key={internship.id}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                      <BriefcaseBusiness
                        size={21}
                        className="text-blue-600"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words font-semibold text-slate-800">
                        {internship.title || "Untitled Internship"}
                      </h3>

                      <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                        <Building2 size={14} />
                        {internship.company || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                    <div>
                      <p className="text-xs text-slate-400">Location</p>
                      <p className="mt-1 flex items-center gap-1 text-sm text-slate-600">
                        <MapPin size={14} />
                        {internship.location || "Not specified"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">Stipend</p>
                      <p className="mt-1 flex items-center gap-1 text-sm text-slate-600">
                        <IndianRupee size={14} />
                        {internship.stipend ||
                          internship.salary ||
                          "Not specified"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">Duration</p>
                      <p className="mt-1 flex items-center gap-1 text-sm text-slate-600">
                        <Clock size={14} />
                        {internship.duration || "Not specified"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">Type</p>
                      <p className="mt-1 text-sm text-slate-600">
                        {internship.type || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-slate-100 pt-3">
                    <button
                      onClick={() => handleDelete(internship.id)}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                      Delete Internship
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center">
                <BriefcaseBusiness
                  size={35}
                  className="mx-auto mb-3 text-slate-300"
                />

                <p className="font-semibold text-slate-700">
                  No internships found
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Try another search.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredInternships.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {internships.length}
              </span>{" "}
              internships
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminManageInternships;