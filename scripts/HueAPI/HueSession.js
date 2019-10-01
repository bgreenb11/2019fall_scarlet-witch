const v3 = require('node-hue-api').v3;
const discovery = v3.discovery;
const hueApi = v3.api;

const app_name = "scarlet-witch-lights-app";
const device_name = "demo-device";
let _USER = null;
let _IP = null;
let _SESSION = null;


async function findBridge() {
    var results = await discovery.nupnpSearch();
    if (results.length === 0) throw Error('No Bridge found.');
    return results[0].ipaddress;
}

async function createUser() {
    try {
        _IP = await findBridge();
        var unauth_api = await hueApi.create(results[0].ipaddress);
        var user = await unauth_api.users.createUser(app_name, device_name);
        _USER = user.username;
    } catch(err) {
        console.error(err.message);
    }
}

function connect(username=null, ip=null) {
    if (username && ip) {
        _USER = username;
        _IP = ip;
    } else createUser();
}

function session() {
    if (_SESSION) return _SESSION;
    else return HueApi.create(_IP, _USER);
}

function sendTask(task, state) {
    var response;
    if (task['task_type'] === "LIGHT") {
        // Apply light state to each targeted light
        response = task['targets'].map(id => {
            session().lights.setLightState(id, state);
        });
    } else if (task['task_type'] === "SCENELIGHT") {
        // Apply scene light state to each targeted light in scene
        response = task['targets'].map(id => {
            session().scenes.updateLightState(task['scenes'][0], id, state);
        });
    } else if (task['task_type'] === "SCENE") {
        // Apply scene state to scene
        response = task['scenes'].map(scene_id => {
            session().scenes.update(scene_id, state);
        });
    } else if (task['task_type'] === "GROUP") {
        // Apply group state to all groups
        response = task['groups'].map(group_id => {
            session().groups.setGroupState(group_id, state);
        });
    } else {
        throw Error("Invalid task type given.");
    }
}

module.exports = {
    connect,
    session,
    sendTask
}