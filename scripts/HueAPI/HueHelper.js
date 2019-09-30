const config = require('../../config.json');
const hue = require('node-hue-api').v3;
const discovery = hue.discovery;
const hueApi = hue.api;
const lightState = hue.lightStates.LightState;
const sceneState = hue.Scene;
const sceneLightState = hue.lightStates.SceneLightState;
const groupState = hue.lightStates.GroupLightState;

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
        config['users'].push(user);
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
    else if (err.getHueErrorType() === 3) console.error("Scene could not be found.");
    else console.error(err.message);
}

async function connect() {
    console.log('Connecting');
    var api;
    if (config.users.length === 0) api = createUser();
    else api = loadUser(config.users[0]);
    return api;
}

function session() {
    return user_session;
}

function formatTask(task) {
    console.log('Formatting task.');
    var state;
    if (task['task_type'] === "LIGHT") state = lightState;
    else if (task['task_type'] === "SCENE") {
        if (task['targets'].length) state = sceneState;
        else state = sceneLightState;
    }
    else if (task['task_type'] === "GROUP") state = groupState;
    else throw new Error('Invalid task type given.');
    return state;
}

async function sendState(task) {
    var state = formatTask(task);
    var response;

    console.log('Sending task.');
    if (task['task_type'] === "LIGHT") {                                            //  Specified lights
        response = task['targets'].map(id => {
            session().scenes.setLightState(task['scene_name'], id, state);
        });
    } else if (task['task_type'] === "SCENE") {
        if (task['targets'].length) {                                               //  Specific lights in scene
            repsonse = task['targets'].map(id => {
                session().scenes.updateLightState(task['scene_name'], id, state);
            });
        } else {      
            response = task['scenes'].map(scene_id => {                             //  All scenes
                session().scenes.update(scene_id, state);
            })
        }
    } else if (task['task_type'] === "GROUP") {                                     //  All groups specified
        response = task['groups'].map(group_id => {
            session().groups.setGroupState(group_id, state);
        });
    }

    return response;
}

const user_session = connect();

module.exports = {
    session,
    sendState
}