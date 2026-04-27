// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6NfEXpUyADWeDQ_foFTDC7LxiaNVFnHk",
  authDomain: "eattbitlocker.firebaseapp.com",
  projectId: "eattbitlocker",
  storageBucket: "eattbitlocker.firebasestorage.app",
  messagingSenderId: "474755627773",
  appId: "1:474755627773:web:509be12acc92747515dc94",
  measurementId: "G-W9HH50P5DJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
