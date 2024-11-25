// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore SDK

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "XYZ",
  authDomain: "notekeeper-e2abea.firebaseapp.com",
  projectId: "notekeeper-e2abea",
  storageBucket: "notekeeper-e2abea.firebasestorage.app",
  messagingSenderId: "653675331732",
  appId: "1:653675331732:web:3997ebe63273fec7e85f481",
  measurementId: "G-VDZFKZ1TLV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app); // Add Firestore initialization

// Initialize Analytics (optional)
const analytics = getAnalytics(app);

export { db }; // Export db for use in other parts of the app
