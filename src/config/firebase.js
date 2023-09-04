// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwJ8_oCyF9gLEJbo0JWxJA7yy_k01mBns",
  authDomain: "redesocial-cf23d.firebaseapp.com",
  projectId: "redesocial-cf23d",
  storageBucket: "redesocial-cf23d.appspot.com",
  messagingSenderId: "502632628217",
  appId: "1:502632628217:web:8174718cc6eb8b03508728",
  measurementId: "G-7VPZ1BPG31",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app, auth}
 