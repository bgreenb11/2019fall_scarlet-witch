const { app, BrowserWindow } = require('electron');
const HueHelper = require('./scripts/HueAPI/HueHelper');
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

    main_window.loadURL(url.format({
        pathname: "./views/pages/index.html",
        protocol: 'file:',
        slashes: true,
    }))
}

app.on('ready', () => {
    showWindow();
});