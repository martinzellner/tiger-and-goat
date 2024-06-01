// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyD-GxnU923UW-sv45JpFbRvpTyPzxnJ8FM",
    authDomain: "tiger-and-goat-124ec.firebaseapp.com",
    databaseURL: "https://tiger-and-goat-124ec-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tiger-and-goat-124ec",
    storageBucket: "tiger-and-goat-124ec.appspot.com",
    messagingSenderId: "979026887088",
    appId: "1:979026887088:web:64bb9edc63956f2c959675"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Auth
const auth = getAuth(app);

const db = getDatabase(app);

export { app, db, auth };
