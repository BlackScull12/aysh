import { auth,db } from "./firebase.js";

import {
collection,
addDoc,
query,
orderBy,
onSnapshot
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const messagesDiv=document.getElementById("messages");
const sendBtn=document.getElementById("sendBtn");
const input=document.getElementById("messageInput");

onAuthStateChanged(auth,(user)=>{

if(!user){
messagesDiv.innerHTML="Login first";
return;
}

const chatUser=localStorage.getItem("chatUser");
const chatName=localStorage.getItem("chatName");

if(!chatUser){
messagesDiv.innerHTML="Select a user";
return;
}

document.getElementById("chatName").innerText=chatName;

const chatId=
user.uid<chatUser
?user.uid+chatUser
:chatUser+user.uid;

const q=query(
collection(db,"chats",chatId,"messages"),
orderBy("time")
);

onSnapshot(q,(snapshot)=>{

messagesDiv.innerHTML="";

snapshot.forEach((docu)=>{

const msg=docu.data();

const div=document.createElement("div");

div.classList.add("message");

if(msg.sender===user.uid){
div.classList.add("sent");
}else{
div.classList.add("received");
}

div.innerText=msg.text;

messagesDiv.appendChild(div);

});

messagesDiv.scrollTop=messagesDiv.scrollHeight;

});

async function sendMessage(){

const text=input.value.trim();

if(text==="") return;

await addDoc(collection(db,"chats",chatId,"messages"),{

text:text,
sender:user.uid,
time:Date.now()

});

input.value="";

}

sendBtn.onclick=sendMessage;

input.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){
e.preventDefault();
sendMessage();
}

});

});
