import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-dqOhpIMitgB-PBwZzTaI8P2bHJAamqQ",
  authDomain: "first-react-project-cc4b1.firebaseapp.com",
  projectId: "first-react-project-cc4b1",
  storageBucket: "first-react-project-cc4b1.appspot.com",
  messagingSenderId: "979085124577",
  appId: "1:979085124577:web:5b26b04869017edd38a8a0",
  measurementId: "G-FC93YVQCRR",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
