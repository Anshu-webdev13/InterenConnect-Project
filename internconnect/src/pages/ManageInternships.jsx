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
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

      setInternships(Array.isArray(saved) ? saved : []);
    } catch {
      setInternships([]);
    }
  }, []);

  // Save internships to localStorage
  const saveInternships = (updated) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setInternships(updated);
  };

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Add or update internship
  const handleSubmit = (e) => {
    e.preventDefault();

    const internshipData = {
      ...form,
      id: editingId !== null ? editingId : Date.now(),

      // Keep these fields for compatibility with the listing page
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
        item.id === editingId ? internshipData : item,
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
        : "Internship added successfully!",
    );
  };

  // Edit internship
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

  // Delete internship
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

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setForm(initialForm);
  };

  // Search
  const filteredInternships = internships.filter((item) => {
    const query = search.toLowerCase();

    return (
      (item.title || "").toLowerCase().includes(query) ||
      (item.company || "").toLowerCase().includes(query) ||
      (item.category || "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 font-semibold text-blue-600">ADMIN PANEL</p>

            <h1 className="text-3xl font-bold text-gray-800">
              Manage Internships
            </h1>

            <p className="mt-2 text-gray-600">
              Add and manage internship opportunities.
            </p>
          </div>

          <Link
            to="/admindashboard"
            className="rounded-lg border bg-white px-5 py-3 text-center font-semibold text-gray-700 hover:bg-gray-100"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Statistics */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <p className="text-gray-500">Total Internships</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {internships.length}
          </p>
        </div>

        {/* Add / Edit Form */}
        <div className="mb-10 rounded-xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            {editingId !== null ? "Edit Internship" : "Add New Internship"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Title */}
              <div>
                <label className="mb-2 block font-medium">
                  Internship Title *
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Cybersecurity Intern"
                  required
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Company */}
              <div>
                <label className="mb-2 block font-medium">Company Name *</label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  required
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block font-medium">Category *</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-white px-4 py-3"
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
                <label className="mb-2 block font-medium">Location *</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Remote, Delhi, Hybrid..."
                  required
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Type */}
              <div>
                <label className="mb-2 block font-medium">
                  Internship Type *
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-white px-4 py-3"
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
                <label className="mb-2 block font-medium">Duration *</label>
                <input
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="e.g. 3 Months"
                  required
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Stipend */}
              <div className="md:col-span-2">
                <label className="mb-2 block font-medium">
                  Monthly Stipend
                </label>
                <input
                  name="stipend"
                  value={form.stipend}
                  onChange={handleChange}
                  placeholder="e.g. ₹10,000 or Unpaid"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* About Internship */}
              <div className="md:col-span-2">
                <label className="mb-2 block font-medium">
                  About Internship *
                </label>
                <textarea
                  name="about"
                  value={form.about}
                  onChange={handleChange}
                  placeholder="Explain what this internship is about..."
                  rows="4"
                  required
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Responsibilities */}
              <div className="md:col-span-2">
                <label className="mb-2 block font-medium">
                  Responsibilities *
                </label>
                <textarea
                  name="responsibilities"
                  value={form.responsibilities}
                  onChange={handleChange}
                  placeholder={
                    "Enter one responsibility per line:\nMonitor systems for security threats\nIdentify and report vulnerabilities\nPrepare security reports"
                  }
                  rows="5"
                  required
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Enter each responsibility on a new line.
                </p>
              </div>

              {/* Required Skills */}
              <div className="md:col-span-2">
                <label className="mb-2 block font-medium">
                  Required Skills *
                </label>
                <textarea
                  name="requiredSkills"
                  value={form.requiredSkills}
                  onChange={handleChange}
                  placeholder={
                    "Enter one skill per line:\nComputer Networks\nLinux basics\nTCP/IP and DNS\nProblem-solving"
                  }
                  rows="5"
                  required
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Enter each required skill on a new line.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                {editingId !== null ? "Update Internship" : "Add Internship"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Internship List */}
        <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="text-xl font-bold text-gray-800">
              All Internships ({filteredInternships.length})
            </h2>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search internships..."
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500 sm:max-w-sm"
            />
          </div>

          {filteredInternships.length === 0 ? (
            <p className="py-8 text-center text-gray-500">
              No internships found. Add one using the form above.
            </p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {filteredInternships.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-gray-200 p-5"
                >
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    {item.category}
                  </span>

                  <h3 className="mt-3 text-xl font-bold text-gray-800">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-gray-600">{item.company}</p>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <p>
                      <strong>Location:</strong> {item.location}
                    </p>
                    <p>
                      <strong>Type:</strong> {item.type}
                    </p>
                    <p>
                      <strong>Duration:</strong> {item.duration}
                    </p>
                    <p>
                      <strong>Stipend:</strong>{" "}
                      {item.stipend || item.salary || "Not specified"}
                    </p>
                    <p>
                      <strong>About:</strong> {item.about || item.description}
                    </p>
                    <p>
                      <strong>Responsibilities:</strong>{" "}
                      {Array.isArray(item.responsibilities)
                        ? item.responsibilities.join(", ")
                        : item.responsibilities || "Not added"}
                    </p>
                    <p>
                      <strong>Required Skills:</strong>{" "}
                      {Array.isArray(item.requiredSkills)
                        ? item.requiredSkills.join(", ")
                        : item.requiredSkills || item.skills || "Not added"}
                    </p>
                  </div>

                  <div className="mt-5 flex gap-3 border-t pt-4">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="rounded-lg bg-amber-100 px-4 py-2 font-semibold text-amber-800 hover:bg-amber-200"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg bg-red-100 px-4 py-2 font-semibold text-red-700 hover:bg-red-200"
                    >
                      Delete
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
