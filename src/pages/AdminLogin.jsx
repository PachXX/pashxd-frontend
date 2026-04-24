import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Use your Render backend
  const BASE_URL = "https://pashxd-backend.onrender.com";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid server response");
      }

      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) {
        alert(data?.detail || "Login failed");
        return;
      }

      // ✅ Save token
      localStorage.setItem("token", data.access_token);

      // ✅ Detect role (supports both formats)
      const role = data?.user?.role || data?.role;

      // ✅ Redirect properly
      if (role === "admin") {
        window.location.href = "/admin/overview";
      } else {
        window.location.href = "/";
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-10">
      <h1>Admin Login</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}