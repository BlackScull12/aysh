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

let currentUser = null;

/* WAIT FOR USER LOGIN */
onAuthStateChanged(auth,(user)=>{

if(!user){
messagesDiv.innerHTML="Please login.";
return;
}

currentUser = user;

startChat();

});

function startChat(){

const chatUser = localStorage.getItem("chatUser");
const chatName = localStorage.getItem("chatName");

if(!chatUser){
messagesDiv.innerHTML="Select a user to start chatting.";
return;
}

document.getElementById("chatName").innerText = chatName;

/* CREATE UNIQUE CHAT ID */
const chatId =
currentUser.uid < chatUser
? currentUser.uid + chatUser
: chatUser + currentUser.uid;

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

if(msg.sender === currentUser.uid){
div.classList.add("sent");
}else{
div.classList.add("received");
}

div.innerText = msg.text;

messagesDiv.appendChild(div);

});

/* AUTO SCROLL TO NEW MESSAGE */
messagesDiv.scrollTop = messagesDiv.scrollHeight;

});

/* SEND MESSAGE BUTTON */
sendBtn.onclick = ()=> sendMessage(chatId);

/* ENTER KEY SEND */
input.addEventListener("keydown",(event)=>{

if(event.key === "Enter"){
event.preventDefault();
sendMessage(chatId);
}

});

}

/* SEND MESSAGE FUNCTION */
async function sendMessage(chatId){

const text = input.value.trim();

if(text === "") return;

try{

await addDoc(collection(db,"chats",chatId,"messages"),{

text:text,
sender:currentUser.uid,
time:Date.now()

});

input.value="";

}catch(err){

console.error("Message failed:",err);

}

}
