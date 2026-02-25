import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCu4CovpJh3hMbwku9w-bh5BpASY-ojNMk",
  authDomain: "mmed-app-ada53.firebaseapp.com",
  projectId: "med-app-ada53",
  storageBucket: "med-app-ada53.firebasestorage.app",
  messagingSenderId: "567228827186",
  appId: "1:567228827186:web:29800bf68e489497699e2b",
  measurementId: "G-QR9SZFPGC7"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;