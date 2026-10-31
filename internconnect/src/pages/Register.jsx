import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    // Keep the logo small to avoid localStorage storage limits.
    if (file.size > 1024 * 1024) {
      alert("Logo size must be less than 1 MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setCompanyLogo(reader.result);
      setLogoPreview(reader.result);
    };

    reader.onerror = () => {
      alert("Unable to read logo. Please try another image.");
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (role === "company" && !companyName.trim()) {
      alert("Please enter your company name.");
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
      (user) => user.email?.toLowerCase() === normalizedEmail,
    );

    if (existingUser) {
      alert("This email is already registered. Please login.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      companyName: role === "company" ? companyName.trim() : "",
      companyLogo: role === "company" ? companyLogo : "",
      email: normalizedEmail,
      password,
      role,
    };

    users.push(newUser);

    try {
      localStorage.setItem("users", JSON.stringify(users));

      window.dispatchEvent(new Event("userRegistered"));

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert("Unable to save your account. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-lg">
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

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-7 sm:p-9">
          <div className="text-center mb-7">
            <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>

            <p className="text-gray-500 mt-2">
              Join InternConnect and explore opportunities
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Register As
              </label>

              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setCompanyLogo("");
                  setLogoPreview("");
                }}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="student">Student</option>
                <option value="company">Company / Recruiter</option>
              </select>
            </div>

            {/* Company Details */}
            {role === "company" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name
                  </label>

                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter your company name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Company Logo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Logo
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm"
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Upload PNG, JPG or another image (maximum 1 MB).
                  </p>

                  {logoPreview && (
                    <div className="mt-4 flex items-center gap-3">
                      <img
                        src={logoPreview}
                        alt="Company logo preview"
                        className="h-16 w-16 rounded-xl border border-gray-200 bg-white object-contain p-1"
                      />

                      <span className="text-sm text-green-600 font-medium">
                        Logo selected successfully
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {role === "company" ? "Contact Person Name" : "Full Name"}
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={
                  role === "company"
                    ? "Enter contact person's name"
                    : "Enter your full name"
                }
                autoComplete="name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                  placeholder="Create a password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  className="w-full px-4 py-3 pr-16 rounded-lg border border-gray-300 bg-gray-50 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-600"
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
                  className="w-full px-4 py-3 pr-16 rounded-lg border border-gray-300 bg-gray-50 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-600"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md transition hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>

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
