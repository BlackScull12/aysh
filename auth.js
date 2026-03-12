import { auth, db } from "./firebase.js";

import {
GoogleAuthProvider,
signInWithPopup,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import {
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const provider = new GoogleAuthProvider();

document.addEventListener("DOMContentLoaded", () => {

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {

try{

const result = await signInWithPopup(auth, provider);

const user = result.user;

await setDoc(doc(db,"users",user.uid),{

name:user.displayName,
email:user.email

},{ merge:true });

window.location.href="chat.html";

}catch(error){

console.error("Login failed:", error);

}

});

});

onAuthStateChanged(auth,(user)=>{

if(user){

window.location.href="chat.html";

}

});
