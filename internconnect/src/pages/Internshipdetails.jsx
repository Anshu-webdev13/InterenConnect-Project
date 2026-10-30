
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Internshipdetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let internship = location.state?.internship;

  // Get internship after page refresh
  if (!internship) {
    const params = new URLSearchParams(location.search);
    const internshipId = params.get("id");

    if (internshipId) {
      const savedInternships = JSON.parse(
        localStorage.getItem("internships") || "[]"
      );

      internship = savedInternships.find(
        (item) => String(item.id) === String(internshipId)
      );
    }
  }

  // Format responsibilities and skills
  const getList = (value) => {
    if (!value) return [];

    const items = Array.isArray(value) ? value : value.split(/\n|,/);

    return items
      .map((item) =>
        String(item).replace(/^[\s•\-]+/, "").trim()
      )
      .filter(Boolean);
  };

  // Internship details
  const title = internship?.title || "Internship Details";
  const company = internship?.company || "Company not specified";
  const category = internship?.category || "General";
  const locationName = internship?.location || "Not specified";
  const duration = internship?.duration || "Not specified";
  const type = internship?.type || "Not specified";

  const stipend =
    internship?.stipend || internship?.salary || "Not specified";

  const about =
    internship?.about ||
    internship?.description ||
    "No description available for this internship.";

  const responsibilities = getList(internship?.responsibilities);

  const requiredSkills = getList(
    internship?.requiredSkills || internship?.skills
  );

  // Apply button
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
    <section className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 sm:py-10">

      <div className="mx-auto max-w-5xl">

        {/* Internship Header */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">

          <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
            {category}
          </span>

          <h1 className="mt-5 text-2xl font-bold leading-tight text-gray-800 sm:text-3xl lg:text-4xl">
            {title}
          </h1>

          <p className="mt-3 text-base font-medium text-gray-600 sm:text-lg">
            🏢 {company}
          </p>

          {/* Internship Information */}
          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">📍 Location</p>
              <p className="mt-2 break-words font-semibold text-gray-800">
                {locationName}
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">💼 Job Type</p>
              <p className="mt-2 font-semibold text-gray-800">
                {type}
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">🕒 Duration</p>
              <p className="mt-2 font-semibold text-gray-800">
                {duration}
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">💰 Stipend</p>
              <p className="mt-2 break-words font-semibold text-gray-800">
                {stipend}
              </p>
            </div>

          </div>

          {/* Only One Apply Now Button */}
          <button
            type="button"
            onClick={handleApply}
            className="mt-7 w-full rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700 active:scale-95 sm:w-auto"
          >
            Apply Now →
          </button>

        </div>

        {/* About Internship */}
        <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">

          <h2 className="border-b border-gray-100 pb-4 text-xl font-bold text-gray-800 sm:text-2xl">
            About Internship
          </h2>

          <p className="mt-5 whitespace-pre-line text-sm leading-7 text-gray-600 sm:text-base">
            {about}
          </p>

        </section>

        {/* Responsibilities */}
        <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">

          <h2 className="border-b border-gray-100 pb-4 text-xl font-bold text-gray-800 sm:text-2xl">
            Responsibilities
          </h2>

          {responsibilities.length > 0 ? (
            <ul className="mt-5 space-y-4">

              {responsibilities.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm leading-6 text-gray-600 sm:text-base"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                    ✓
                  </span>

                  <span>{item}</span>
                </li>
              ))}

            </ul>
          ) : (
            <p className="mt-5 text-sm text-gray-500">
              Responsibilities have not been added yet.
            </p>
          )}

        </section>

        {/* Required Skills */}
        <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">

          <h2 className="border-b border-gray-100 pb-4 text-xl font-bold text-gray-800 sm:text-2xl">
            Required Skills
          </h2>

          {requiredSkills.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-3">

              {requiredSkills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                >
                  {skill}
                </span>
              ))}

            </div>
          ) : (
            <p className="mt-5 text-sm text-gray-500">
              Required skills have not been added yet.
            </p>
          )}

        </section>

        {/* Back Button Only */}
        <div className="mt-7">
          <button
            type="button"
            onClick={() => navigate("/internships")}
            className="w-full rounded-xl border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50 sm:w-auto"
          >
            ← Back to Internships
          </button>
        </div>

      </div>
    </section>
  );
};

export default Internshipdetails;
