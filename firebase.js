// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA15uIuvnR3SvgNKVzPbjxwXU7lXsA1Br8",
  authDomain: "maqure-6425a.firebaseapp.com",
  projectId: "maqure-6425a",
  storageBucket: "maqure-6425a.appspot.com",
  messagingSenderId: "1058201083236",
  appId: "1:1058201083236:web:a554077e3d0c47f623ae71",
  measurementId: "G-E7PK37XY17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);