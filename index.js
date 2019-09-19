// import {DB} from './utilities/database/rw_db.js';
const { app, BrowserWindow, ipcMain} = require('electron');
const authService = require('./services/auth-service');
const createAppWindow = require('./scripts/appprocess')
const {createAuthWindow} = require('./scripts/authprocess')


let bg_auth_win = null;
let main_win = null;
let login_win = null;

let DB = require('./utilities/database/rw_db.js');
let db = new DB();

let item = {name: "'Test Device'", id: 42};

db.open_db();

const SettingsHelper = require('./utilities/settings');
const settings_file = require('./settings.json');
let settings_helper = new SettingsHelper(settings_file);


function createServerWindow() {

    // Hidden Auth server window
    bg_auth_win = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    //bg_auth_win.loadFile('views/hidden/auth-server.html')
}

async function showWindow() {
    createServerWindow();
    try {
        await authService.refreshTokens();
        return createAppWindow();
    } catch (err) {
        createAuthWindow();
    }
}

// Create window when app is ready
app.on('ready', showWindow)

/*
ipcMain.on('login', (event, arg) => {
    console.log(`User:\n    Username: ${arg['username']}\n    Password: ${arg['password']}`);
    main_win.show();
    login_win.close();
})
*/

