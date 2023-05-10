// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOAZUXvfQnVmyNoQyJ4Vo26TS1aLEsT78",
  authDomain: "movie-app-72745.firebaseapp.com",
  projectId: "movie-app-72745",
  storageBucket: "movie-app-72745.appspot.com",
  messagingSenderId: "962095463307",
  appId: "1:962095463307:web:23d586b33cb900669bcd8e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
