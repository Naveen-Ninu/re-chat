// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwh4S8uvKcuYzbdGkz76eLXJQMvrqnubQ",
  authDomain: "re-chat-fd0d6.firebaseapp.com",
  projectId: "re-chat-fd0d6",
  storageBucket: "re-chat-fd0d6.appspot.com",
  messagingSenderId: "386195734090",
  appId: "1:386195734090:web:e62f05a54cdd378a7930b3",
  measurementId: "G-6YFELECCVJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
