const { app, BrowserWindow } = require('electron');

function createWindow () {

    // Main browser window
    let win = new BrowserWindow({
        width: 1024,
        height: 576,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Load login.html on launch
    win.loadFile('pages/login.html');
}

// Create window when app is ready
app.on('ready', createWindow);