
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser") || "null");
  });

  useEffect(() => {
    const updateUser = () => {
      setCurrentUser(
        JSON.parse(localStorage.getItem("currentUser") || "null")
      );
    };

    window.addEventListener("userLogin", updateUser);
    window.addEventListener("userLogout", updateUser);

    return () => {
      window.removeEventListener("userLogin", updateUser);
      window.removeEventListener("userLogout", updateUser);
    };
  }, []);

  // Close mobile menu after navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setMenuOpen(false);
    window.dispatchEvent(new Event("userLogout"));
    navigate("/");
  };

  const linkStyle =
    "block whitespace-nowrap text-base font-medium text-gray-700 transition duration-200 hover:text-blue-600";

  const isAdmin = currentUser?.role === "admin";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">

      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-5 py-4 md:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="shrink-0 text-2xl font-bold tracking-tight"
        >
          <span className="text-blue-600">Intern</span>
          <span className="text-gray-800">Connect</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-2xl text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } absolute left-0 top-full w-full flex-col items-start gap-5 border-t border-gray-100 bg-white px-6 py-6 shadow-md md:static md:flex md:w-auto md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >

          <Link to="/" className={linkStyle}>
            Home
          </Link>

          {!currentUser && (
            <>
              <Link to="/internships" className={linkStyle}>
                Internships
              </Link>

              <Link to="/howitworks" className={linkStyle}>
                How It Works
              </Link>
            </>
          )}

          {currentUser && isAdmin && (
            <>
              <Link to="/admindashboard" className={linkStyle}>
                Admin Dashboard
              </Link>

              <Link to="/manage-internships" className={linkStyle}>
                Manage Internships
              </Link>
            </>
          )}

          {currentUser && !isAdmin && (
            <>
              <Link to="/internships" className={linkStyle}>
                Internships
              </Link>

              <Link to="/studentdashboard" className={linkStyle}>
                Dashboard
              </Link>

              <Link to="/myapplications" className={linkStyle}>
                My Applications
              </Link>

              <Link to="/studentprofile" className={linkStyle}>
                Profile
              </Link>

              <Link to="/notifications" className={linkStyle}>
                Notifications
              </Link>
            </>
          )}

          {currentUser ? (
            <>
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
