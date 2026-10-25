import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const Applynow = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const internship = location.state?.internship;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!internship) {
      alert("Please select an internship first.");
      navigate("/internships");
      return;
    }

    const newApplication = {
      id: Date.now(),
      title: internship.title,
      company: internship.company,
      date: new Date().toLocaleDateString("en-IN"),
      name,
      email,
      phone,
      coverLetter,
      status: "Pending",
    };

    const savedApplications = JSON.parse(
      localStorage.getItem("applications") || "[]",
    );

    savedApplications.push(newApplication);

    localStorage.setItem("applications", JSON.stringify(savedApplications));

    navigate("/applicationsuccess", {
      state: { internship },
    });
  };

  if (!internship) {
    return (
      <div className="min-h-screen bg-gray-50 p-10 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Please select an internship first.
        </h1>

        <Link
          to="/internships"
          className="mt-5 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white"
        >
          Browse Internships
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-xl bg-white p-8 shadow-md">
          <h1 className="text-3xl font-bold text-gray-800">
            Apply For Internship
          </h1>

          <p className="mt-3 text-blue-600">
            {internship.title} at {internship.company}
          </p>

          <p className="mt-2 text-sm text-gray-600">
            {internship.location} · {internship.duration} · {internship.salary}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Why are you suitable for this internship?
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Write a short introduction about your skills..."
                rows="4"
                required
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Applynow;
