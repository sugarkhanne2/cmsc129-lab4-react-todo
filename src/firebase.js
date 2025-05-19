// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrSwCQ_umQpFpcpCkS9FBYYsWUGoT2D6E",
  authDomain: "cmsc-129---react-todo-app.firebaseapp.com",
  projectId: "cmsc-129---react-todo-app",
  storageBucket: "cmsc-129---react-todo-app.appspot.com",
  messagingSenderId: "978037107282",
  appId: "1:978037107282:web:1285d42925c488366e8d8b",
  measurementId: "G-QVMJZ6PC0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);