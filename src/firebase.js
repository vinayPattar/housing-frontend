// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-6ddf6.firebaseapp.com",
  projectId: "mern-estate-6ddf6",
  storageBucket: "mern-estate-6ddf6.appspot.com",
  messagingSenderId: "593791586374",
  appId: "1:593791586374:web:227e446d6e95b7eb4c3a47"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);