import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAdnQt6TpJVGgJsF6P8WpIoxsHp4s_ixls",
  authDomain: "fir-app-1259a.firebaseapp.com",
  projectId: "fir-app-1259a",
  storageBucket: "fir-app-1259a.firebasestorage.app",
  messagingSenderId: "753392946196",
  appId: "1:753392946196:web:31a5b8f778b598f29dab01",
  measurementId: "G-59WE9S4ER4",
};

const app = initializeApp(firebaseConfig);

export {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  app,
};
