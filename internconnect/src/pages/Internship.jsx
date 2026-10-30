
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultInternships = [
  {
    id: 1,
    title: "Web Development Intern",
    company: "Tech Solution",
    category: "Web Development",
    location: "Remote",
    duration: "2 Months",
    salary: "₹10,000/month",
    stipend: "₹10,000",
    type: "Full Time",
    skills: "HTML, CSS, JavaScript, React",
    description:
      "Work on websites and learn frontend development by building real projects.",
  },
  {
    id: 2,
    title: "Python Developer Intern",
    company: "CodeTech",
    category: "Python",
    location: "Hybrid",
    duration: "3 Months",
    salary: "₹8,000/month",
    stipend: "₹8,000",
    type: "Full Time",
    skills: "Python, OOP, SQL",
    description:
      "Learn Python programming and develop applications with an experienced team.",
  },
  {
    id: 3,
    title: "Java Developer Intern",
    company: "Soft Solutions",
    category: "Java",
    location: "On-site",
    duration: "3 Months",
    salary: "₹9,000/month",
    stipend: "₹9,000",
    type: "Full Time",
    skills: "Java, OOP, SQL",
    description:
      "Practice Java programming and help develop software applications.",
  },
  {
    id: 4,
    title: "Data Analyst Intern",
    company: "DataWorks",
    category: "Data Science",
    location: "Remote",
    duration: "2 Months",
    salary: "₹12,000/month",
    stipend: "₹12,000",
    type: "Full Time",
    skills: "Excel, SQL, Python",
    description:
      "Analyze datasets, prepare reports and learn data visualization.",
  },
  {
    id: 5,
    title: "AI/ML Intern",
    company: "Future AI",
    category: "AI/ML",
    location: "Remote",
    duration: "3 Months",
    salary: "₹15,000/month",
    stipend: "₹15,000",
    type: "Full Time",
    skills: "Python, Machine Learning",
    description:
      "Explore machine learning concepts and build beginner-level AI projects.",
  },
  {
    id: 6,
    title: "UI/UX Design Intern",
    company: "Creative Studio",
    category: "Design",
    location: "Hybrid",
    duration: "2 Months",
    salary: "₹7,000/month",
    stipend: "₹7,000",
    type: "Full Time",
    skills: "Figma, UI Design, Wireframes",
    description:
      "Design user-friendly interfaces and create website and app prototypes.",
  },
];

const Internship = () => {
  const navigate = useNavigate();

  const [internships, setInternships] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const savedInternships = JSON.parse(
      localStorage.getItem("internships") || "[]"
    );

    const internshipMap = new Map();

    defaultInternships.forEach((item) => {
      internshipMap.set(item.id, item);
    });

    savedInternships.forEach((item) => {
      internshipMap.set(item.id, item);
    });

    setInternships(Array.from(internshipMap.values()));
  }, []);

  // Search and category filter
  const filteredInternships = internships.filter((item) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      (item.title || "").toLowerCase().includes(searchText) ||
      (item.company || "").toLowerCase().includes(searchText) ||
      (item.category || "").toLowerCase().includes(searchText);

    const normalizedCategory = (item.category || "").toLowerCase();

    const matchesCategory =
      category === "All" ||
      normalizedCategory === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Get stipend
  const getSalary = (item) => {
    if (item.salary) return item.salary;

    if (item.stipend) {
      return item.stipend.toLowerCase().includes("month")
        ? item.stipend
        : `${item.stipend}/month`;
    }

    return "Not specified";
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 sm:py-12">

      <div className="mx-auto max-w-7xl">

        {/* Page Heading */}
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Explore Opportunities
          </p>

          <h1 className="text-3xl font-bold leading-tight text-gray-800 sm:text-4xl lg:text-5xl">
            Find Your Perfect Internship
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
            Explore internships, develop your skills and start building
            your career with the right opportunity.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mx-auto mt-9 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">

          <input
            type="text"
            placeholder="Search by title or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:text-base"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:text-base"
          >
            <option value="All">All Categories</option>
            <option value="Web Development">Web Development</option>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="Full Stack Development">Full Stack Development</option>
            <option value="Python">Python</option>
            <option value="Python Development">Python Development</option>
            <option value="Java">Java</option>
            <option value="Java Development">Java Development</option>
            <option value="Data Science">Data Science</option>
            <option value="AI/ML">AI/ML</option>
            <option value="Artificial Intelligence">
              Artificial Intelligence
            </option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Design">Design</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>

        </div>

        {/* Results Count */}
        <div className="mb-5 mt-9 flex flex-wrap items-center justify-between gap-3">

          <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
            Available Internships
          </h2>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {filteredInternships.length} Opportunities
          </span>

        </div>

        {/* Internship Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {filteredInternships.map((item) => (

            <div
              key={item.id}
              className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
            >

              {/* Category */}
              <div className="flex items-start justify-between gap-2">

                <span className="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700 sm:text-sm">
                  {item.category || "General"}
                </span>

                <span className="text-xs font-medium text-green-600">
                  Open
                </span>

              </div>

              {/* Title */}
              <h2 className="mt-5 text-lg font-bold leading-snug text-gray-800 sm:text-xl">
                {item.title}
              </h2>

              <p className="mt-2 text-sm font-medium text-gray-500">
                🏢 {item.company}
              </p>

              {/* Details */}
              <div className="mt-5 space-y-3 text-sm text-gray-600">

                <p>📍 {item.location || "Not specified"}</p>

                <p>🕒 {item.duration || "Not specified"}</p>

                <p>💰 {getSalary(item)}</p>

                <p>💼 {item.type || "Not specified"}</p>

              </div>

              {/* Skills */}
              {item.skills && (
                <div className="mt-5 border-t border-gray-100 pt-4">

                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Required Skills
                  </p>

                  <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
                    {item.skills}
                  </p>

                </div>
              )}

              {/* Button */}
              <button
                onClick={() =>
                  navigate("/internshipdetails", {
                    state: { internship: item },
                  })
                }
                className="mt-auto mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
              >
                View Details →
              </button>

            </div>

          ))}

        </div>

        {/* No Results */}
        {filteredInternships.length === 0 && (

          <div className="mt-10 rounded-2xl border border-gray-200 bg-white px-5 py-12 text-center">

            <div className="mb-4 text-4xl">🔍</div>

            <h3 className="text-xl font-bold text-gray-800">
              No Internships Found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try another search or select a different category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
            >
              Clear Filters
            </button>

          </div>

        )}

      </div>
    </section>
  );
};

export default Internship;
