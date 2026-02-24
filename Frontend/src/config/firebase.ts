import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCe9TrhC4qf09kBPYA9Oylv5RDN9rcLuWA",
  authDomain: "med-app-dad26.firebaseapp.com",
  projectId: "med-app-dad26",
  storageBucket: "med-app-dad26.firebasestorage.app",
  messagingSenderId: "958261054431",
  appId: "1:958261054431:web:7cc73ad62ca95298a2d26a",
  measurementId: "G-1VRQ9JELR9"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;