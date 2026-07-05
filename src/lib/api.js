// Single source of truth for the backend base URL.
// Production (Vercel): set VITE_API_URL to the Cloud Run service URL,
// e.g. https://pashxd-api-xxxxxxxx-ew.a.run.app (or https://api.pashx.com
// once the custom domain is mapped).
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
