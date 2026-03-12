import { auth, db } from "./firebase.js";

import {
collection,
addDoc,
query,
orderBy,
onSnapshot
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const messagesDiv = document.getElementById("messages");
const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("messageInput");

let chatUser = localStorage.getItem("chatUser");
let chatName = localStorage.getItem("chatName");

if(!chatUser){
messagesDiv.innerHTML = "Select a user to start chatting.";
}else{

document.getElementById("chatName").innerText = chatName;

/* CREATE UNIQUE CHAT ID */
const chatId =
auth.currentUser.uid < chatUser
? auth.currentUser.uid + chatUser
: chatUser + auth.currentUser.uid;

/* LISTEN FOR NEW MESSAGES */
const q = query(
collection(db,"chats",chatId,"messages"),
orderBy("time")
);

onSnapshot(q,(snapshot)=>{

messagesDiv.innerHTML = "";

snapshot.forEach((doc)=>{

const msg = doc.data();

const div = document.createElement("div");

div.classList.add("message");

if(msg.sender === auth.currentUser.uid){
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

/* SEND BUTTON */
sendBtn.onclick = sendMessage;

/* ENTER KEY SEND */
input.addEventListener("keypress",(event)=>{

if(event.key === "Enter"){
event.preventDefault();
sendMessage();
}

});

/* FUNCTION TO SEND MESSAGE */
async function sendMessage(){

const text = input.value.trim();

if(text === "") return;

await addDoc(collection(db,"chats",chatId,"messages"),{

text: text,
sender: auth.currentUser.uid,
time: Date.now()

});

input.value = "";

}

}
