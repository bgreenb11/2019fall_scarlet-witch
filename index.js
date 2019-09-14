// import {DB} from './utilities/database/rw_db.js';
const { app, BrowserWindow, ipcMain} = require('electron');

let main_win, login_win;

let DB = require('./utilities/database/rw_db.js');
let db = new DB();

db.open_db();
db.write_db();
db.read_db();
db.close_db();

function createWindows() {

    // Window that will be activated acter user logs in
    main_win = new BrowserWindow({
        width: 1024,
        height: 576,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    main_win.loadFile('views/pages/dashboard.html')

    // Login modal
    login_win = new BrowserWindow({
        parent: main_win,
        width: 288,
        height: 384,
        frame: true,
        webPreferences: {
            nodeIntegration: true
        }
    })

    login_win.loadFile('views/pages/login.html')

}

// Create window when app is ready
app.on('ready', createWindows);

ipcMain.on('login', (event, arg) => {
    console.log(`User:\n    Username: ${arg['username']}\n    Password: ${arg['password']}`);
    main_win.show();
    login_win.close();
})