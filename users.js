import { db,auth } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const usersList=document.getElementById("usersList");

async function loadUsers(){

const snapshot=await getDocs(collection(db,"users"));

usersList.innerHTML="";

snapshot.forEach((docu)=>{

const user=docu.data();

if(auth.currentUser && docu.id===auth.currentUser.uid) return;

const div=document.createElement("div");

div.innerText=user.name;

div.style.padding="10px";
div.style.cursor="pointer";

div.onclick=()=>{

localStorage.setItem("chatUser",docu.id);
localStorage.setItem("chatName",user.name);

location.reload();

};

usersList.appendChild(div);

});

}

setTimeout(loadUsers,1000);
