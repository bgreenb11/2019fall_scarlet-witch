const {BrowserWindow} = require('electron');

function createAppWindow() {
    // Window that will be activated after user logs in
    main_win = new BrowserWindow({
        width: 1024,
        height: 576,
        show: true,
        webPreferences: {
            nodeIntegration: true
        }
    })

    main_win.loadFile('views/pages/dashboard.html')

    main_win.on('closed', () => {
        main_win = null;
    });
}

module.exports = createAppWindow;