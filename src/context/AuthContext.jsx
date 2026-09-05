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

  // This provider used to return `<div>Loading...</div>` for the whole tree
  // until GET /api/auth/me resolved. On a public marketing site that meant
  // every visitor waited on a cross-origin auth round-trip before seeing any
  // content, and the first paint of every page — including whatever a crawler
  // or the prerenderer captures — was the literal string "Loading...".
  //
  // Only LoginPage consumes this context, and only for `setUser`, so the
  // session check now runs in the background and `loading` is exposed for the
  // one screen that cares instead of gating the entire application.
  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}