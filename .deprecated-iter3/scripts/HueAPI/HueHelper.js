const v3 = require('node-hue-api').v3;
const LightState = v3.lightStates.LightState;

const app_name = "scarlet-witch-lights-app";
const device_name = "demo-device";
const SAMPLE_TASK = {
    "task_type": "LIGHT",
    "targets": [2, 3]
}
const SAMPLE_STATE = new LightState().off();
let _USER = null;

function _init() {
    v3.discovery.nupnpSearch()
    .then(results => {
        const ip = results[0].ipaddress;
        return v3.api.create(ip);
    })
    .then(unauth => {
        return unauth.users.createUser(app_name, device_name);
    })
    .then(user => {
        console.log(`   Helper Username:        ${user.username}`);
        _USER = user.username;
    })
    .catch(err => {
        console.log(err.message);
    })
}

function sendTask(task=SAMPLE_TASK, state=SAMPLE_STATE) {
    v3.discovery.nupnpSearch()
    .then(results => {
        const ip = results[0].ipaddress;
        return v3.api.create(ip, _USER);
    })
    .then(api => {
        if (task['task_type'] === "LIGHT") {
            // Apply light state to each targeted light
            task['targets'].map(id => {
                api.lights.setLightState(id, state);
            });
        } else if (task['task_type'] === "SCENELIGHT") {
            // Apply scene light state to each targeted light in scene
            task['targets'].map(id => {
                api.scenes.updateLightState(task['scenes'][0], id, state);
            });
        } else if (task['task_type'] === "SCENE") {
            // Apply scene state to scene
            task['scenes'].map(scene_id => {
                api.scenes.update(scene_id, state);
            });
        } else if (task['task_type'] === "GROUP") {
            // Apply group state to all groups
            task['groups'].map(group_id => {
                api.groups.setGroupState(group_id, state);
            });
        } else {
            throw Error("Invalid task type given.");
        } 
    })
    .catch(err => {
        console.error(err.message);
    })
}

_init();

module.exports = {
    sendTask,
}