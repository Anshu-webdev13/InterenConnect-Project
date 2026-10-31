
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    let users = [];

    // Get registered users
    try {
      users = JSON.parse(localStorage.getItem("users") || "[]");

      if (!Array.isArray(users)) {
        users = [];
      }
    } catch (error) {
      alert("Unable to read user data. Please try again.");
      return;
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Find matching user
    const loggedInUser = users.find(
      (user) =>
        user.email?.trim().toLowerCase() === normalizedEmail &&
        user.password === password
    );

    if (!loggedInUser) {
      alert("Invalid email or password. Please register first.");
      return;
    }

    // Check user role
    const userRole = loggedInUser.role || "student";

    if (!["student", "company", "admin"].includes(userRole)) {
      alert("Invalid user role. Please contact the administrator.");
      return;
    }

    // Save current user
    const currentUser = {
      id: loggedInUser.id,
      name: loggedInUser.name || "",
      companyName: loggedInUser.companyName || "",
      email: loggedInUser.email,
      role: userRole,
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(currentUser)
    );

    // Update Navbar
    window.dispatchEvent(new Event("userLogin"));

    // Success message
    alert(
      `Login successful! Welcome ${
        loggedInUser.name ||
        loggedInUser.companyName ||
        "User"
      }.`
    );

    // Navigate according to role
    if (userRole === "admin") {
      navigate("/admindashboard");
    } else if (userRole === "company") {
      navigate("/companydashboard");
    } else {
      navigate("/studentdashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-12 flex items-center justify-center">

      <div className="w-full max-w-md">

        {/* Logo and Branding */}
        <div className="text-center mb-8">

          <Link to="/" className="inline-flex items-center gap-2">

            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
              I
            </div>

            <span className="text-2xl font-bold text-gray-800">
              Intern<span className="text-blue-600">Connect</span>
            </span>

          </Link>

          <p className="text-gray-500 mt-3">
            Your journey towards a successful career starts here.
          </p>

        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-7 sm:p-9">

          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-gray-800">
              Welcome Back!
            </h1>

            <p className="text-gray-500 mt-2">
              Login to continue to your account
            </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* Password */}
            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 pr-16 rounded-lg border border-gray-300 bg-gray-50 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md transition duration-300 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
            >
              Login to Account
            </button>

          </form>

          {/* Register Link */}
          <div className="mt-7 text-center border-t border-gray-100 pt-6">

            <p className="text-gray-600">
              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-semibold text-blue-600 hover:text-blue-800 hover:underline"
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

        {/* Back to Home */}
        <p className="text-center mt-6">

          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-blue-600 transition"
          >
            ← Back to Home
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;
