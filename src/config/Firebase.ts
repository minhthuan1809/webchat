// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD54lmqyOb5qaT88jq7Zw7NlzLvJGrLFm0",
  authDomain: "chat-9d14e.firebaseapp.com",
  projectId: "chat-9d14e",
  storageBucket: "chat-9d14e.firebasestorage.app",
  messagingSenderId: "996637846409",
  appId: "1:996637846409:web:7708ead1866847e561cf58",
  measurementId: "G-DGGFW6VKDN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
