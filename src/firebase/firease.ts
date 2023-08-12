// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1P_CgoyfPcHXC_FNpKDaSRPvWFVc0blY",
  authDomain: "book-catalog-63b99.firebaseapp.com",
  projectId: "book-catalog-63b99",
  storageBucket: "book-catalog-63b99.appspot.com",
  messagingSenderId: "51371127296",
  appId: "1:51371127296:web:ee0d0a46e0d34bc89d9ee5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);