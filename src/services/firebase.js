// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBuv61Nc6-9OBIyGxis6_gQ40xLfcwwuqM",
    authDomain: "shonachat-b1048.firebaseapp.com",
    databaseURL: "https://shonachat-b1048.firebaseio.com",
    projectId: "shonachat-b1048",
    storageBucket: "shonachat-b1048.appspot.com",
    messagingSenderId: "54270608221",
    appId: "1:54270608221:web:850bb7ba5f9fd22a129eb4",
    measurementId: "G-1GNSNJ1Q01"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()