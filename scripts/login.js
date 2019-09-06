var ipc = require('electron').ipcRenderer;

let button = document.getElementById('loginButton');
let username = document.getElementById('userText');
let password = document.getElementById('passText');

console.log("Login.js loaded.");

button.addEventListener('click', () => {
    var info = {
        'username': username.value,
        'password': password.value,
    };
    ipc.sendSync('login', info);
});