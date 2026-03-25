import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdDuhcm_ILJxF0_-JFwfzrAMpf0YQho4U",
  authDomain: "hola-mundo-josue.firebaseapp.com",
  projectId: "hola-mundo-josue",
  storageBucket: "hola-mundo-josue.firebasestorage.app",
  messagingSenderId: "156633003954",
  appId: "1:156633003954:web:cdddc1e9a1afee27a996ab"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);