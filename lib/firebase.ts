// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT77DLqV1-vz1QSOIj7Qpkv8UyYDqpKdg",
  authDomain: "authntication-c0e8e.firebaseapp.com",
  projectId: "authntication-c0e8e",
  storageBucket: "authntication-c0e8e.appspot.com",
  messagingSenderId: "261153967817",
  appId: "1:261153967817:web:9ca030f3d5609be77bc718",
  measurementId: "G-1MF2G4FE60",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const getAnalyticsClient = () => {
  if (typeof window === "undefined") return null;
  const { getAnalytics } = require("firebase/analytics");
  return getAnalytics(app);
};
