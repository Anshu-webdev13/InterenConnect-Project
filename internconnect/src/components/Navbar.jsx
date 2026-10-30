
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "null");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const updateUser = () => {
      try {
        setCurrentUser(
          JSON.parse(localStorage.getItem("currentUser") || "null")
        );
      } catch {
        setCurrentUser(null);
      }
    };

    window.addEventListener("userLogin", updateUser);
    window.addEventListener("userLogout", updateUser);

    return () => {
      window.removeEventListener("userLogin", updateUser);
      window.removeEventListener("userLogout", updateUser);
    };
  }, []);

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

  const isAdmin = currentUser?.role === "admin";
  const isCompany = currentUser?.role === "company";
  const isStudent = currentUser?.role === "student";

  const getLinkStyle = (path) => {
    const isActive =
      location.pathname === path ||
      (path !== "/" && location.pathname.startsWith(path));

    return `whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "bg-blue-50 text-blue-700"
        : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
    }`;
  };

  const NavLink = ({ to, children }) => (
    <Link to={to} className={getLinkStyle(to)}>
      {children}
    </Link>
  );

  const NavigationLinks = () => (
    <>
      <NavLink to="/">Home</NavLink>

      {!currentUser && (
        <>
          <NavLink to="/internships">Internships</NavLink>
          <NavLink to="/howitworks">How It Works</NavLink>
        </>
      )}

      {isAdmin && (
        <>
          <NavLink to="/admindashboard">Admin Dashboard</NavLink>
          <NavLink to="/manage-internships">Manage Internships</NavLink>
          <NavLink to="/managestudents">Manage Students</NavLink>
        </>
      )}

      {isStudent && (
        <>
          <NavLink to="/internships">Internships</NavLink>
          <NavLink to="/studentdashboard">Dashboard</NavLink>
          <NavLink to="/myapplications">My Applications</NavLink>
          <NavLink to="/studentprofile">Profile</NavLink>
          <NavLink to="/notifications">Notifications</NavLink>
        </>
      )}

      {isCompany && (
        <>
          <NavLink to="/companydashboard">Company Dashboard</NavLink>
          <NavLink to="/manage-internships">Manage Internships</NavLink>
          <NavLink to="/company-applications">Applications</NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">

        <div className="flex min-h-[76px] items-center justify-between gap-4">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex shrink-0 items-center text-xl font-extrabold tracking-tight sm:text-2xl"
          >
            <span className="text-blue-600">Intern</span>
            <span className="text-gray-800">Connect</span>
            <span className="ml-1.5 h-2 w-2 rounded-full bg-blue-600"></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="ml-auto hidden items-center gap-4 2xl:flex">

            <div className="flex items-center gap-1">
              <NavigationLinks />
            </div>

            <div className="flex shrink-0 items-center gap-3 border-l border-gray-200 pl-4">
              {currentUser ? (
                <>
                  <span className="max-w-[150px] truncate text-sm font-semibold text-gray-700">
                    Hi, {currentUser.name}
                  </span>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-lg bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-blue-600"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="whitespace-nowrap rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile / Tablet Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-2xl text-gray-700 transition hover:bg-gray-100 2xl:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* Mobile and Tablet Navigation */}
        {menuOpen && (
          <div className="border-t border-gray-100 py-5 2xl:hidden">
            <div className="flex flex-col gap-2">

              <NavigationLinks />

              <div className="mt-3 border-t border-gray-100 pt-5">

                {currentUser ? (
                  <div className="flex flex-col gap-3">
                    <p className="px-3 text-sm font-semibold text-blue-700">
                      Logged in as: {currentUser.name}
                    </p>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-lg bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/login"
                      className="rounded-lg border border-gray-200 px-5 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      className="rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;