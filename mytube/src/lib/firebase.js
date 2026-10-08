// firebase.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInAnonymously,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2LJ0q2_kRvgPYShHeoUHkSG0a6IEOGT0",
  authDomain: "mytube-3561c.firebaseapp.com",
  projectId: "mytube-3561c",
  storageBucket: "mytube-3561c.firebasestorage.app",
  messagingSenderId: "376870442384",
  appId: "1:376870442384:web:9e42f825de855447220f15",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {
  auth,
  provider,
  signInAnonymously,
  onAuthStateChanged,
};