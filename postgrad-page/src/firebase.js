// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
  authDomain: "postgrad-41f47.firebaseapp.com",
  projectId: "postgrad-41f47",
  storageBucket: "postgrad-41f47.firebasestorage.app",
  messagingSenderId: "233784182578",
  appId: "1:233784182578:web:40980fa8ab991ef920392b"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

 