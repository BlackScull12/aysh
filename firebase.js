import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import { getAuth } from 
"https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import { getFirestore } from 
"https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAxt94UyMn8AP8PFaSHPJ29JnZQ2KI3kZw",
  authDomain: "chatgithub-e838d.firebaseapp.com",
  projectId: "chatgithub-e838d",
  storageBucket: "chatgithub-e838d.firebasestorage.app",
  messagingSenderId: "755589384017",
  appId: "1:755589384017:web:6af4c6d223d646cf36f570"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
