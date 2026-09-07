import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="bg-white flex justify-between px-5 py-5 shadow-md items-center">
      <h2 className="text-2xl font-bold text-blue-600">InternConnect</h2>
      <div className="flex items-center gap-8">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Link to="/internships" className="text-gray-700 hover:text-blue-600">
          Internships
        </Link>
        <Link to="/how-it-works" className="text-gray-700 hover:text-blue-600">
          How It Works
        </Link>
        <Link to="/login" className="text-gray-700 hover:text-blue-600">
          Login
        </Link>
        <Link to="/register" className="text-gray-700 hover:text-blue-600">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Navbar
