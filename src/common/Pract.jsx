import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
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


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function Pract() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [usersData, setUsersData] = useState([]);

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

  // Function to sign in with Google
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      if (image) {
        const storage = getStorage(app);
        const imageRef = ref(storage, `profile-images/${result.user.uid}`);

        await uploadString(imageRef, image, "data_url");

        const imageUrl = await getDownloadURL(imageRef);

        const db = getFirestore(app);
        const usersCollection = collection(db, "users");
        const userDocRef = await addDoc(usersCollection, {
          displayName: result.user.displayName,
          email: result.user.email,
          imageUrl: imageUrl,
        });

        setUser(result.user);
        console.log("User data saved to Firestore with ID: ", userDocRef.id);
        console.log("Image URL saved: ", imageUrl);
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

  // Function to sign out
  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to fetch and print data from Firestore
  const fetchDataFromFirestore = async () => {
    try {
      const db = getFirestore(app);
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);

      const userDataArray = [];
      querySnapshot.forEach((doc) => {
        userDataArray.push(doc.data());
      });

      setUsersData(userDataArray);
    } catch (error) {
      console.error("Error fetching data from Firestore: ", error);
    }
  };

  useEffect(() => {
    // Fetch data from Firestore when the component mounts
    fetchDataFromFirestore();

    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // No user is signed in
        setUser(null);
      }
    });

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, []); // Only run this effect once during the component mount

  // Render content based on user authentication status
  const renderContent = () => {
    if (user) {
      return (
        <div>
          <p>Hello, {user.displayName}!</p>
          {user.photoURL && <img src={user.photoURL} alt="Profile" style={{ width: "100px", height: "100px" }} />}
          <button onClick={signOutUser}>Sign out</button>

          {/* Display data from Firestore */}
          <div>
            <h2>User Data from Firestore</h2>
            <ul>
              {usersData.map((userData, index) => (
                <li key={index}>
                  <p>Display Name: {userData.displayName}</p>
                  <p>Email: {userData.email}</p>
                  {userData.imageUrl   && (
                    <img src={userData.imageUrl == user.uid ? user.photoURL :  userData.imageUrl} alt={`Profile-${index}`} style={{ width: "50px", height: "50px" }} />
                  ) }
             
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
      );
    }
  };

  return <div>{renderContent()}</div>;
}

export default Pract;
