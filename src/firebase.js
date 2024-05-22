// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmrGxg8hVvEDsQBCEruTylXAcydED_fd4",
  authDomain: "warong-bakar-bakar.firebaseapp.com",
  projectId: "warong-bakar-bakar",
  storageBucket: "warong-bakar-bakar.appspot.com",
  messagingSenderId: "465540071205",
  appId: "1:465540071205:web:2691cb1b2450feaf17a4cc",
  measurementId: "G-YD625H0MN5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
