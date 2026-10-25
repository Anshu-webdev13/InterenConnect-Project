import React from "react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description:
        "Register on InternConnect and create your student account to get started.",
    },
    {
      number: "02",
      title: "Explore Internships",
      description:
        "Browse internship opportunities and find roles that match your skills and interests.",
    },
    {
      number: "03",
      title: "Apply for Internship",
      description:
        "Open internship details, complete the application form and submit your application.",
    },
    {
      number: "04",
      title: "Track Your Application",
      description:
        "Visit My Applications to check your application status and follow your progress.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 px-6 py-16 text-center text-white">
        <h1 className="text-4xl font-bold md:text-5xl">
          How InternConnect Works
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
          Your journey to finding the right internship starts here. Follow these
          simple steps to get started.
        </p>

        <Link
          to="/internships"
          className="mt-8 inline-block rounded-lg bg-white px-7 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          Explore Internships
        </Link>
      </section>

      {/* Steps Section */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Four Simple Steps
          </h2>

          <p className="mt-3 text-gray-600">
            Start building your career with InternConnect.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                {step.number}
              </div>

              <h3 className="text-xl font-semibold text-gray-800">
                {step.title}
              </h3>

              <p className="mt-3 leading-7 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white px-6 py-10 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-gray-800">
            Ready to Start Your Journey?
          </h2>

          <p className="mt-4 text-gray-600">
            Discover opportunities, gain experience and take the next step
            toward your career goals.
          </p>

          <Link
            to="/internships"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Find Internships
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
