// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "ecommerce-project-a894d.firebaseapp.com",
  projectId: "ecommerce-project-a894d",
  storageBucket: "ecommerce-project-a894d.appspot.com",
  messagingSenderId: "751924860394",
  appId: "1:751924860394:web:9d50f82676fd9f130f8e93",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firebaseDB = getFirestore(app);
// console.log(process.env.REACT_APP_FIREBASE_KEY);
