import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAM22hGJJvSNI0HXax04klpATw6-0QUtHU",
  authDomain: "motion-app-58dbb.firebaseapp.com",
  projectId: "motion-app-58dbb",
  storageBucket: "motion-app-58dbb.firebasestorage.app",
  messagingSenderId: "614191969517",
  appId: "1:614191969517:web:fd4af46c2ac07f9d1408e4",
  measurementId: "G-SP1BV3JQXT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
