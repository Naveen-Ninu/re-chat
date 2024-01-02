import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/auth";
// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAwh4S8uvKcuYzbdGkz76eLXJQMvrqnubQ",
  authDomain: "re-chat-fd0d6.firebaseapp.com",
  projectId: "re-chat-fd0d6",
  storageBucket: "re-chat-fd0d6.appspot.com",
  messagingSenderId: "386195734090",
  appId: "1:386195734090:web:e62f05a54cdd378a7930b3",
  measurementId: "G-6YFELECCVJ",
};
// call firebase API
const app = initializeApp(firebaseConfig);

function Pract() {
  const [user, setUser] = useState(null);

  const signInWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await app.auth().signOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Hello, {user.displayName}!</p>
          <button onClick={signOut}>Sign out</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
}

export default Pract;
