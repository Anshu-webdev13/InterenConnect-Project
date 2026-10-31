
import React, { useEffect, useState } from "react";
import {
  Building2,
  Search,
  Trash2,
  Mail,
  Users,
  X,
  Building,
} from "lucide-react";

const ManageCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");

  // Load companies
  const loadCompanies = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const companyUsers = users.filter(
      (user) => user.role === "company"
    );

    setCompanies(companyUsers);
  };

  useEffect(() => {
    loadCompanies();

    window.addEventListener("storage", loadCompanies);
    window.addEventListener("usersUpdated", loadCompanies);
    window.addEventListener("userRegistered", loadCompanies);

    return () => {
      window.removeEventListener("storage", loadCompanies);
      window.removeEventListener("usersUpdated", loadCompanies);
      window.removeEventListener("userRegistered", loadCompanies);
    };
  }, []);

  // Remove company
  const handleRemove = (companyId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this company?"
    );

    if (!confirmDelete) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.filter(
      (user) => user.id !== companyId
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setCompanies(
      updatedUsers.filter((user) => user.role === "company")
    );

    window.dispatchEvent(new Event("usersUpdated"));

    alert("Company removed successfully!");
  };

  // Search filter
  const filteredCompanies = companies.filter((company) => {
    const name = (
      company.companyName || company.name || ""
    ).toLowerCase();

    const email = (company.email || "").toLowerCase();

    return (
      name.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-5 sm:px-5 lg:px-6">

      <div className="mx-auto w-full max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="mb-1 flex items-center gap-2 text-sm text-blue-600">
              <Building2 size={17} />
              <span className="font-medium">Admin / Companies</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
              Manage Companies
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage and monitor all registered companies.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
            <Building2 size={19} className="text-blue-600" />
            <span className="text-sm font-medium text-slate-600">
              Company Management
            </span>
          </div>

        </div>

        {/* Statistics */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Companies
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-800">
                  {companies.length}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Registered on InternConnect
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3">
                <Building2 size={25} className="text-blue-600" />
              </div>

            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Search Results
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-800">
                  {filteredCompanies.length}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Companies matching your search
                </p>
              </div>

              <div className="rounded-xl bg-indigo-50 p-3">
                <Users size={25} className="text-indigo-600" />
              </div>

            </div>
          </div>

        </div>

        {/* Main Content */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          {/* Search Header */}
          <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">

            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Registered Companies
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                View company information and manage accounts.
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search companies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-10 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
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

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Company
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Email Address
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Account Type
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company) => (

                    <tr
                      key={company.id}
                      className="transition hover:bg-slate-50"
                    >

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                          {company.companyLogo ? (
                            <img
                              src={company.companyLogo}
                              alt="Company Logo"
                              className="h-11 w-11 rounded-lg border border-slate-200 bg-white object-cover"
                            />
                          ) : (
                            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-lg font-bold text-blue-600">
                              {(company.companyName || company.name || "C")
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                          )}

                          <div>
                            <p className="font-semibold text-slate-800">
                              {company.companyName || company.name || "N/A"}
                            </p>

                            <p className="text-xs text-slate-400">
                              Company Account
                            </p>
                          </div>

                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail size={15} className="text-slate-400" />
                          {company.email || "N/A"}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                          Company
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleRemove(company.id)}
                          className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 size={15} />
                          Remove
                        </button>
                      </td>

                    </tr>

                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">

                      <Building
                        size={35}
                        className="mx-auto mb-3 text-slate-300"
                      />

                      <p className="font-semibold text-slate-700">
                        No companies found
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        Try searching with another company name or email.
                      </p>

                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>

          {/* Mobile Company Cards */}
          <div className="grid gap-3 p-3 md:hidden">

            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (

                <div
                  key={company.id}
                  className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-200"
                >

                  <div className="flex items-start gap-3">

                    {company.companyLogo ? (
                      <img
                        src={company.companyLogo}
                        alt="Company Logo"
                        className="h-12 w-12 rounded-lg border border-slate-200 object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg font-bold text-blue-600">
                        {(company.companyName || company.name || "C")
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words font-semibold text-slate-800">
                        {company.companyName || company.name || "N/A"}
                      </h3>

                      <p className="mt-1 flex items-start gap-2 break-all text-xs text-slate-500">
                        <Mail size={14} className="mt-0.5 shrink-0" />
                        {company.email || "N/A"}
                      </p>

                      <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                        Company
                      </span>
                    </div>

                  </div>

                  <div className="mt-4 border-t border-slate-100 pt-3">
                    <button
                      onClick={() => handleRemove(company.id)}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                      Remove Company
                    </button>
                  </div>

                </div>

              ))
            ) : (
              <div className="py-10 text-center">

                <Building
                  size={35}
                  className="mx-auto mb-3 text-slate-300"
                />

                <p className="font-semibold text-slate-700">
                  No companies found
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Try another search.
                </p>

              </div>
            )}

          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 sm:px-5">
            <p className="text-xs text-slate-500">
              Showing <span className="font-semibold text-slate-700">
                {filteredCompanies.length}
              </span>{" "}
              of <span className="font-semibold text-slate-700">
                {companies.length}
              </span>{" "}
              registered companies
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ManageCompanies;

