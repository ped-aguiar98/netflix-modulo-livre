// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCepj5Xdcb3MYnWhsrmcG5PccY-ysen3PQ",
  authDomain: "netflix-clone-a4566.firebaseapp.com",
  projectId: "netflix-clone-a4566",
  storageBucket: "netflix-clone-a4566.appspot.com",
  messagingSenderId: "821003625550",
  appId: "1:821003625550:web:a9c30ebc2305ec51d90f1f"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const auth = getAuth()

export default app
export {auth, db}