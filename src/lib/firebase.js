import { initializeApp, getApps } from "firebase/app";
import { isSupported, getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const firebaseEnabled = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

export const firebaseApp = firebaseEnabled
  ? getApps()[0] || initializeApp(firebaseConfig)
  : null;

export const auth = firebaseApp ? getAuth(firebaseApp) : null;

// Analytics needs a real browser (no SSR) and is unsupported in some
// environments (e.g. embedded webviews); isSupported() checks that.
export let analytics = null;
if (firebaseApp && firebaseConfig.measurementId) {
  isSupported().then((supported) => {
    if (supported) analytics = getAnalytics(firebaseApp);
  });
}
