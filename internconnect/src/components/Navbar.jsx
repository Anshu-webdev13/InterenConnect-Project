
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
  } catch {
    return null;
  }
};

const Navbar = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(getCurrentUser);
  const [menuOpen, setMenuOpen] = useState(false);
  const [managementOpen, setManagementOpen] = useState(false);

  useEffect(() => {
    const updateUser = () => setCurrentUser(getCurrentUser());

    window.addEventListener("userLogin", updateUser);
    window.addEventListener("userLogout", updateUser);
    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("userLogin", updateUser);
      window.removeEventListener("userLogout", updateUser);
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    closeMenu();
    window.dispatchEvent(new Event("userLogout"));
    navigate("/");
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setManagementOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `whitespace-nowrap rounded-lg px-3 py-2.5 text-[17px] font-semibold transition-all duration-200 ${
      isActive
        ? "bg-blue-50 text-blue-700"
        : "text-gray-700 hover:bg-gray-100 hover:text-blue-700"
    }`;

  const role = currentUser?.role;

  const guestLinks = [
    { name: "Home", path: "/" },
    { name: "Internships", path: "/internships" },
    { name: "How It Works", path: "/howitworks" },
  ];

  const studentLinks = [
    { name: "Dashboard", path: "/studentdashboard" },
    { name: "Internships", path: "/internships" },
    { name: "My Applications", path: "/myapplications" },
    { name: "Profile", path: "/studentprofile" },
    { name: "Notifications", path: "/notifications" },
  ];

  const companyLinks = [
    { name: "Dashboard", path: "/companydashboard" },
    { name: "Manage Internships", path: "/manage-internships" },
  ];

  const adminLinks = [
    { name: "Dashboard", path: "/admindashboard" },
  ];

  let links = guestLinks;

  if (role === "student") links = studentLinks;
  if (role === "company") links = companyLinks;
  if (role === "admin") links = adminLinks;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">

        <div className="flex min-h-[82px] items-center justify-between gap-5">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="shrink-0 text-[30px] font-extrabold tracking-tight text-blue-700"
          >
            Intern<span className="text-gray-800">Connect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 xl:flex">

            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={linkClass}
              >
                {link.name}
              </NavLink>
            ))}

            {/* Admin Management */}
            {role === "admin" && (
              <div className="relative">
                <button
                  onClick={() => setManagementOpen(!managementOpen)}
                  className="whitespace-nowrap rounded-lg px-3 py-2.5 text-[17px] font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-blue-700"
                >
                  Management
                  <span className="ml-2 text-xs">▼</span>
                </button>

                {managementOpen && (
                  <div className="absolute right-0 top-14 z-50 w-60 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">

                    <NavLink
                      to="/adminmanageinternships"
                      onClick={() => setManagementOpen(false)}
                      className={linkClass}
                    >
                      Manage Internships
                    </NavLink>

                    <NavLink
                      to="/managestudents"
                      onClick={() => setManagementOpen(false)}
                      className={linkClass}
                    >
                      Manage Students
                    </NavLink>

                    <NavLink
                      to="/manage-companies"
                      onClick={() => setManagementOpen(false)}
                      className={linkClass}
                    >
                      Manage Companies
                    </NavLink>

                  </div>
                )}
              </div>
            )}

            {/* Guest Buttons */}
            {!currentUser && (
              <div className="ml-4 flex shrink-0 items-center gap-3 border-l border-gray-200 pl-4">

                <Link
                  to="/login"
                  className="rounded-lg px-5 py-3 text-[17px] font-bold text-blue-700 transition hover:bg-blue-50"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-lg bg-blue-700 px-6 py-3 text-[17px] font-bold text-white shadow-sm transition hover:bg-blue-800"
                >
                  Register
                </Link>

              </div>
            )}

            {/* Logged-in User */}
            {currentUser && (
              <div className="ml-3 flex shrink-0 items-center gap-3 border-l border-gray-200 pl-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                  {currentUser.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="max-w-[135px]">
                  <p className="truncate text-base font-bold text-gray-800">
                    {currentUser.name || currentUser.companyName || "User"}
                  </p>
                  <p className="text-sm font-medium capitalize text-gray-500">
                    {role}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-red-50 px-4 py-3 text-base font-bold text-red-600 transition hover:bg-red-100"
                >
                  Logout
                </button>

              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-gray-200 p-2.5 text-gray-700 transition hover:bg-gray-100 xl:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? (
              <span className="text-2xl">✕</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="border-t border-gray-100 py-4 xl:hidden">
            <div className="flex flex-col gap-2">

              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={linkClass}
                >
                  {link.name}
                </NavLink>
              ))}

              {/* Admin Mobile Management */}
              {role === "admin" && (
                <>
                  <p className="px-3 pt-3 text-sm font-bold uppercase tracking-wide text-gray-400">
                    Management
                  </p>

                  <NavLink
                    to="/adminmanageinternships"
                    onClick={closeMenu}
                    className={linkClass}
                  >
                    Manage Internships
                  </NavLink>

                  <NavLink
                    to="/managestudents"
                    onClick={closeMenu}
                    className={linkClass}
                  >
                    Manage Students
                  </NavLink>

                  <NavLink
                    to="/manage-companies"
                    onClick={closeMenu}
                    className={linkClass}
                  >
                    Manage Companies
                  </NavLink>
                </>
              )}

              {/* Mobile Guest Buttons */}
              {!currentUser ? (
                <div className="mt-3 flex flex-col gap-3 border-t border-gray-100 pt-4">

                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="rounded-lg border border-blue-700 px-4 py-3 text-center text-lg font-bold text-blue-700 transition hover:bg-blue-50"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="rounded-lg bg-blue-700 px-4 py-3 text-center text-lg font-bold text-white transition hover:bg-blue-800"
                  >
                    Register
                  </Link>

                </div>
              ) : (
                <div className="mt-3 border-t border-gray-100 pt-4">

                  <div className="mb-4 flex items-center gap-3 px-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                      {currentUser.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div>
                      <p className="text-base font-bold text-gray-800">
                        {currentUser.name || currentUser.companyName || "User"}
                      </p>
                      <p className="text-sm capitalize text-gray-500">
                        {role}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full rounded-lg bg-red-50 px-4 py-3 text-base font-bold text-red-600 transition hover:bg-red-100"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;