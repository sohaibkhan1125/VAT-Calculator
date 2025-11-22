// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFpdWwTilX0XqRrNxHJLEyC7OmTm32PNc",
  authDomain: "vat-calculator-a1ef2.firebaseapp.com",
  projectId: "vat-calculator-a1ef2",
  storageBucket: "vat-calculator-a1ef2.firebasestorage.app",
  messagingSenderId: "275099181265",
  appId: "1:275099181265:web:8d395553ed8bab2101e5f0",
  measurementId: "G-5WELDZX0VK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Only initialize analytics in production
let analytics = null;
if (process.env.NODE_ENV === 'production') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn('Analytics initialization failed:', error);
  }
}

export { auth, db, analytics };
export default app;
