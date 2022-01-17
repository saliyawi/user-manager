import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

{/* Fifebase configuration for this project */}
const firebaseConfig = {
  apiKey: "AIzaSyDhuiNX3b8x3LlSJxfxoZlmLCf5Kaf9P00",
  authDomain: "user-manager-7ab6b.firebaseapp.com",
  projectId: "user-manager-7ab6b",
  storageBucket: "user-manager-7ab6b.appspot.com",
  messagingSenderId: "620109323076",
  appId: "1:620109323076:web:dc4e2778fb12c9174d5511",
  measurementId: "G-YN6NJFQ2BX"
};

{/* Initialize Firebase */}
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;