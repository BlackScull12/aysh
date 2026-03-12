import { db, auth } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const usersList = document.getElementById("usersList");

/* WAIT FOR AUTHENTICATION */

onAuthStateChanged(auth, (user) => {

if(!user){

window.location.href = "index.html";
return;

}

loadUsers(user);

});

/* LOAD USERS */

async function loadUsers(currentUser){

try{

const snapshot = await getDocs(collection(db,"users"));

usersList.innerHTML = "";

snapshot.forEach((docu)=>{

const user = docu.data();

/* DON'T SHOW CURRENT USER */

if(docu.id === currentUser.uid) return;

const div = document.createElement("div");

div.innerText = user.name;

div.style.padding = "12px";
div.style.cursor = "pointer";
div.style.borderBottom = "1px solid #333";

/* OPEN CHA*
