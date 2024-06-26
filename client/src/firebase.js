// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tech-blogs-d1e7e.firebaseapp.com",
  projectId: "tech-blogs-d1e7e",
  storageBucket: "tech-blogs-d1e7e.appspot.com",
  messagingSenderId: "595626321480",
  appId: "1:595626321480:web:e1a75fc093e1c654cf1a7d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);