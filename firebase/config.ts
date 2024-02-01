// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKja8-n8W6eYcC2xeB8_8a6Qf2QGZrBrQ",
  authDomain: "team-builder-74977.firebaseapp.com",
  projectId: "team-builder-74977",
  storageBucket: "team-builder-74977.appspot.com",
  messagingSenderId: "910777064621",
  appId: "1:910777064621:web:011f4d0bd7c1e7f4b03a24"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);