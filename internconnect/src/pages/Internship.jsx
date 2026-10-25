import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const internshipsData = [
  {
    id: 1,
    title: "Web Development Intern",
    company: "Tech Solution",
    category: "Web Development",
    location: "Remote",
    duration: "2 Months",
    salary: "₹10,000/month",
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
    skills: "Figma, UI Design, Wireframes",
    description:
      "Design user-friendly interfaces and create website and app prototypes.",
  },
];

const Internship = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredInternships = internshipsData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.company.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-center text-4xl font-bold text-gray-800">
          Find Your Perfect Internship
        </h1>

        <p className="mt-3 text-center text-gray-600">
          Explore internships and start building your career.
        </p>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Search internships..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border bg-white px-4 py-3 outline-none focus:border-blue-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border bg-white px-4 py-3"
          >
            <option value="All">All Categories</option>
            <option value="Web Development">Web Development</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="Data Science">Data Science</option>
            <option value="AI/ML">AI/ML</option>
            <option value="Design">UI/UX Design</option>
          </select>
        </div>

        <p className="mb-5 mt-8 text-gray-600">
          Showing {filteredInternships.length} internships
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredInternships.map((item) => (
            <div
              key={item.id}
              className="rounded-xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                {item.category}
              </span>

              <h2 className="mt-4 text-xl font-bold text-gray-800">
                {item.title}
              </h2>

              <p className="mt-2 text-gray-600">{item.company}</p>

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>📍 {item.location}</p>
                <p>🕒 {item.duration}</p>
                <p>💰 {item.salary}</p>
              </div>

              <button
                onClick={() =>
                  navigate("/internshipdetails", {
                    state: { internship: item },
                  })
                }
                className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {filteredInternships.length === 0 && (
          <p className="mt-10 text-center text-gray-500">
            No internships found. Try another search.
          </p>
        )}
      </div>
    </div>
  );
};

export default Internship;
