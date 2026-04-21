import { useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async (e) => {
   e.preventDefault();

   const res = await fetch("/api/auth/login", {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify({
       email,
       password
     })
   });

   const data = await res.json();

   if (!res.ok) {
     alert("Login failed");
     return;
   }

   localStorage.setItem("token", data.access_token);

   window.location.href = "/admin";
 };
  return (
    <div className="p-10">
      <h1>Admin Login</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}