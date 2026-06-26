// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBBldcELdbWroTVAoy5L1kw0_urUFfxMSc",
  authDomain: "finances-c7df4.firebaseapp.com",
  projectId: "finances-c7df4",
  storageBucket: "finances-c7df4.firebasestorage.app",
  messagingSenderId: "47587476297",
  appId: "1:47587476297:web:1077b1533e072b13801098",
  measurementId: "G-FEKN3WMBFS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
