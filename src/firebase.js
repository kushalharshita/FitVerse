
import 'firebase/auth';
import 'firebase/firestore';

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAp3Ccqrf2Q0C2wj712m0Uy8CasxODNeAU",
  authDomain: "fitverse-255cc.firebaseapp.com",
  projectId: "fitverse-255cc",
  storageBucket: "fitverse-255cc.appspot.com",
  messagingSenderId: "388157083129",
  appId: "1:388157083129:web:3f811baf0c004c50cb4128"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();