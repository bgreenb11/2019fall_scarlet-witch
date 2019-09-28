const { app, BrowserWindow } = require('electron');
const HueHelper = require('./scripts/HueAPI/HueHelper');

let main_window;

function showWindow() {
    main_window = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });
}

app.on('ready', () => {
    showWindow();
});