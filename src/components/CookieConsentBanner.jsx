import { useState, useEffect, useSyncExternalStore } from "react";
import { updateConsent } from "../analytics/googleAnalytics";

const subscribe = () => () => {};

import { readConsent, saveConsent } from "../lib/consentStorage";

export default function CookieConsentBanner() {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const [dismissed, setDismissed] = useState(false);
  const visible = mounted && !dismissed && !readConsent();

  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      // Re-apply saved decision on every page load so GA consent state
      // is always in sync even after a hard refresh.
      updateConsent(stored === "accepted");
    }
  }, []);

  function accept() {
    saveConsent("accepted");
    updateConsent(true);
    setDismissed(true);
  }

  function decline() {
    saveConsent("declined");
    updateConsent(false);
    setDismissed(true);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "#0D1117",
        color: "#e5e7eb",
        padding: "16px 24px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "12px",
        boxShadow: "0 -2px 12px rgba(0,0,0,0.3)",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        fontSize: "13px",
        lineHeight: "1.5",
      }}
    >
      <p style={{ margin: 0, flex: "1 1 300px", color: "#d1d5db" }}>
        With your permission, Google Analytics uses cookies to help us understand site usage. Google processes this analytics data.{" "}
        <a
          href="/privacy"
          style={{ color: "#2ECC71", textDecoration: "underline" }}
        >
          Privacy Policy
        </a>
      </p>
      <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{
            padding: "8px 18px",
            borderRadius: "8px",
            border: "1px solid #374151",
            background: "transparent",
            color: "#9ca3af",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          Decline
        </button>
        <button
          onClick={accept}
          style={{
            padding: "8px 18px",
            borderRadius: "8px",
            border: "none",
            background: "#2ECC71",
            color: "#fff",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
