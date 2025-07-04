// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration from your project's environment variables.
// These variables are injected by the CI/CD pipeline via config.js
const firebaseConfig = {
  apiKey: window.APP_CONFIG.FIREBASE_API_KEY,
  authDomain: window.APP_CONFIG.FIREBASE_AUTH_DOMAIN,
  projectId: window.APP_CONFIG.FIREBASE_PROJECT_ID,
  storageBucket: window.APP_CONFIG.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: window.APP_CONFIG.FIREBASE_MESSAGING_SENDER_ID,
  appId: window.APP_CONFIG.FIREBASE_APP_ID,
  measurementId: window.APP_CONFIG.FIREBASE_MEASUREMENT_ID, // This one is often optional
};

// Basic validation to ensure Firebase config is loaded.
if (!firebaseConfig.apiKey) {
    throw new Error("Firebase API Key is not configured. Please check your deployment secrets and CI/CD workflow.");
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };