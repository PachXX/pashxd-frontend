// Firebase client SDK init (project: pashxd-e56c5).
// Config comes from VITE_FIREBASE_* env vars — see .env / .env.example.
// NOTE: existing app auth is a custom JWT flow (see AuthContext.jsx); this
// just makes Firebase Auth/Analytics available for future use, it does not
// replace the current login flow.
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { isSupported, getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

// Analytics only works in a browser with measurement support (not SSR/build).
export let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((ok) => {
    if (ok) analytics = getAnalytics(firebaseApp);
  });
}
