// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8_vtp9KB7C1YAKIUqCUyKPM1KLFYUcjs",
  authDomain: "imggame-24c7e.firebaseapp.com",
  projectId: "imggame-24c7e",
  storageBucket: "imggame-24c7e.appspot.com",
  messagingSenderId: "672190246775",
  appId: "1:672190246775:web:245654903eb32d41b5fb72",
};
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { firebaseApp, auth, firestore };
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

// export const sigAanonymous:()=> Promise<void> = async ()=>{
//   await signInAnonymously(auth);
// }
