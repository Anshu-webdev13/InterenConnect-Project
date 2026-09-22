import React from "react";

const Interenship = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800">
          Find Your Perfect Internship
        </h1>

        <p className="text-gray-600 mt-3">
          Explore the internships that match your skills and goals
        </p>
      </section>

     
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-lg p-5 shadow-md flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search internships"
            className="border border-gray-300 rounded-md px-4 py-3 flex-1 outline-none focus:border-blue-500"
          />

          <select className="border border-gray-300 rounded-md px-4 py-3">
            <option>All Categories</option>
            <option>Web Development</option>
            <option>Java</option>
            <option>Python</option>
          </select>

          <select className="border border-gray-300 rounded-md px-4 py-3">
            <option>All Types</option>
            <option>Remote</option>
            <option>On-site</option>
          </select>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
            Search
          </button>
        </div>
      </section>

     
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Available Internships
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
        
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800">
              Web Development Intern
            </h3>

            <p className="text-blue-600 mt-2">Tech Solutions</p>

            <p className="text-gray-600 mt-4">📍 Remote</p>
            <p className="text-gray-600">💼 Full Time</p>
            <p className="text-gray-600">⏳ 2 Months</p>

            <div className="mt-4">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                HTML
              </span>

              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm ml-2">
                CSS
              </span>

              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm ml-2">
                JavaScript
              </span>
            </div>

            <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              View Details
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800">
              Java Developer Intern
            </h3>

            <p className="text-blue-600 mt-2">CodeTech Solutions</p>

            <p className="text-gray-600 mt-4">📍 On-site</p>
            <p className="text-gray-600">💼 Full Time</p>
            <p className="text-gray-600">⏳ 3 Months</p>

            <div className="mt-4">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                Java
              </span>

              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm ml-2">
                OOP
              </span>

              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm ml-2">
                SQL
              </span>
            </div>

            <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              View Details
            </button>
          </div>

          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800">
              Python Developer Intern
            </h3>

            <p className="text-blue-600 mt-2">Innovate Labs</p>

            <p className="text-gray-600 mt-4">📍 Remote</p>
            <p className="text-gray-600">💼 Part Time</p>
            <p className="text-gray-600">⏳ 2 Months</p>

            <div className="mt-4">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                Python
              </span>

              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm ml-2">
                Django
              </span>

              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm ml-2">
                SQL
              </span>
            </div>

            <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              View Details
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Interenship;
