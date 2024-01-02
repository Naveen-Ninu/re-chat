import React, { useState } from "react";
import {
  initializeApp,
  getApps,
  getApp,
} from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";

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


const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

function Pract() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);




  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Upload image to Firebase Storage
      if (image) {
        const storage = getStorage(app);
        const imageRef = ref(storage, `profile-images/${result.user.uid}`);
        await uploadString(imageRef, image, "data_url");

        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(imageRef);

        // Save user data to Firestore along with the image URL
        const db = getFirestore(app);
        const usersCollection = collection(db, "users");
        const userDocRef = await addDoc(usersCollection, {
          displayName: result.user.displayName,
          email: result.user.email,
          imageUrl: imageUrl, // Save the image URL
        });

        setUser(result.user);
        console.log("User data saved to Firestore with ID: ", userDocRef.id);
        console.log("Image uploaded to Storage with URL: ", imageUrl);
      } else {
        // Save user data to Firestore without image URL
        const db = getFirestore(app);
        const usersCollection = collection(db, "users");
        const userDocRef = await addDoc(usersCollection, {
          displayName: result.user.displayName,
          email: result.user.email,
        });

        setUser(result.user);
        console.log("User data saved to Firestore with ID: ", userDocRef.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {user ?

        <div>
          <p>Hello, {user.displayName}!</p>
          {user.photoURL && <img src={user.photoURL} alt="Profile" style={{ width: "100px", height: "100px" }} />}
          <button onClick={signOutUser}>Sign out</button>
        </div>

        :

        <div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>

      }

    </div>
  );
}

export default Pract;
