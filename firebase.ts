import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = window.APP_CONFIG ? {
  apiKey: window.APP_CONFIG.FIREBASE_API_KEY,
  authDomain: window.APP_CONFIG.FIREBASE_AUTH_DOMAIN,
  projectId: window.APP_CONFIG.FIREBASE_PROJECT_ID,
  storageBucket: window.APP_CONFIG.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: window.APP_CONFIG.FIREBASE_MESSAGING_SENDER_ID,
  appId: window.APP_CONFIG.FIREBASE_APP_ID,
  measurementId: window.APP_CONFIG.FIREBASE_MEASUREMENT_ID,
} : {};

if (!firebaseConfig.apiKey) {
    const errorDiv = document.createElement('div');
    errorDiv.style.position = 'fixed';
    errorDiv.style.top = '0';
    errorDiv.style.left = '0';
    errorDiv.style.width = '100%';
    errorDiv.style.padding = '20px';
    errorDiv.style.backgroundColor = 'red';
    errorDiv.style.color = 'white';
    errorDiv.style.textAlign = 'center';
    errorDiv.style.zIndex = '9999';
    errorDiv.innerText = "CRITICAL ERROR: Firebase is not configured. The application cannot start.";
    document.body.appendChild(errorDiv);
    throw new Error("Firebase API Key is not configured. Please check your deployment secrets and CI/CD workflow.");
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };