import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBhgoCMHsZ6C8ES4lXkyvaomvICHq6o5Qw",
  authDomain: "auth-dot.firebaseapp.com",
  projectId: "auth-dot",
  storageBucket: "auth-dot.appspot.com",
  messagingSenderId: "663207402501",
  appId: "1:663207402501:web:14bfe146e70687c57cd06c",
  measurementId: "G-1016T6VN8T",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { app, analytics, auth, firestore, storage };
