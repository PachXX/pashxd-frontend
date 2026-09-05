import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext.jsx";

const container = document.getElementById("root");

const tree = (
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);

// `npm run build` prerenders each marketing route to static HTML (see
// scripts/prerender.mjs), so #root usually already holds markup that must be
// adopted rather than thrown away and re-created — hydrating keeps the
// first paint the browser already made instead of blanking it.
//
// The check is on actual content, not on a build flag: `vite dev` serves the
// untouched index.html with an empty #root, and hydrateRoot against an empty
// container warns and re-renders anyway. This keeps both paths correct.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
