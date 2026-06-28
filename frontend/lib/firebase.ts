import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4rAHSRfH2fFAQB4qNfyqL1DAYvZm0y0g",
  authDomain: "last-minute-life-saver-2005as.firebaseapp.com",
  projectId: "last-minute-life-saver-2005as",
  storageBucket: "last-minute-life-saver-2005as.firebasestorage.app",
  messagingSenderId: "683654154454",
  appId: "1:683654154454:web:5f3064f8e294276a4f6177",
  measurementId: "G-KX7247RRDJ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // ← THIS
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
