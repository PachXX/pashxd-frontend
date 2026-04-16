import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import Container from "../components/layout/Container";

import logo from "../assets/logos/pashxd-logo2.jpg";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      // =========================================================
      // TODO: Replace with your actual auth API endpoint
      // Example:
      // const response = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) throw new Error("Invalid credentials");
      // const { token } = await response.json();
      // localStorage.setItem("authToken", token);
      // navigate("/dashboard");
      // =========================================================

      console.log("[Login] Attempting login:", formData.email);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      setError("Backend not connected yet. This is a placeholder login.");
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-green-50/40">

      {/* Top bar — minimal, just logo */}
      <header className="pt-6 md:pt-8">
        <Container>
          <Link to="/" className="inline-flex items-center gap-3">
            <img src={logo} alt="PashxD" className="h-10 w-10 rounded-xl object-cover" />
            <span className="text-lg font-semibold text-[#0A2540]">
              Pash<span className="text-[#15803D]">xD</span>
            </span>
          </Link>
        </Container>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-10 md:py-16">
        <div className="w-full max-w-md">

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0A2540] mb-3">
              Welcome back
            </h1>
            <p className="text-slate-500 text-sm md:text-base">
              Sign in to your PashxD account
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xl"
          >

            {/* Email */}
            <div className="mb-5">
              <label htmlFor="email" className="block text-xs font-semibold text-[#0A2540] mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-[#0A2540] placeholder:text-slate-400 focus:outline-none focus:border-[#15803D] focus:ring-2 focus:ring-green-100 transition"
              />
            </div>

            {/* Password */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-semibold text-[#0A2540]">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-[#15803D] hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-xl text-sm text-[#0A2540] placeholder:text-slate-400 focus:outline-none focus:border-[#15803D] focus:ring-2 focus:ring-green-100 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-100 text-xs text-red-600">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-[#15803D] hover:bg-[#166534] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-full font-semibold py-3.5 text-sm shadow-lg shadow-green-600/20 hover:-translate-y-[1px] transition-all duration-300"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400">or</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Book a demo CTA */}
            <Link
              to="/book-demo"
              className="block w-full text-center border border-slate-200 hover:border-green-200 hover:bg-green-50/40 text-[#0A2540] rounded-full font-semibold py-3.5 text-sm transition-all duration-300"
            >
              Don't have an account? Book a demo
            </Link>

          </form>

          {/* Small print */}
          <p className="text-center text-xs text-slate-400 mt-6">
            By signing in, you agree to our{" "}
            <Link to="/terms" className="underline hover:text-[#15803D]">Terms</Link>
            {" "}and{" "}
            <Link to="/privacy" className="underline hover:text-[#15803D]">Privacy Policy</Link>.
          </p>

        </div>
      </main>

    </div>
  );
}