import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_URL || "https://pashxd-backend.onrender.com";

  useEffect(() => {
    // Session lives in an httpOnly cookie (new backend). TRANSITIONAL: also
    // send the stored Bearer token — the currently deployed backend sets no
    // cookie. Remove the header once the cookie-auth backend is live.
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/api/auth/me`, {
      credentials: "include",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => {
        if (!res.ok) throw new Error("Session expired");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    fetch(`${BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).finally(() => {
      setUser(null);
      window.location.href = "/login";
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}