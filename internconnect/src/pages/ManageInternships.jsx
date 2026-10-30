
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "internships";

const initialForm = {
  title: "",
  company: "",
  category: "Cybersecurity",
  location: "Remote",
  type: "Full Time",
  duration: "",
  stipend: "",
  about: "",
  responsibilities: "",
  requiredSkills: "",
};

const ManageInternships = () => {
  const [internships, setInternships] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  // Load saved internships
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      setInternships(Array.isArray(saved) ? saved : []);
    } catch (error) {
      console.error("Error loading internships:", error);
      setInternships([]);
    }
  }, []);

  // Save internships
  const saveInternships = (updated) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setInternships(updated);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Add or Update Internship
  const handleSubmit = (e) => {
    e.preventDefault();

    const internshipData = {
      ...form,
      id: editingId !== null ? editingId : Date.now(),
      description: form.about,
      salary: form.stipend
        ? form.stipend.toLowerCase().includes("month")
          ? form.stipend
          : `${form.stipend}/month`
        : "Not specified",
      skills: form.requiredSkills,
    };

    let updated;

    if (editingId !== null) {
      updated = internships.map((item) =>
        item.id === editingId ? internshipData : item
      );
    } else {
      updated = [...internships, internshipData];
    }

    saveInternships(updated);

    setForm(initialForm);
    setEditingId(null);

    alert(
      editingId !== null
        ? "Internship updated successfully!"
        : "Internship added successfully!"
    );
  };

  // Edit Internship
  const handleEdit = (item) => {
    setForm({
      title: item.title || "",
      company: item.company || "",
      category: item.category || "Cybersecurity",
      location: item.location || "Remote",
      type: item.type || "Full Time",
      duration: item.duration || "",
      stipend: item.stipend || item.salary || "",
      about: item.about || item.description || "",
      responsibilities: Array.isArray(item.responsibilities)
        ? item.responsibilities.join("\n")
        : item.responsibilities || "",
      requiredSkills: Array.isArray(item.requiredSkills)
        ? item.requiredSkills.join("\n")
        : item.requiredSkills || item.skills || "",
    });

    setEditingId(item.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete Internship
  const handleDelete = (id) => {
    if (!window.confirm("Do you want to delete this internship?")) {
      return;
    }

    const updated = internships.filter((item) => item.id !== id);
    saveInternships(updated);

    if (editingId === id) {
      setEditingId(null);
      setForm(initialForm);
    }
  };

  // Cancel Editing
  const handleCancel = () => {
    setEditingId(null);
    setForm(initialForm);
  };

  // Search Internships
  const filteredInternships = internships.filter((item) => {
    const query = search.toLowerCase().trim();

    return (
      (item.title || "").toLowerCase().includes(query) ||
      (item.company || "").toLowerCase().includes(query) ||
      (item.category || "").toLowerCase().includes(query) ||
      (item.location || "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 md:py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-md md:p-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="mb-2 text-sm font-semibold text-blue-100">
                INTERNCONNECT ADMIN PANEL
              </p>

              <h1 className="text-3xl font-bold md:text-4xl">
                Manage Internships
              </h1>

              <p className="mt-3 text-sm text-blue-100 md:text-base">
                Create, update and manage internship opportunities.
              </p>
            </div>

            <Link
              to="/admindashboard"
              className="rounded-lg bg-white px-5 py-3 text-center font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              ← Back to Dashboard
            </Link>

          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">

          <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Internships
              </p>

              <h2 className="mt-2 text-3xl font-bold text-blue-600">
                {internships.length}
              </h2>
            </div>

            <div className="rounded-xl bg-blue-50 p-4 text-3xl">
              💼
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Search Results
              </p>

              <h2 className="mt-2 text-3xl font-bold text-indigo-600">
                {filteredInternships.length}
              </h2>
            </div>

            <div className="rounded-xl bg-indigo-50 p-4 text-3xl">
              🔍
            </div>
          </div>

        </div>

        {/* Add / Edit Form */}
        <div
          className="mb-10 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8"
          id="internship-form"
        >

          <div className="mb-7 border-b border-gray-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-2xl">
                {editingId !== null ? "✏️" : "➕"}
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800 md:text-2xl">
                  {editingId !== null
                    ? "Edit Internship"
                    : "Add New Internship"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Fill in the details of the internship opportunity.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Internship Title */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Internship Title *
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Web Development Intern"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Company */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Company Name *
                </label>

                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Category *
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option>Cybersecurity</option>
                  <option>Web Development</option>
                  <option>Frontend Development</option>
                  <option>Backend Development</option>
                  <option>Full Stack Development</option>
                  <option>Java</option>
                  <option>Python</option>
                  <option>Data Science</option>
                  <option>Artificial Intelligence</option>
                  <option>Machine Learning</option>
                  <option>UI/UX Design</option>
                  <option>Digital Marketing</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Location *
                </label>

                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Remote, Delhi, Hybrid..."
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Type */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Internship Type *
                </label>

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>On-site</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Duration *
                </label>

                <input
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="e.g. 3 Months"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Stipend */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Monthly Stipend
                </label>

                <input
                  name="stipend"
                  value={form.stipend}
                  onChange={handleChange}
                  placeholder="e.g. ₹10,000 or Unpaid"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* About */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  About Internship *
                </label>

                <textarea
                  name="about"
                  value={form.about}
                  onChange={handleChange}
                  placeholder="Explain what this internship is about..."
                  rows="4"
                  required
                  className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Responsibilities */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Responsibilities *
                </label>

                <textarea
                  name="responsibilities"
                  value={form.responsibilities}
                  onChange={handleChange}
                  placeholder={"Enter one responsibility per line:\nDevelop new features\nWork with the development team\nTest and debug applications"}
                  rows="4"
                  required
                  className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />

                <p className="mt-1 text-xs text-gray-500">
                  Enter each responsibility on a new line.
                </p>
              </div>

              {/* Required Skills */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Required Skills *
                </label>

                <textarea
                  name="requiredSkills"
                  value={form.requiredSkills}
                  onChange={handleChange}
                  placeholder={"Enter one skill per line:\nHTML\nCSS\nJavaScript\nReact"}
                  rows="4"
                  required
                  className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />

                <p className="mt-1 text-xs text-gray-500">
                  Enter each required skill on a new line.
                </p>
              </div>

            </div>

            {/* Form Buttons */}
            <div className="mt-7 flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row">

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                {editingId !== null
                  ? "✓ Update Internship"
                  : "+ Add Internship"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-lg bg-gray-100 px-7 py-3 font-semibold text-gray-700 transition hover:bg-gray-200"
                >
                  Cancel Editing
                </button>
              )}

            </div>
          </form>
        </div>

        {/* All Internships */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-xl font-bold text-gray-800 md:text-2xl">
                All Internships
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage your available internship opportunities.
              </p>
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Search internships..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 sm:max-w-sm"
            />

          </div>

          {filteredInternships.length === 0 ? (

            <div className="py-12 text-center">
              <div className="mb-4 text-5xl">💼</div>

              <h3 className="text-xl font-bold text-gray-800">
                No Internships Found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Add a new internship or try another search.
              </p>
            </div>

          ) : (

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

              {filteredInternships.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col rounded-xl border border-gray-200 p-5 transition hover:border-blue-200 hover:shadow-md"
                >

                  <div className="flex flex-wrap items-center justify-between gap-2">

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {item.category}
                    </span>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      {item.type}
                    </span>

                  </div>

                  <h3 className="mt-4 text-xl font-bold text-gray-800">
                    {item.title}
                  </h3>

                  <p className="mt-1 font-medium text-gray-600">
                    {item.company}
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-gray-600 sm:grid-cols-2">

                    <p>
                      <strong>📍 Location:</strong> {item.location}
                    </p>

                    <p>
                      <strong>⏳ Duration:</strong> {item.duration}
                    </p>

                    <p>
                      <strong>💰 Stipend:</strong>{" "}
                      {item.stipend || item.salary || "Not specified"}
                    </p>

                  </div>

                  <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">

                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        About Internship
                      </p>

                      <p className="mt-1 text-sm leading-relaxed text-gray-500">
                        {item.about || item.description || "Not added"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Responsibilities
                      </p>

                      <p className="mt-1 whitespace-pre-line text-sm text-gray-500">
                        {Array.isArray(item.responsibilities)
                          ? item.responsibilities.join(", ")
                          : item.responsibilities || "Not added"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Required Skills
                      </p>

                      <p className="mt-1 whitespace-pre-line text-sm text-gray-500">
                        {Array.isArray(item.requiredSkills)
                          ? item.requiredSkills.join(", ")
                          : item.requiredSkills || item.skills || "Not added"}
                      </p>
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex gap-3 border-t border-gray-100 pt-5">

                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="flex-1 rounded-lg bg-amber-50 px-4 py-2.5 font-semibold text-amber-700 transition hover:bg-amber-100"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 rounded-lg bg-red-50 px-4 py-2.5 font-semibold text-red-700 transition hover:bg-red-100"
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>

          )}

        </div>

      </div>
    </div>
  );
};

export default ManageInternships;
