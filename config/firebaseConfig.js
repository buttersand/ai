// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "aiinterior-1cec8.firebaseapp.com",
  projectId: "aiinterior-1cec8",
  storageBucket: "aiinterior-1cec8.firebasestorage.app",
  messagingSenderId: "203448259009",
  appId: "1:203448259009:web:765a2897ed8cc6d7081f40",
  measurementId: "G-Q4Y8EZXSLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)