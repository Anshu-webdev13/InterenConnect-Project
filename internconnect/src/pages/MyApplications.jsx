import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const savedApplications = JSON.parse(
      localStorage.getItem("applications") || "[]",
    );

    setApplications(savedApplications);
  }, []);

  const statusStyle = {
    Pending: "bg-yellow-100 text-yellow-700",
    Accepted: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
       
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            My Applications
          </h1>

          <p className="text-gray-600 mt-3">
            Track and manage all your internship applications.
          </p>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-gray-500">Total Applications</p>
            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {applications.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-gray-500">Pending</p>
            <h2 className="text-3xl font-bold text-yellow-600 mt-2">
              {applications.filter((app) => app.status === "Pending").length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-gray-500">Accepted</p>
            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {applications.filter((app) => app.status === "Accepted").length}
            </h2>
          </div>
        </div>

      
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Your Applications
          </h2>

          {applications.length === 0 ? (
         
            <div className="bg-white rounded-xl shadow-sm border p-10 text-center">
              <div className="text-5xl mb-4">📄</div>

              <h3 className="text-xl font-semibold text-gray-800">
                No Applications Yet
              </h3>

              <p className="text-gray-500 mt-3 mb-6">
                You haven't applied for any internships yet. Explore internships
                and start your career journey!
              </p>

              <Link
                to="/internships"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Explore Internships
              </Link>
            </div>
          ) : (
           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {app.title || "Internship"}
                      </h3>

                      <p className="text-gray-600 mt-2">
                        {app.company || "Company"}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                        statusStyle[app.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {app.status || "Pending"}
                    </span>
                  </div>

                  <div className="border-t mt-5 pt-4 space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-800">
                        Application Date:
                      </span>{" "}
                      {app.date || "Not available"}
                    </p>

                    {app.name && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-800">
                          Applicant:
                        </span>{" "}
                        {app.name}
                      </p>
                    )}

                    {app.email && (
                      <p className="text-sm text-gray-600 break-all">
                        <span className="font-medium text-gray-800">
                          Email:
                        </span>
                        {app.email}
                      </p>
                    )}
                  </div>

                  <div className="mt-5">
                    <Link
                      to="/internships"
                      className="inline-block text-blue-600 font-medium hover:underline"
                    >
                      Explore More Internships →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
