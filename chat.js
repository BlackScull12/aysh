import { db, auth } from "./firebase.js";

import {
collection,
addDoc,
query,
orderBy,
onSnapshot
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const messagesDiv = document.getElementById("messages");
const sendBtn = document.getElementById("sendBtn");

let chatUser = localStorage.getItem("chatUser");

if(chatUser){

document.getElementById("chatName").innerText =
localStorage.getItem("chatName");

const chatId =
auth.currentUser.uid < chatUser ?
auth.currentUser.uid + chatUser :
chatUser + auth.currentUser.uid;

const q = query(
collection(db,"chats",chatId,"messages"),
orderBy("time")
);

onSnapshot(q,(snapshot)=>{

messagesDiv.innerHTML="";

snapshot.forEach((doc)=>{

const msg = doc.data();

const div = document.createElement("div");

div.innerText = msg.text;

messagesDiv.appendChild(div);

});

});

sendBtn.onclick = async ()=>{

const input = document.getElementById("messageInput");

await addDoc(collection(db,"chats",chatId,"messages"),{

text:input.value,
sender:auth.currentUser.uid,
time:Date.now()

});

input.value="";

};

}
