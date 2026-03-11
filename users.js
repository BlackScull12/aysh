import { db, auth } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const usersList = document.getElementById("usersList");

async function loadUsers(){

const querySnapshot = await getDocs(collection(db,"users"));

querySnapshot.forEach((docu)=>{

const user = docu.data();

if(docu.id === auth.currentUser?.uid) return;

const div = document.createElement("div");

div.innerText = user.name;

div.onclick = ()=>{
localStorage.setItem("chatUser",docu.id);
localStorage.setItem("chatName",user.name);
location.reload();
}

usersList.appendChild(div);

});

}

setTimeout(loadUsers,1000);
