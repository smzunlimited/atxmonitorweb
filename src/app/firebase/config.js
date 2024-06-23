import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCq2M5O-EhBTp_thRGgrbDj03E-30nMaGQ",
  authDomain: "atxwebservice.firebaseapp.com",
  projectId: "atxwebservice",
  storageBucket: "atxwebservice.appspot.com",
  messagingSenderId: "771582440574",
  appId: "1:771582440574:web:f3644d4eb6a39c9e63942f",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
export { app, auth };
export const storage = getStorage(app);
