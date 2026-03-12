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
const loginBtn = document.getElementById("loginBtn");

/* LOGIN BUTTON */

loginBtn.onclick = async () => {

try{

const result = await signInWithPopup(auth, provider);

const user = result.user;

/* SAVE USER TO FIRESTORE */

await setDoc(doc(db,"users",user.uid),{

name: user.displayName,
email: user.email

},{ merge:true });

/* REDIRECT TO CHAT */

window.location.href = "chat.html";

}catch(error){

console.error("Login failed:", error);

}

};

/* AUTO REDIRECT IF USER ALREADY LOGGED IN */

onAuthStateChanged(auth,(user)=>{

if(user){

window.location.href = "chat.html";

}

});


window.location="chat.html";

};
