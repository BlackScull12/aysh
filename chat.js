import { auth, db } from "./firebase.js";

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

const messagesDiv = document.getElementById("messages");
const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("messageInput");

onAuthStateChanged(auth,(user)=>{

if(!user){
messagesDiv.innerHTML="Login first.";
return;
}

const chatUser = localStorage.getItem("chatUser");
const chatName = localStorage.getItem("chatName");

if(!chatUser){
messagesDiv.innerHTML="Select a user to chat.";
return;
}

document.getElementById("chatName").innerText = chatName;

/* CREATE UNIQUE CHAT ID */
const chatId =
user.uid < chatUser
? user.uid + chatUser
: chatUser + user.uid;

/* LOAD MESSAGES IN REAL TIME */
const q = query(
collection(db,"chats",chatId,"messages"),
orderBy("time")
);

onSnapshot(q,(snapshot)=>{

messagesDiv.innerHTML="";

snapshot.forEach((doc)=>{

const msg = doc.data();

const div = document.createElement("div");
div.classList.add("message");

if(msg.sender === user.uid){
div.classList.add("sent");
}else{
div.classList.add("received");
}

div.innerText = msg.text;

messagesDiv.appendChild(div);

});

/* AUTO SCROLL */
messagesDiv.scrollTop = messagesDiv.scrollHeight;

});

/* SEND MESSAGE FUNCTION */
async function sendMessage(){

const text = input.value.trim();

if(text === "") return;

await addDoc(collection(db,"chats",chatId,"messages"),{

text:text,
sender:user.uid,
time:Date.now()

});

input.value="";

}

/* SEND BUTTON */
sendBtn.onclick = sendMessage;

/* ENTER KEY */
input.addEventListener("keydown",(event)=>{

if(event.key === "Enter"){
event.preventDefault();
sendMessage();
}

});

});
