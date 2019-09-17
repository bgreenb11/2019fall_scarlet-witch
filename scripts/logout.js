const {remote} = require('electron');
const axios = require('axios');
const authService = remote.require('./services/auth-service');
const authProcess = remote.require('./scripts/authprocess');

const webContents = remote.getCurrentWebContents();

document.getElementById('logout').onclick = async () => {
    await authProcess.createLogoutWindow();
    remote.getCurrentWindow().close();
};