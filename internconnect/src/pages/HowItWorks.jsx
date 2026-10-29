import React from "react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    icon: "👤",
    title: "Create Your Account",
    description:
      "Register on InternConnect and create your student account to get started.",
  },
  {
    number: "02",
    icon: "🔍",
    title: "Explore Internships",
    description:
      "Browse internships by category, search for opportunities, and find the right role.",
  },
  {
    number: "03",
    icon: "📝",
    title: "Apply for Internship",
    description:
      "Choose an internship, check its details, and submit your application.",
  },
  {
    number: "04",
    icon: "📊",
    title: "Track Your Application",
    description:
      "Visit your dashboard and My Applications page to check your application status.",
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 px-6 py-16 text-center text-white">
        <h1 className="text-3xl font-bold md:text-5xl">
          How InternConnect Works
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base text-blue-100 md:text-lg">
          Start your internship journey in four simple steps. Discover
          opportunities and take the next step toward your career.
        </p>

        <Link
          to="/internships"
          className="mt-7 inline-block rounded-lg bg-white px-6 py-3
          font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          Explore Internships
        </Link>
      </section>

      {/* Steps Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Your Journey Starts Here
          </h2>
          <p className="mt-3 text-gray-600">
            Follow these simple steps to find your next opportunity.
          </p>
        </div>

        <div
          className="grid grid-cols-1 gap-7 sm:grid-cols-2
        lg:grid-cols-4"
        >
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-xl border border-gray-100 bg-white
              p-7 shadow-md transition duration-300 hover:-translate-y-2
              hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl">{step.icon}</span>
                <span className="text-2xl font-bold text-blue-200">
                  {step.number}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-800">
                {step.title}
              </h3>

              <p className="mt-3 leading-7 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 pb-16">
        <div
          className="mx-auto max-w-5xl rounded-2xl bg-blue-50
        px-6 py-12 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
            Ready to Build Your Future?
          </h2>

          <p className="mt-4 text-gray-600">
            Find opportunities that match your skills and career goals.
          </p>

          <Link
            to="/internships"
            className="mt-6 inline-block rounded-lg bg-blue-600
            px-7 py-3 font-semibold text-white transition
            hover:bg-blue-700"
          >
            Find Internships
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
