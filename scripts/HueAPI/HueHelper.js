const config = require('../../config.json');
const hue = require('node-hue-api').v3;
const discovery = hue.discovery;
const hueApi = hue.api;

const app_name = 'node-hue-api';
const device_name = 'scarlet-witch';

async function findBridge() {
    console.log('Attempting to find Hue Bridge.');
    let results = await discovery.nupnpSearch();

    if (results.length === 0) {
        console.error('No Hue Bridges found.');
        return null;
    }

    return results[0].ipaddress;
}

async function createUser() {
    console.log('Creating new user for bridge.');
    let ip = await findBridge();
    if (ip === null) return null;

    let temp_api = await hueApi.create(ip);

    let user;
    try {
        user = await temp_api.users.createUser(app_name, device_name);
        let api = await hueApi.create(ip, user);
    } catch(err) {
        handleError(err);
    }
    return api;
}

async function loadUser(username) {
    console.log('Loading users from config.');
    let ip = await findBridge();
    let api = hueApi.create(ip, username);
    return api;
}

function handleError(err) {
    if (err.getHueErrorType() === 101) console.error("Press Link button on Hue Bridge.");
    else console.error(`Unknown Error: ${err.message}`);
}

async function connect() {
    console.log('Connecting');
    if (config.users.length === 0) createUser();
    else loadUser(config.users[0]);
}

function session() {
    return user_session;
}

const user_session = connect();