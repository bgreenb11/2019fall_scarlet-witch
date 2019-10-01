const { app, BrowserWindow } = require('electron');
const HueSession = require('./scripts/HueAPI/HueSession');
const url = require('url')

let main_window;

function showWindow() {
    main_window = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    var my_url = url.format({
        pathname: "./views/pages/index.html",
        protocol: 'file:',
        slashes: true,
    });
    main_window.loadURL(my_url)
}

app.on('ready', () => {
    showWindow();
    HueSession.connect();
});