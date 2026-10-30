
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    let users = [];

    try {
      users = JSON.parse(localStorage.getItem("users") || "[]");

      if (!Array.isArray(users)) {
        users = [];
      }
    } catch (error) {
      alert("Unable to read registered users. Please try again.");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = users.find(
      (user) => user.email?.toLowerCase() === normalizedEmail
    );

    if (existingUser) {
      alert("This email is already registered. Please login.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      password,
      role,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-12 flex items-center justify-center">

      <div className="w-full max-w-lg">

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
            Start your journey towards a successful career.
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-7 sm:p-9">

          <div className="text-center mb-7">
            <h1 className="text-3xl font-bold text-gray-800">
              Create Account
            </h1>

            <p className="text-gray-500 mt-2">
              Join InternConnect and explore opportunities
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                autoComplete="name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Register As
              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>

              <p className="text-xs text-gray-500 mt-2">
                Select the account type you want to create.
              </p>
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
                  placeholder="Create a password"
                  autoComplete="new-password"
                  minLength={6}
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  className="w-full px-4 py-3 pr-16 rounded-lg border border-gray-300 bg-gray-50 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md transition duration-300 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
            >
              Create Account
            </button>

          </form>

          {/* Login Link */}
          <div className="mt-7 text-center border-t border-gray-100 pt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:text-blue-800 hover:underline"
              >
                Login
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

export default Register;