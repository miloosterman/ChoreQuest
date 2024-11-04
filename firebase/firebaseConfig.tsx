import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBf05rtQBYpMBjwh9rTij1UO0LW6gx5w5c",
    authDomain: "chorequest-eaed6.firebaseapp.com",
    projectId: "chorequest-eaed6",
    storageBucket: "chorequest-eaed6.appspot.com",
    messagingSenderId: "126755794853",
    appId: "1:126755794853:web:0607b2438c9f5b2296424c",
    measurementId: "G-T6ZRJMFJZJ",
    databaseURL: "https://chorequest-eaed6-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };

