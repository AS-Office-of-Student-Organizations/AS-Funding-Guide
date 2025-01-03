// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth} from "@firebase/auth";
import { getAnalytics } from "@firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxXj1VEE1ZEcVQqq3cSFANM42V9WtTGUs",
  authDomain: "as-funding-guide.firebaseapp.com",
  projectId: "as-funding-guide",
  storageBucket: "as-funding-guide.firebasestorage.app",
  messagingSenderId: "1006590852682",
  appId: "1:1006590852682:web:a7363b77d534a02fd9f0b3",
  measurementId: "G-C0WQ633EXL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);   
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);