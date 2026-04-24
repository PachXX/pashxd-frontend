import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Container from "../components/layout/Container";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logos/pashxd-logo2.jpg";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  // ✅ HARDCODED BACKEND (to avoid env issues for now)
  const BASE_URL = "https://pashxd-backend.onrender.com";

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
      console.log("🚀 Sending login request...");

      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid server response");
      }

      console.log("✅ Response:", data);

      if (!res.ok) {
        throw new Error(data?.detail || "Login failed");
      }

      // ✅ Save token
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
      }

      // ✅ Save user
      if (data.user) {
        setUser(data.user);
      }

      // ✅ Redirect
      if (data?.user?.role === "admin") {
        navigate("/admin/leads", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

    } catch (err) {
      console.error("❌ Login error:", err);
      setError(err.message || "Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-green-50/40">

      {/* Header */}
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
              <label className="block text-xs font-semibold text-[#0A2540] mb-1.5">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm"
              />
            </div>

            {/* Password */}
            <div className="mb-2">
              <label className="block text-xs font-semibold text-[#0A2540] mb-1.5">
                Password
              </label>

              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-xl text-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 text-red-500 text-sm">{error}</div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-full transition"
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>

          </form>

        </div>
      </main>
    </div>
  );
}