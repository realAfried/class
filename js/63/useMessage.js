import messageBox from "./messageBox.js";

const buttons = ["YES","NO","MAYBE"]

messageBox('Hello World!', buttons, choice => console.log('you picked ', choice));

const msgInput = document.querySelector('#msg');
document.querySelector('#showMessage').addEventListener('submit', e=>{
    e.preventDefault();
    messageBox(msgInput.value);
})

