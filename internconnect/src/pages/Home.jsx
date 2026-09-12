import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-between md:flex-row gap-10">
        <div className="md:w-1/2">
          <p className="text-blue-600 font-semibold mb-4">
            Your Career . Your Future
          </p>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Find The Right Internship
            <span className="text-blue-600"> Build Your Future</span>
          </h1>
          <p className="text-gray-600 text-lg mt-6 max-w-lg">
            Discover internships that match your skills, interest and career
            goal.
          </p>
          <div className="flex gap-4 mt-8">
            <Link
              to="/internships"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Explore Internships
            </Link>
            <Link
              to="/register"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition font-medium"
            >
              Get Started
            </Link>
          </div>
          <div className="flex mt-10 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-blue-600">100+</h3>
              <p className="text-gray-500 text-sm">Opportunities</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-600">50+</h3>
              <p className="text-gray-500 text-sm">Companies</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-600">500+</h3>
              <p className="text-gray-500 text-sm">Students</p>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gary-500">Featured Opportunity</p>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Fronted Developer
                  </h2>
                </div>
                <div className="bg-blue-100 p-3 rounded-xl text-2xl"> 💻 </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center text-xl">
                  🏢
                </div>
                <div>
                 
                  <p className="font-semibold text-gray-800">
                  
                    Tech Company
                  </p>
                  <p className="text-sm text-gray-500">
                   
                    Remote • 3 Months
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
