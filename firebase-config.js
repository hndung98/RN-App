// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDWGWtbjQkg8EKf7kcbkoS9fA309eqqcac",
  authDomain: "spm-app-448a9.firebaseapp.com",
  databaseURL: "https://spm-app-448a9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "spm-app-448a9",
  storageBucket: "spm-app-448a9.appspot.com",
  messagingSenderId: "579319233381",
  appId: "1:579319233381:web:8a8b47d3e2d7b92417bf8c",
  measurementId: "G-YZBPKPX07P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize database
export const db = getDatabase(app);