
import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const Applynow = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const internship = location.state?.internship;

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!internship) {
      alert("Please select an internship first.");
      navigate("/internships");
      return;
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();
    const cleanCoverLetter = coverLetter.trim();

    if (!cleanName || !cleanEmail || !cleanPhone || !cleanCoverLetter) {
      alert("Please fill in all the fields.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      alert("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (cleanCoverLetter.length < 20) {
      alert("Cover letter must contain at least 20 characters.");
      return;
    }

    const savedApplications = JSON.parse(
      localStorage.getItem("applications") || "[]"
    );

    const alreadyApplied = savedApplications.some(
      (application) =>
        application.email?.toLowerCase() === cleanEmail &&
        String(application.internshipId) === String(internship.id)
    );

    if (alreadyApplied) {
      alert("You have already applied for this internship.");
      navigate("/myapplications");
      return;
    }

    const newApplication = {
      id: Date.now(),
      internshipId: internship.id ?? null,
      title: internship.title || "Internship",
      company: internship.company || "Company not specified",
      date: new Date().toLocaleDateString("en-IN"),
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      coverLetter: cleanCoverLetter,
      status: "Pending",
    };

    savedApplications.push(newApplication);

    localStorage.setItem(
      "applications",
      JSON.stringify(savedApplications)
    );

    window.dispatchEvent(new Event("applicationsUpdated"));

    navigate("/applicationsuccess", {
      state: {
        internship,
        application: newApplication,
      },
    });
  };

  if (!internship) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 text-center shadow-md sm:p-10">
          <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
            Please select an internship first.
          </h1>

          <Link
            to="/internships"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Browse Internships
          </Link>
        </div>
      </div>
    );
  }

  const stipend =
    internship.stipend || internship.salary || "Not specified";

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-3xl">

        <div className="rounded-2xl bg-white p-4 shadow-md sm:p-6 md:p-8">

          {/* Page Heading */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              Apply For Internship
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Complete the form below to submit your internship application.
            </p>
          </div>

          {/* Internship Information */}
          <div className="rounded-xl bg-blue-50 p-4 sm:p-5">
            <p className="text-lg font-bold text-blue-700 sm:text-xl">
              {internship.title}
            </p>

            <p className="mt-1 text-sm text-gray-700 sm:text-base">
              {internship.company}
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-gray-600 sm:grid-cols-2">
              <p>
                <strong>Location:</strong>{" "}
                {internship.location || "Not specified"}
              </p>

              <p>
                <strong>Duration:</strong>{" "}
                {internship.duration || "Not specified"}
              </p>

              <p>
                <strong>Type:</strong>{" "}
                {internship.type || "Not specified"}
              </p>

              <p>
                <strong>Stipend:</strong> {stipend}
              </p>
            </div>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="mt-7 space-y-5 sm:mt-8">

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 sm:text-base">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                autoComplete="name"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:px-4 sm:text-base"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 sm:text-base">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:px-4 sm:text-base"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 sm:text-base">
                Phone Number
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your 10-digit mobile number"
                autoComplete="tel"
                inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                maxLength={10}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:px-4 sm:text-base"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 sm:text-base">
                Why are you suitable for this internship?
              </label>

              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Describe your skills, interests and why you want this internship..."
                rows={5}
                minLength={20}
                maxLength={1000}
                required
                className="w-full resize-y rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:px-4 sm:text-base"
              />

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Minimum 20 characters.
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99] sm:text-base"
              >
                Submit Application
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 sm:text-base"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Applynow;

