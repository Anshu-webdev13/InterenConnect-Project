import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Internshipdetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Internship listing se aayi hui details
  let internship = location.state?.internship;

  // Agar page refresh ho jaye, to localStorage se details lene ki koshish
  if (!internship) {
    const params = new URLSearchParams(location.search);
    const internshipId = params.get("id");

    if (internshipId) {
      const savedInternships = JSON.parse(
        localStorage.getItem("internships") || "[]",
      );

      internship = savedInternships.find(
        (item) => String(item.id) === String(internshipId),
      );
    }
  }

  // List ko display karne ke liye format karna
  const getList = (value) => {
    if (!value) return [];

    const items = Array.isArray(value) ? value : value.split(/\n|,/);

    return items
      .map((item) =>
        String(item)
          .replace(/^[\s•\-]+/, "")
          .trim(),
      )
      .filter(Boolean);
  };

  // Internship ki details
  const title = internship?.title || "Internship Details";
  const company = internship?.company || "Company not specified";
  const category = internship?.category || "General";
  const locationName = internship?.location || "Not specified";
  const duration = internship?.duration || "Not specified";
  const type = internship?.type || "Not specified";

  const stipend = internship?.stipend || internship?.salary || "Not specified";

  const about =
    internship?.about ||
    internship?.description ||
    "No description available for this internship.";

  const responsibilities = getList(internship?.responsibilities);

  const requiredSkills = getList(
    internship?.requiredSkills || internship?.skills,
  );

  // Apply Now button ka action
  const handleApply = () => {
    if (!internship) {
      navigate("/internships");
      return;
    }

    navigate("/applynow", {
      state: { internship },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Internship Header */}
        <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            {category}
          </span>

          <h1 className="mt-4 text-3xl font-bold text-gray-800 sm:text-4xl">
            {title}
          </h1>

          <p className="mt-2 text-lg font-medium text-gray-600">{company}</p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Location</p>
              <p className="mt-1 font-semibold text-gray-800">{locationName}</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Job Type</p>
              <p className="mt-1 font-semibold text-gray-800">{type}</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Duration</p>
              <p className="mt-1 font-semibold text-gray-800">{duration}</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Stipend</p>
              <p className="mt-1 font-semibold text-gray-800">{stipend}</p>
            </div>
          </div>

          {/* Only One Apply Button */}
          <button
            type="button"
            onClick={handleApply}
            className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
          >
            Apply Now
          </button>
        </div>

        {/* About Internship */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-md sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800">About Internship</h2>

          <p className="mt-4 leading-7 text-gray-600">{about}</p>
        </section>

        {/* Responsibilities */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-md sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800">Responsibilities</h2>

          {responsibilities.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {responsibilities.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-600"
                >
                  <span className="mt-1 font-bold text-blue-600">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-500">
              Responsibilities have not been added yet.
            </p>
          )}
        </section>

        {/* Required Skills */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-md sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800">Required Skills</h2>

          {requiredSkills.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {requiredSkills.map((skill, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-600"
                >
                  <span className="mt-1 font-bold text-blue-600">✓</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-500">
              Required skills have not been added yet.
            </p>
          )}
        </section>

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/internships")}
          className="mt-6 rounded-lg border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          Back to Internships
        </button>
      </div>
    </div>
  );
};

export default Internshipdetails;
