// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {};
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
