import { auth,db } from "./firebase.js";

import {
GoogleAuthProvider,
signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import {
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const provider=new GoogleAuthProvider();

const loginBtn=document.getElementById("loginBtn");

loginBtn.onclick=async()=>{

const result=await signInWithPopup(auth,provider);

const user=result.user;

await setDoc(doc(db,"users",user.uid),{

name:user.displayName,
email:user.email

});

window.location="chat.html";

};

window.location="chat.html";

};
