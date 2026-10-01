import React from 'react'

const Applynow = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800">
            Apply For Internship
          </h1>
          <p className="text-gray-800 mt-2">
            Web Development Intern at Tech Solution
          </p>
          <form className="mt-8 space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-md px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 rounded-md px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                College Name
              </label>

              <input
                type="text"
                placeholder="Enter your college name"
                className="w-full border border-gray-300 rounded-md px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Course / Branch
              </label>

              <input
                type="text"
                placeholder="e.g. B.Tech CSE"
                className="w-full border border-gray-300 rounded-md px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Resume
              </label>

              <input
                type="file"
                className="w-full border border-gray-300 rounded-md px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Cover Message
              </label>

              <textarea
                rows="5"
                placeholder="Why are you interested in this internship?"
                className="w-full border border-gray-300 rounded-md px-4 py-3"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
            >
              Apply Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Applynow
