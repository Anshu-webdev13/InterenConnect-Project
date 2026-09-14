import React from "react";

const Interenship = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800">
          Find Your Perfect Internship
        </h1>
        <p className="text-gray-600 mt-3">
          Explore the internships thst match your sills and goals
        </p>
      </section>
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-lg p-5 shadow-md flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search internships"
            className="border border-gray-300 rounded-md px-4 py-3 flex-1 outline-none focus:border-blue-500"
          />
          <select className="border corder-gray-300 rounded-md px-4 py-3">
            <option>All Categories</option>
            <option>Web Development</option>
            <option>Java</option>
            <option>Python</option>
          </select>
          <select className="border corder-gray-300 rounded-md px-4 py-3">
            <option>All Types</option>
            <option>Remote</option>
            <option>On-site</option>
          </select>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
            Search
          </button>
        </div>
      </section>
    </div>
  );
};

export default Interenship;
