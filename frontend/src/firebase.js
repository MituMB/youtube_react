// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth , GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCNct6olleN--Srp_DRgGxa7b3tCy3QWf4",
    authDomain: "video-e19f8.firebaseapp.com",
    projectId: "video-e19f8",
    storageBucket: "video-e19f8.appspot.com",
    messagingSenderId: "432907189564",
    appId: "1:432907189564:web:64c66c37b3e1a8966fb239"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;