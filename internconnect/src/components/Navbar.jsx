import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser") || "null");
  });

  useEffect(() => {
    const updateUser = () => {
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser") || "null"));
    };

    window.addEventListener("userLogin", updateUser);
    window.addEventListener("userLogout", updateUser);

    return () => {
      window.removeEventListener("userLogin", updateUser);
      window.removeEventListener("userLogout", updateUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    window.dispatchEvent(new Event("userLogout"));
    navigate("/");
  };

  const linkStyle =
    "whitespace-nowrap text-base font-medium text-gray-700 transition duration-200 hover:text-blue-600";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-x-12 gap-y-4 px-8 py-5">
        {/* Logo */}
        <Link to="/" className="shrink-0 text-2xl font-bold tracking-tight">
          <span className="text-blue-600">Intern</span>
          <span className="text-gray-800">Connect</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <Link to="/" className={linkStyle}>
            Home
          </Link>

          <Link to="/internships" className={linkStyle}>
            Internships
          </Link>

          <Link to="/how-it-works" className={linkStyle}>
            How It Works
          </Link>

          {currentUser ? (
            <>
              <Link to="/studentdashboard" className={linkStyle}>
                Dashboard
              </Link>

              <Link to="/myapplications" className={linkStyle}>
                My Applications
              </Link>

              <span className="whitespace-nowrap text-base font-semibold text-blue-600">
                Hi, {currentUser.name}
              </span>

              <button
                onClick={handleLogout}
                className="whitespace-nowrap rounded-lg bg-red-500 px-5 py-2.5 text-base font-semibold text-white transition duration-200 hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkStyle}>
                Login
              </Link>

              <Link
                to="/register"
                className="whitespace-nowrap rounded-lg bg-blue-600 px-6 py-2.5 text-base font-semibold text-white transition duration-200 hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
