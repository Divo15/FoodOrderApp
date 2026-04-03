import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ⚠️ Replace these with your own Firebase project credentials
// Go to https://console.firebase.google.com → Create Project → Project Settings → Add Web App
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
