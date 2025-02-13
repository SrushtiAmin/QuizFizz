import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBQieY4M2e6eYSgRTbgHEh0kr6YOqYdUSg",
    authDomain: "quizfizz-c81e3.firebaseapp.com",
    projectId: "quizfizz-c81e3",
    storageBucket: "quizfizz-c81e3.firebasestorage.app",
    messagingSenderId: "947288215865",
    appId: "1:947288215865:web:5eb2159ee054321fda58e8",
    measurementId: "G-YYTR51L1ZN"
  };

  export const app = initializeApp(firebaseConfig) ;
  export const auth = getAuth();
  export const db = getFirestore(app);
