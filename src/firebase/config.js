import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2ovmuiCZgPsSvOmOIbBLCk60PeuWc4v4",
  authDomain: "schoolgo-9e730.firebaseapp.com",
  projectId: "schoolgo-9e730",
  storageBucket: "schoolgo-9e730.appspot.com",
  messagingSenderId: "565610827039",
  appId: "1:565610827039:web:9fa8b190268abd8df6b42a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
